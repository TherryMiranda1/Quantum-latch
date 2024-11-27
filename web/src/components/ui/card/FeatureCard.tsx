import { ComponentProps } from "react";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";
import { Header } from "../headers/Header";
import { Text } from "../text/Text";
import { RotativeShadowWrapper } from "../backgrounds/RotativeShadowWrapper";

type Props = ComponentProps<"article"> & {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

export const FeatureCard = ({ title, description, icon, ...props }: Props) => {
  return (
    <RotativeShadowWrapper>
      <FeatureCardStyled {...props}>
        {icon}
        <ContentStyled>
          <Header componentType="h3" text={title} />
          <Text text={description} />
        </ContentStyled>
      </FeatureCardStyled>
    </RotativeShadowWrapper>
  );
};

const FeatureCardStyled = styled.article`
  display: flex;
  border-radius: var(--card-radius);
  background: var(--gradient-100);
  box-shadow: var(--shadow-000);
  padding: 16px;
  gap: 32px;
  width: 100%;
  max-width: 320px;
  height: auto;
  min-height: 300px;
  box-sizing: border-box;
  text-align: center;
  box-shadow: var(--shadow);
  backdrop-filter: blur(10px);
  margin: 0.2px;
  border: 0.1px solid var(--bg-100);

  h3 {
    font-size: 20px;
  }

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    max-width: 280px;
  }

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.sm}) {
    max-width: 100%;
    min-height: auto;
  }
  svg {
    font-size: 48px;
    color: var(--primary-100);
  }
`;

const ContentStyled = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
`;
