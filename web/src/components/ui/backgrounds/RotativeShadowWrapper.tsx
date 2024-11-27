import React from "react";
import styled, { keyframes } from "styled-components";

export const RotativeShadowWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Container>
      <RotativeShadowStyled>{children}</RotativeShadowStyled>
    </Container>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotativeShadowStyled = styled.div`
  position: relative;
  display: inline-block;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    scale: 2;
    height: 300px;
    background: conic-gradient(
      from 270deg,
      transparent 15%,
      var(--primary-100) 20%,
      transparent 25%,
      transparent 50%,
      transparent 75%,
      transparent
    );
    animation: ${rotate} 16s linear infinite;
  }
`;
export const Container = styled.div`
  padding: 0.1px 0.8px;
  border-radius: 14px;
  overflow: hidden;
`;
