import React, { useMemo } from "react";
import { byIso } from "country-code-lookup";
import { Text } from "../../Text";
import { isEmpty } from "../../../utils/helper-validation";
import { TeamInfoType, TeamScoreType } from "../../../types/model/LiveScoreTypes";
import { PlayStatusIcon, PersonIcon } from "../../../assets/icons";
import {
  ScoreWrapper,
  StatusIconWrapper,
  ScoreTable,
  ScoreItem,
  TeamFlag,
  ImageWrapper,
} from "./Teamscore.style";

type TeamScorePropsType = {
  score: TeamScoreType;
  team: TeamInfoType;
  winner_code: boolean;
  first_supply: boolean;
  totalScore: number;
};

const TeamScore: React.FC<TeamScorePropsType> = ({
  score,
  team,
  winner_code,
  first_supply,
  totalScore,
}) => {
  const getTieBreak = (data: any, number: any) => {
    if (data) {
      return data[`period_${number}_tie_break`]
        ? data[`period_${number}_tie_break`]
        : 0;
    }
    return 0;
  };

  const flag = useMemo(() => {
    if (team.country_code)
      try {
        return byIso(team?.country_code)?.iso2;
      } catch (error) {
        return null;
      }
    else {
      return null;
    }
  }, [team]);

  const doubleMatch = useMemo(
    () => (team?.name?.includes("/") ? "double" : "single"),
    [team]
  );

  return (
    <ScoreWrapper>
      <ImageWrapper>
        {flag === null ? (
          <>
            {doubleMatch === "double" ? (
              <PersonIcon.DoublePersonIcon />
            ) : (
              <PersonIcon.PersonIcon />
            )}
          </>
        ) : (
          <TeamFlag
            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${flag}.svg`}
          />
        )}
      </ImageWrapper>
      <Text
        fColor="black.150"
        className="team_name"
        padding="0  10px 0 0"
        fWeight={winner_code ? 700 : 400}
        responsive={{ 350: { fSize: 12 } }}
      >
        {team.name?.split("/")[0].trim()}
        {team.name?.includes("/") && ", "}
        {team.name?.split("/")[1]}
      </Text>
      <StatusIconWrapper>
        {first_supply && <PlayStatusIcon.PlayingIcon />}
        {winner_code && <PlayStatusIcon.WinIcon />}
      </StatusIconWrapper>
      <ScoreTable>
        <>
          {!isEmpty(score) && (
            <ScoreItem className="total">{totalScore}</ScoreItem>
          )}
          {[1, 2, 3, 4].map((item, index) => {
            return !isEmpty(score) ? (
              <ScoreItem key={index}>
                {/* @ts-ignore-next-line */}
                {score[`period_${item}`]}
                {!isEmpty(getTieBreak(score, item)) && (
                  <sup>{getTieBreak(score, item)}</sup>
                )}
              </ScoreItem>
            ) : (
              <React.Fragment key={index} />
            );
          })}
        </>
      </ScoreTable>
    </ScoreWrapper>
  );
};
export default TeamScore;
