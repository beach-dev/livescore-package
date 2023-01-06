import * as React from 'react';
import { ClipLoader } from "react-spinners";
import { LiveScoreCard } from "../../../components/Card";
import { Row } from "../../../components/Layout";
import useEventDataFromRapid from "../../../hooks/useEventDataFromRapid";
import useUpdateLiveData from "../../../hooks/useUpdateLiveData";
import {
  LiveScoreViewWrapper,
  LoaderWrapper,
} from "./LiveScoreView.style";
import Updater from "../Updater";

export default function LiveScoreView() {
  const { eventData, loadData, isLoading } = useEventDataFromRapid(); // To get the eventData for 3 day
  const { updatedEvents } = useUpdateLiveData(eventData); // To update the eventData for livescore (webscoket)

  return (
    <LiveScoreViewWrapper>
      <Updater isLoading={isLoading} loadData={loadData} />
      {isLoading && (
        <LoaderWrapper>
          <ClipLoader color="#78e9f4" size={30} />
        </LoaderWrapper>
      )}

      <Row flexDirection="column" gap={20}>
        {updatedEvents.map((_item: any, _index: number) => {
          return <LiveScoreCard event={_item} key={_index}></LiveScoreCard>;
        })}
        {isLoading ? updatedEvents.length < 1 && "Loading.." : ""}
      </Row>
    </LiveScoreViewWrapper>
  );
}
