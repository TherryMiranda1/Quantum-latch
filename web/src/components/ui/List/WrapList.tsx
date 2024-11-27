import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"section"> & {
  children?: React.ReactNode;
};

export const WrapList = ({ children, ...props }: Props) => {
  return <WrapListStyled {...props}>{children}</WrapListStyled>;
};

const WrapListStyled = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content:space-around;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: 16px;
`;
