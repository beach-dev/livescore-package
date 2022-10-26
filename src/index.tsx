import * as React from 'react';
// pages
import { LiveScore } from "../src/page";
import Updater, { UpdaterProps } from './views/home/Updater';
import { ScoreInfo } from './components/Card/Livescore';
import { Text } from './components/Text';
import { formatDate } from './utils/helper';


export const LiveScoreApp = () => {
  return <LiveScore />;
};

export const LiveScoreUpdater = ({ isLoading, loadData }: UpdaterProps) => {
  return <Updater isLoading={isLoading} loadData={loadData} />;
};

export const LiveScoreInfo = ({ event }: { event: any }) => {
  return <ScoreInfo event={event} />;
};

export { useEventDataFromRapid } from "./hooks/useEventDataFromRapid";
export { useUpdateLiveData } from "./hooks/useUpdateLiveData";

export const LiveScoreGameStartingAt = ({ event }: { event: any }) => {
  return <Text fColor="gray.150">{formatDate(event?.start_at)}</Text>;
};