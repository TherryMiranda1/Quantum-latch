import styled from "styled-components";

export interface GridBackgroundProps {
  isFixed?: boolean;
}

export const GridBackground = ({ isFixed = true }: GridBackgroundProps) => {
  return (
    <Container $isFixed={isFixed}>
      <GridBackgroundStyled />
    </Container>
  );
};

const Container = styled.div<{ $isFixed: boolean }>`
  position: ${({ $isFixed }) => ($isFixed ? "fixed" : "absolute")};
  z-index: ${({ $isFixed }) => ($isFixed ? "0" : "0")};
  top: -2%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  perspective: 0.1px;
`;

export const GridBackgroundStyled = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 50%;
  max-height: 50vh;

  background-size: 50px 50px;
  background-color: var(--bg-300);
  background-image: linear-gradient(
      0deg,
      var(--primary-100) 0.05px,
      transparent 1px
    ),
    linear-gradient(90deg, var(--primary-100) 0.05px, transparent 1px);

  mask-image: radial-gradient(
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 5%,
    rgba(0, 0, 0, 0) 100%
  );
  transform: rotateY(-0.3deg);
  transform-style: preserve-3d;
`;
