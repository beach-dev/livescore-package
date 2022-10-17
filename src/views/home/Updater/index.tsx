import * as React from "react";
import {useEffect, useCallback} from "react";
import {useThrottledCallback} from "use-debounce";

type UpdaterProps = { isLoading: boolean; loadData: () => void };

/**
 * @method updater
 * @description Updates data from Rapid in a throttled manner by calling loadData() from useEventDataFromRapid,
 * Also sets UI visibility status to local storage and reloads the page when visibility is true i.e.
 * when focus returns to the app
 * Debouncing and throttling are techniques in javascript to optimise the application and browser performance
 * @param isLoading {boolean}
 * @param loadData {function}
 **/
const Updater = ({isLoading, loadData}: UpdaterProps) => {

    //Update data/loaded data when  useEventDataFromRapid have finished loading new data
    const throttleLoadData = useThrottledCallback(() => {
        if (!isLoading) {
            loadData();
        }
    }, 2000, {trailing: true});

    useEffect(() => {
        localStorage.setItem("visStatus", "false");
    }, []);

    //When focus is away, sets visibility status to false and true when in focus
    const onVisibilityChange = useCallback(() => {
        const visStatus = localStorage.getItem("visStatus");
        if (visStatus === "true") {
            throttleLoadData();
            localStorage.setItem("visStatus", "false");
            window.location.reload()
        } else {
            localStorage.setItem("visStatus", "true");
        }
    }, [throttleLoadData]);

    useEffect(() => {
        document.addEventListener("visibilitychange", onVisibilityChange);
        return () => {
            document.removeEventListener("visibilitychange", onVisibilityChange);
        };
    }, [onVisibilityChange]);

    return <></>;
};

export default Updater;
