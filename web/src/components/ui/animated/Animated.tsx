import { ComponentProps, useEffect, useRef } from "react";
import styled from "styled-components";

type Props = ComponentProps<"main"> & {
  children?: React.ReactNode;
  applyMaxWidth?: boolean;
};

export const Animated = ({
  children,
  applyMaxWidth = true,
  ...props
}: Props) => {
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
  margin: auto;
  width: 100%;
  box-sizing: border-box;
  position: relative;
`;
