import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import { useState } from "react";
import styled from "styled-components";

export interface StatisticsType {
  id: number;
  title: string;
  description: string;
  source: string;
  image?: string;
}

interface StatisticsProps {
  statistics: StatisticsType[];
}
export const Statistics = ({ statistics }: StatisticsProps) => {
  const [current, setCurrent] = useState<StatisticsType | null>(statistics[0]);
  return (
    <StatisticsStyled>
      <StatisticsHeaderStyled>
        {statistics.map((statistic) => (
          <HeaderItemStyled
            $isSelected={statistic.id === current?.id}
            key={statistic.id}
            onClick={() => setCurrent(statistic)}
            onMouseEnter={() => {
              setCurrent(statistic);
            }}
          >
            {statistic.title}
          </HeaderItemStyled>
        ))}
      </StatisticsHeaderStyled>

      {current && (
        <BodyItemStyled>
          <DescriptionStyled>{current.description}</DescriptionStyled>
          <SourceStyled> Fuente: {current.source}</SourceStyled>
        </BodyItemStyled>
      )}
    </StatisticsStyled>
  );
};

const StatisticsStyled = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 64px 8px;
  box-sizing: border-box;
  gap: 48px;

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    flex-direction: column;
    padding: 32px 8px;
  }
`;
const StatisticsHeaderStyled = styled.div`
  display: grid;
  width: 100%;
  margin: auto;
  min-width: 50%;
  gap: 8px;
  grid-template:
    "n1 n1"
    "n2 n3"
    "n4 n4"
    "n5 n6";

  & > :nth-child(1) {
    width: 70%;
    margin: 0px auto;
    grid-area: n1;
  }
  & > :nth-child(2) {
    grid-area: n2;
  }
  & > :nth-child(3) {
    grid-area: n3;
  }
  & > :nth-child(4) {
    width: 75%;
    margin: 0px auto;
    grid-area: n4;
  }
  & > :nth-child(5) {
    grid-area: n5;
  }
  & > :nth-child(6) {
    grid-area: n6;
  }
`;
const HeaderItemStyled = styled.article<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  padding: 12px 16px;
  font-size: 16px;
  border: ${({ $isSelected }) =>
    $isSelected ? "1px solid var(--primary-100)" : "1px solid var(--bg-200)"};

  background: var(--bg-000);
  border-radius: var(--small-radius);
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
  }
  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    font-size: 12px;
    padding: 8px 12px;
  }
`;

const BodyItemStyled = styled.div`
  min-height: 250px;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  padding: 8px 12px;
  transition: all 0.2s ease-in-out;
`;

const DescriptionStyled = styled.p`
  font-size: 20px;
  transition: all 0.2s ease-in-out;
  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    font-size: 16px;
  }
`;
const SourceStyled = styled.p`
  font-size: 12px;
  color: var(--text-200);
`;
