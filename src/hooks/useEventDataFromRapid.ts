import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { parseDate, getStandardTime } from "../utils/helper";
import { isEmpty } from "../utils/helper-validation";
import config from "../config";
import useGetType from "./useGetType";

const useEventDataFromRapid = () => {
  const apiUrl = "https://api.clubapp.fi"; // The api url to get the finish double player names

  const [eventData, setEventData] = useState<any>([]); // The data of events, fetched by rapid api
  const [finlandPlayer, setFinlandPlayer] = useState([]); // the data of finland players, fetched by our server
  const [isLoading, setIsLoading] = useState(false); // The flag of loading, fetched events data
  const isGetAll = useGetType();

  /**
   * @description To load event data by start_date, end_date and page via rapid api (util)
   * @param date_start The start date to fetch
   * @param date_end The end date to fetch
   * @param page The page index of data to fetch (each page has 100 events)
   **/
  const getEventSearch = useCallback(
    async (date_start: any, date_end: any, page: any): Promise<any> => {
      const mk2 = config.hk + config.mk;
      const ak = config.api.ak + mk2;
      const headers = {
        "x-rapidapi-host": "sportscore1.p.rapidapi.com",
        "x-rapidapi-key": ak,
      }; // The header for rapid Api
      return axios
        .post(
          "https://sportscore1.p.rapidapi.com/events/search",
          {},
          {
            params: {
              sport_id: 2,
              date_start: date_start,
              date_end: date_end,
              page: page,
            },
            headers,
          }
        )
        .then(function (response) {
          return response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    []
  );

  /**
   * @description To filter data by country
   * @param data The data of events to filter
   **/
  const filterByCountry = useCallback(
    (data: any) => {
      /**
       * @description To filter finish double player
       **/
      if (isGetAll) return data;
      else {
        const getFinlandDobulePlayer = (name: string) => {
          const _filandPlayer = [...finlandPlayer];
          return (
            _filandPlayer.filter((item) => {
              return name.includes(item);
            }).length > 0
          );
        };
        return data.filter((item: any) => {
          return (
            item.home_team.country === "Finland" ||
            item.away_team.country === "Finland" ||
            getFinlandDobulePlayer(item.home_team.name) ||
            getFinlandDobulePlayer(item.away_team.name)
          );
        });
      }
    },
    [finlandPlayer, isGetAll]
  );

  /**
   * @description To load all event datas by start date and end_data (util)
   * @param date_start The start date to fetch
   * @param date_end The end date to fetch
   **/
  const getEventsData = useCallback(
    async (date_start: any, date_end: any) => {
      let eventsData: any[] | PromiseLike<any[]> = [];
      let page = 1;
      while (true) {
        const data = await getEventSearch(date_start, date_end, page);
        if (!data) return eventsData;
        eventsData = [...filterByCountry(data?.data), ...eventsData];
        if (data.data.length < 100) {
          break;
        }
        ++page;
      }
      return eventsData;
    },
    [getEventSearch, filterByCountry]
  );

  /**
   * @description Filters ( match status ) and sorts ( date and status) events data
   * @param item The event data to filter and sort {array}
   **/
  const processEventsData = useCallback((item: any[]) => {
    const TIME_DIFFERENCE = -21600000; // CST SUMMER TIMEZONE -6h = 3600 * 1000 * 6
    return item
      .filter((match) => {
        // filter by wrong date for finland time
        if (match.status !== "notstarted") {
          return true;
        }
        const homeSearch = item.findIndex((homeSeachItem) => {
          const matchDate = parseDate(match.start_at.replace(" ", "T"));
          const homeSeachDate = parseDate(
            homeSeachItem.start_at.replace(" ", "T")
          );
          return (
            TIME_DIFFERENCE < matchDate - homeSeachDate &&
            matchDate - homeSeachDate < 0 &&
            match.home_team.name === homeSeachItem.home_team.name
          );
        });
        const awaySearch = item.findIndex((awaySeachItem) => {
          const matchDate = parseDate(match.start_at.replace(" ", "T"));
          const awaySeachDate = parseDate(
            awaySeachItem.start_at.replace(" ", "T")
          );
          return (
            TIME_DIFFERENCE < matchDate - awaySeachDate &&
            matchDate - awaySeachDate < 0 &&
            match.away_team.name === awaySeachItem.away_team.name
          );
        });
        if (homeSearch >= 0 || awaySearch >= 0) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        // sort by start time
        const bD = parseDate(b.start_at.replace(" ", "T"));
        const aD = parseDate(a.start_at.replace(" ", "T"));
        return bD - aD;
      })
      .sort((a, b) => {
        // sort by status inprogress =>  notstarted => finished & canceled
        if (a.status === "inprogress" && b.status === "inprogress") {
          return 0;
        }
        if (a.status === "inprogress" && b.status !== "inprogress") {
          return -1;
        }
        if (a.status !== "inprogress" && b.status === "inprogress") {
          return 1;
        }
        if (
          (a.status === "finished" || a.status === "canceled") &&
          b.status !== "finished" &&
          b.status !== "canceled"
        ) {
          return 1;
        }
        if (
          a.status !== "finished" &&
          a.status !== "canceled" &&
          (b.status === "finished" || b.status === "canceled")
        ) {
          return -1;
        }
        if (
          (a.status === "finished" || a.status === "canceled") &&
          (b.status === "finished" || b.status === "canceled")
        ) {
          return 0;
        }
        return -1;
      });
  }, []);

  /**
   * @description To load event data from yesterday to today
   **/
  const loadData = useCallback(async () => {
    setIsLoading(true);
    const DAY = 3600 * 24 * 1000;
    const start = new Date().valueOf() - DAY; // start date
    const end = new Date().valueOf() + DAY; // end date
    const events = await getEventsData(
      getStandardTime(new Date(start)),
      getStandardTime(new Date(end))
    ).then((item) => {
      return processEventsData(item); // filter and sort data
    });
    setIsLoading(false);
    setEventData(events);
  }, [getEventsData, processEventsData]);

  /**
   * @method useEffect
   * @description To fetch finish double player
   **/
  useEffect(() => {
    if (!isGetAll)
      axios.get(`${apiUrl}/apps/doubleplayers`).then((res: any) => {
        setFinlandPlayer(res.data);
      });
  }, [isGetAll]);

  /**
   * @method useEffect
   * @description To load event data
   **/
  useEffect(() => {
    if (isGetAll || !isEmpty(finlandPlayer)) {
      loadData();
    }
  }, [finlandPlayer, loadData]);

  return { loadData, eventData, isLoading };
};

export default useEventDataFromRapid;
