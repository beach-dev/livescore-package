import React, { useCallback } from "react";
import { Col, Row } from "../../Layout";
import { Text } from "../../Text";
import { Hidden } from "../../Hidden";
import { TeamScore } from "../../Card";
import { formatDate } from "../../../utils/helper";
import { isEmpty } from "../../../utils/helper-validation";
import { StatusIcon } from "../../../assets/icons";
import {
  LivescoreWrapper,
  ScoreInfoWrapper,
  StatusWrapper,
} from "./Livescore.style";

type LivescoreCardProps = {
  event: any;
};

const EVENT_STATUS: any = {
  finished: "PÄÄTTYNYT",
  inprogress: "Käynnissä",
  canceled: "Peruutettu",
};

const LivescoreCard: React.FC<LivescoreCardProps> = ({ event }) => {
  /**
   * @description To get Points from event data by team(util)
   * @param data The event data
   * @param team home || away
   **/
  const getPoint = useCallback((data: any, team: any) => {
    if (isEmpty(data.home_score) && isEmpty(data.away_score)) {
      return 0;
    }

    if (data.status === "inprogress") {
      return team === "home" ? data.home_score.point : data.away_score.point;
    } else {
      return team === "home"
        ? data.home_score.display
        : data.away_score.display;
    }
  }, []);

  return (
    <LivescoreWrapper>
      <Row justifyContent="space-between">
        <Col flex="1">
          <Text>
            <Text mode="span" fWeight={800}>
              {event?.round_info?.name}
            </Text>{" "}
            <Text mode="span" fColor="gray.100">
              {event?.round_info?.name && " • "}
              {event?.league?.name}
            </Text>{" "}
          </Text>
        </Col>
        <Hidden wHide={[350]}>
          <StatusItem status={event.status} />
        </Hidden>
      </Row>
      <Row justifyContent="space-between">
        <Col flex="1">
          <Text fColor="gray.150">{formatDate(event?.start_at)}</Text>{" "}
        </Col>
        <Hidden wShow={[350]}>
          <StatusItem status={event.status} />
        </Hidden>
      </Row>
      <ScoreInfoWrapper>
        <TeamScore
          score={event?.home_score}
          team={event?.home_team}
          first_supply={
            event.status === "inprogress" && event.first_supply === 1
          }
          winner_code={event.winner_code === 1}
          totalScore={getPoint(event, "home")}
        />
        <TeamScore
          score={event?.away_score}
          team={event?.away_team}
          first_supply={
            event.status === "inprogress" && event.first_supply === 2
          }
          winner_code={event.winner_code === 2}
          totalScore={getPoint(event, "away")}
        />
      </ScoreInfoWrapper>
    </LivescoreWrapper>
  );
};

type StatusItemPropsType = {
  status: "inprogress" | "inprogress" | "canceled";
};

const StatusItem: React.FC<StatusItemPropsType> = ({ status }) => {
  return (
    <StatusWrapper>
      {status === "inprogress" && <StatusIcon />}
      <Text
        fSize={14}
        className={`inprogress ${status}`}
        lHeight={14}
        padding="0 0 0 5px"
        tTransForm="uppercase"
      >
        {EVENT_STATUS[status]}
      </Text>
    </StatusWrapper>
  );
};
export default LivescoreCard;
