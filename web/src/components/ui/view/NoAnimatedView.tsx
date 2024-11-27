import { ComponentProps } from "react";
import styled from "styled-components";
import { AnimatedView } from "./AnimatedFramerView";

type Props = ComponentProps<"main"> & {
  children?: React.ReactNode;
  applyMaxWidth?: boolean;
};

export const View = ({ children, applyMaxWidth = true, ...props }: Props) => {
  return (
    <ViewStyled $applyMaxWidth={applyMaxWidth} {...props}>
      {children}
    </ViewStyled>
  );
};

const ViewStyled = styled(AnimatedView)<{ $applyMaxWidth?: boolean }>`
  padding: ${(props) => (props.$applyMaxWidth ? "8px" : "0px")};
  max-width: ${(props) => (props.$applyMaxWidth ? "1200px" : "100%")};
  margin: auto;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
`;