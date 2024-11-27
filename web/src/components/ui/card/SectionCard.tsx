import { ComponentProps } from "react";
import styled from "styled-components";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

type Props = ComponentProps<"button"> & {
  children: React.ReactNode;
};

export const SectionCard = ({ children, ...props }: Props) => {
  return <CardStyled {...props}>{children}</CardStyled>;
};

const CardStyled = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: var(--gradient-200);
  backdrop-filter: blur(10px);
  padding: 16px;
  gap: 8px;
  width: 30%;
  height:100px;
  box-sizing: border-box;
  border-radius: var(--small-radius);
  border: 0.1px solid var(--bg-100);

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    width: 45%;
  }

  svg {
    width: 32px;
    height: 32px;
  }
`;
