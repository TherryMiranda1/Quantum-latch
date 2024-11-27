import styled from "styled-components";

export const PointBackground = () => {
  return <PointBackgroundStyled />;
};

export const PointBackgroundStyled = styled.div`
  position: fixed;
  bottom: -20%;
  width: 50%;
  height: 30%;
  max-height: 50vh;
  padding: 16px;
  z-index: -1;
 
  background-size: 5px 5px;
  backdrop-filter: blur(7px);
  background-image: radial-gradient(var(--primary-100) 0.1px, transparent 1px),
    radial-gradient(var(--primary-100) 0.1px, transparent 1px);
  mask-image: radial-gradient(
    #000000 0%,
    rgba(0, 0, 0, 0.7) 5%,
    transparent 50%
  );
`;
