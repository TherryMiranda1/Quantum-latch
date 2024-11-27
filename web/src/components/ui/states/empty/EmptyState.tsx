import { ComponentProps } from "react";
import styled from "styled-components";
import { Image } from "../../image/Image";
import { Header } from "../../headers/Header";
import { Button } from "../../button/Button";

type Props = ComponentProps<"section"> & {
  title?: string;
  description?: string;
  buttonText?: string;
  image?: string;
  buttonOnClick?: () => void;
};

export const EmptyState = ({
  title,
  description,
  buttonText,
  image,
  buttonOnClick,
  ...props
}: Props) => {
  return (
    <EmptyStateStyled {...props}>
      {title && <Header componentType="h2" text={title} />}
      {image && <Image src={image} />}
      {description && <p>{description}</p>}
      {buttonText && (
        <Button text={buttonText} onClick={() => buttonOnClick?.()} />
      )}
    </EmptyStateStyled>
  );
};

const EmptyStateStyled = styled.section`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 16px;
  gap: 12px;
  max-width: 720px;
  box-sizing: border-box;

  p {
    text-align: center;
  }
  button {
    margin-top: 32px;
    background-color: var(--primary-100);
  }
  img {
    max-height: 300px;
    width: auto;
    border: none;
    padding-bottom: 12px;
  }
`;
