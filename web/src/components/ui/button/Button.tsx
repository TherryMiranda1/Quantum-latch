import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"button"> & {
  text?: string;
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
};

export const Button = ({
  text,
  isLoading,
  onClick,
  children,
  ...props
}: Props) => {
  return (
    <ButtonStyled {...props} onClick={() => onClick?.()}>
      {text}
      {children}
      {isLoading && <SpinnerStyled />}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--small-radius);
  padding: 0.6em 1.2em;
  background-color: var(--primary-100);

  &:hover {
    border-color: var(--text-100);
  }

  &:focus {
    outline: 1px solid var(--primary-100);
  }
`;

const RoundedSpinner = styled.div`
  border-radius: 50%;
  border: 4px solid var(--text-100);
  border-top: 4px solid transparent;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
`;

const SpinnerStyled = styled(RoundedSpinner)`
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
