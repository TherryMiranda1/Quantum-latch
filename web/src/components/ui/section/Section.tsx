import { ComponentProps } from "react";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

type Props = ComponentProps<"section"> & {
  children?: React.ReactNode;
};

export const Section = ({ children, ...props }: Props) => {
  return <SectionStyled {...props}>{children}</SectionStyled>;
};

const SectionStyled = styled.section`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  gap: 32px;

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.sm}) {
    padding: 0px;
  }
`;
