import styled from "styled-components";

export const LivescoreWrapper = styled.div`
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 12px;
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  .inprogress {
    color: #159512;
  }
  .canceled {
    color: #951a12;
  }
  .finished {
    color: #212049;
  }
`;

export const ScoreInfoWrapper = styled.div``;
