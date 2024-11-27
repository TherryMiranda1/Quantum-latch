import { ComponentProps } from "react";
import styled from "styled-components";
import { Image } from "../image/Image";
import { Button } from "../button/Button";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import { GridBackground } from "../backgrounds/GridBackground";
import { GridBackgroundLeft } from "../backgrounds/GridBackgroundLeft";

type BannerVariant = "primary" | "secondary";
type Props = ComponentProps<"section"> & {
  variant?: BannerVariant;
  title?: string;
  highlightTitle?: string;
  description?: string;
  buttonText?: string;
  image?: string;
  buttonOnClick?: () => void;
  showRightBack?: boolean;
  buttonIcon?: JSX.Element;
};

export const Banner = ({
  variant = "primary",
  title,
  description,
  buttonText,
  image,
  highlightTitle,
  buttonOnClick,
  showRightBack,
  buttonIcon,
  ...props
}: Props) => {
  return (
    <BannerStyled $variant={variant}>
      {variant === "primary" && (
        <>
          {showRightBack && <GridBackground isFixed={false} />}
          <GridBackgroundLeft isFixed={false} />
        </>
      )}
      <BannerContentStyled $variant={variant} {...props}>
        <BannerTexts>
          <div>
            {title && (
              <h2>
                {title}
                {highlightTitle && <Highlight>{highlightTitle}</Highlight>}
              </h2>
            )}
          </div>

          {description && <p>{description}</p>}
          {buttonText && (
            <Button text={buttonText} onClick={() => buttonOnClick?.()}>
              {buttonIcon}
            </Button>
          )}
        </BannerTexts>
        {image && <Image src={image} />}
      </BannerContentStyled>
    </BannerStyled>
  );
};
const BannerStyled = styled.div<{ $variant: BannerVariant }>`
  width: 100%;
  padding: 0px;
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--gradient-100)" : "var(--gradient-200)"};

  color: ${({ $variant }) =>
    $variant === "primary" ? "var(--text-100)" : "var(--text-100)"};
  border-bottom: 1px solid var(--bg-300);
  position: relative;
  overflow: hidden;
`;

const BannerContentStyled = styled.section<{ $variant: BannerVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
  gap: 32px;
  margin: auto;
  max-width: ${DEVICE_BREAKPOINTS.lg};
  min-height: 80vh;
  box-sizing: border-box;
  position: relative;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h2 {
    font-size: 60px;
    line-height: 1;
    @media screen and (max-width: ${DEVICE_BREAKPOINTS.lg}) {
      font-size: 48px;
    }
    @media screen and (max-width: ${DEVICE_BREAKPOINTS.sm}) {
      font-size: 36px;
    }
  }

  p {
    color: ${({ $variant }) =>
      $variant === "primary" ? "var(--text-200)" : "var(--text-100)"};
    font-size: 18px;
  }
  button {
    background-color: ${({ $variant }) =>
      $variant === "primary" ? "var(--text-100)" : "var(--bg-000)"};
    color: ${({ $variant }) =>
      $variant === "primary" ? "var(--bg-100)" : "var(--text-100)"};
    font-weight: bold;
    border: 0.1px solid var(--bg-100);
    padding: 16px 32px;
    border-radius: var(--small-radius);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  img {
    max-width: ${DEVICE_BREAKPOINTS["2xs"]};
    border: none;
    padding-bottom: 12px;

    mask-image: radial-gradient(
      #000000 10%,
      rgba(0, 0, 0, 0.7) 50%,
      transparent 70%
    );
  }

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    flex-direction: column;

    h2,
    h3 {
      text-align: center;
    }
    p {
      text-align: center;
    }
    img {
      max-width: 90%;
    }
  }
`;

const BannerTexts = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    align-items: center;
  }
`;

const Highlight = styled.span`
  line-height: 1.3;
  color: var(--primary-200);
`;
