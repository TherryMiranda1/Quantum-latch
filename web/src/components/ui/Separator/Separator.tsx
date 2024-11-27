import styled from "styled-components";

interface Props {
  text?: string;
}
export const Separator = ({ text }: Props) => {
  return (
    <SeparatorStyled>
      <div />
      {text && <span>{text}</span>}

      <div />
    </SeparatorStyled>
  );
};

export const SeparatorStyled = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;

  div {
    height: 1px;
    width: 100%;
    background: var(--bg-100);
  }
  span {
    font-size: 1rem;
    color: var(--bg-100);
  }
`;
