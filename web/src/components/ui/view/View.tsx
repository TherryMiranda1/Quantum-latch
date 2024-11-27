import { ComponentProps, useEffect, useRef } from "react";
import styled from "styled-components";

type Props = ComponentProps<"main"> & {
  children?: React.ReactNode;
  applyMaxWidth?: boolean;
};

export const View = ({ children, applyMaxWidth = true, ...props }: Props) => {
  const elementoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementoRef.current) {
      elementoRef.current.classList.add("show-element");
    }
  }, []);

  return (
    <ViewStyled ref={elementoRef} $applyMaxWidth={applyMaxWidth} {...props}>
      {children}
    </ViewStyled>
  );
};

const ViewStyled = styled.main<{ $applyMaxWidth?: boolean }>`
  padding: ${(props) => (props.$applyMaxWidth ? "8px" : "0px")};
  max-width: ${(props) => (props.$applyMaxWidth ? "1200px" : "100%")};
  margin: auto;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  position: relative;
`;
