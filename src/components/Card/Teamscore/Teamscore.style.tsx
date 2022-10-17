import styled from "styled-components";

export const ScoreWrapper = styled.div`
  display: flex;
  align-items: center;
  .team_name {
    flex: 1;
  }
`;

export const ScoreItem = styled.div`
  padding: 3px;
  line-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ScoreTable = styled.div`
  width: 40%;
  height: 22px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(23px, 1fr));
  max-width: 180px;
  text-align: center;
  @media screen and (max-width: 390px) {
    width: 50%;
    font-size: 14px;
  }
  @media screen and (max-width: 360px) {
    width: 45%;
    font-size: 13px;
    grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
  }
  .total {
    background: #dedede;
  }
`;

export const TeamFlag = styled.img`
  width: 24px;
  height: 16px;
  box-shadow: 0 1px 1px 0;
`;

export const StatusIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 10px;
`;

export const ImageWrapper = styled.div`
  width: 24px;
  display: flex;
  justify-content: center;
  margin-right: 10px;
`;
