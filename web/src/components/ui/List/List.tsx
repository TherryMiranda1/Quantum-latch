import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"section"> & {
  children?: React.ReactNode;
};

export const List = ({ children, ...props }: Props) => {
  return <ListStyled {...props}>{children}</ListStyled>;
};

const ListStyled = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  gap: 16px;
`;
