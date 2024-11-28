import { ComponentProps } from "react";
import styled from "styled-components";

type Props = ComponentProps<"input"> & {
  isTextarea?: boolean;
};

export const Input = ({ ...props }: Props) => {
  return <InputStyled className="input" {...props} />;
};

const InputStyled = styled.input`
  background-color: transparent;
  padding: 12px 16px;

  &:focus {
    outline: 1px solid var(--primary-100);
    border-radius: var(--small-radius);
  }
`;
