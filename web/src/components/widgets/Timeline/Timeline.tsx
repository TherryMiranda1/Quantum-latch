import { Header } from "@/components/ui";
import styled from "styled-components";

export interface Timeline {
  id: string;
  title: string;
  description?: string;
  time?: string;
  icon?: JSX.Element;
}

export interface Props {
  data: Timeline[];
}

export const Timeline = ({ data }: Props) => {
  return (
    <TimelineStyled>
      {data.map((item, index) => (
        <TimeItemStyled key={item.id}>
          <DecorationStyled>
            <BulletStyled>{index + 1}</BulletStyled>
            <LineStyled />
          </DecorationStyled>
          <ContentStyled>
            {item.icon}
            {item.time && <span>{item.time}</span>}
            <Header componentType="h3" text={item.title} />
            {item.description && <p>{item.description}</p>}
          </ContentStyled>
        </TimeItemStyled>
      ))}
    </TimelineStyled>
  );
};

const TimelineStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TimeItemStyled = styled.article`
  display: flex;
  gap: 16px;
  span {
    color: var(--text-200);
    font-size: 12px;
    font-weight: bold;
  }
  p {
    color: var(--text-200);
  }
  h3 {
    color: var(--primary-300);
  }
`;

const DecorationStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 32px;
  align-items: center;
  gap: 8px;
`;

const LineStyled = styled.div`
  height: 100%;
  width: 2px;
  border-radius: 10px;
  background: linear-gradient(
    to bottom,
    transparent,
    var(--primary-100),
    var(--text-100),
    var(--primary-100),
    transparent
  );
`;

const BulletStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  background: var(--text-100);
  color: var(--accent-100);
  padding: 2px;
  height: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px solid var(--text-100);
`;

const ContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
