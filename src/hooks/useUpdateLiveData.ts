import { useCallback, useEffect, useState } from "react";
import { isEmpty } from "../utils/helper-validation";

export const useUpdateLiveData = (events: any) => {
  const [updatedEvents, setUpdatedEvents] = useState<any>([]); // updated event data
  const [searchedList, setSearchedList] = useState<any>([]); // searched data to avoid double check

  /**
   * @description To update live score data by updated info from socket apis
   * @param data The updated data from Rapid api
   **/
  const updateLiveData = useCallback(
    (data: any) => {
      if (searchedList)
        setUpdatedEvents((prev: any) => {
          let tempSearch = [...prev];
          data.forEach((item: any) => {
            const idx = searchedList[item.id];
            if (tempSearch[idx]) {
              tempSearch[idx].home_score = item.home_score;
              tempSearch[idx].away_score = item.away_score;
              tempSearch[idx].status = item.status;
              tempSearch[idx].timelive = item.timelive;
              tempSearch[idx].winner_code = item.winner_code;
              tempSearch[idx].first_supply = item.first_supply;
            }
          });
          return tempSearch;
        });
    },
    [searchedList]
  );

  const updateList = useCallback((_events: any) => {
    if (_events) {
      const temp = [..._events];
      const obj = temp.reduce((o: any, item: any, currentIndex) => {
        return { ...o, [item.id]: currentIndex };
      }, {});
      setSearchedList(obj);
    }
  }, []);

  /**
   * @method useEffect
   * @description To init updated event data from param
   **/
  useEffect(() => {
    setUpdatedEvents(events);
    updateList(events);
  }, [events]);

  useEffect(() => {
    if (isEmpty(events) || isEmpty(searchedList)) {
      return;
    }
    let socket: WebSocket = new WebSocket(
      "wss://tipsscore.com:2083/app/7UXH2sNFqpVAO6FebyTKpujgfy8BUnM?protocol=7&client=js&version=5.0.3&flash=false"
    );

    // To subscribe for fetching data
    socket.addEventListener("open", () => {
      socket.send(
        JSON.stringify({
          event: "pusher:subscribe",
          data: { channel: "en-tennis-list" },
        })
      );
    });

    // To get message and update event Data
    socket.addEventListener("message", ({ data }) => {
      const packet = JSON.parse(data + "");
      if (packet.event === "App\\Events\\UpdateDataLine") {
        const tempData = JSON.parse(packet.data).data;
        updateLiveData(tempData);
      }
    });

    socket.onclose = () => {
      console.log("socket is closed");
    };
    socket.addEventListener("error", (e) => {
      console.log("error", e);
    });

    let refreshSession = setInterval(() => {
      if (socket.readyState == socket.OPEN)
        socket.send(JSON.stringify({ event: "pusher:ping", data: {} }));
      else {
        clearInterval(refreshSession);
      }
    }, 10000);

    return () => {
      if (socket.readyState == socket.OPEN) {
        socket.close();
      }
      clearInterval(refreshSession);
    };
  }, [events, searchedList]);

  return { updatedEvents };
};

export default useUpdateLiveData;
