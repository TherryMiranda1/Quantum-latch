import styled from "styled-components";
import { ICON_SIZES } from "../../../constants/sizes";
import { IoCloseOutline } from "react-icons/io5";
import { DEVICE_BREAKPOINTS } from "../../../constants/devices";

interface Props {
  onClose: () => void;
  children?: React.ReactNode;
  maxWidth?: string;
}

export const Closable = ({ onClose, maxWidth, children }: Props) => {
  return (
    <ImageViewerStyled $maxWidth={maxWidth}>
      <CloseButtonStyled
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <IoCloseOutline size={ICON_SIZES.md} />
      </CloseButtonStyled>
      {children}
    </ImageViewerStyled>
  );
};

const ImageViewerStyled = styled.div<{
  $maxWidth?: string;
  $width?: number;
  $height?: number;
}>`
  position: relative;
  height: 100%;
  overflow: hidden;
  border-radius: var(--card-radius);
  max-width: ${(props) => props.$maxWidth && props.$maxWidth};
`;

const CloseButtonStyled = styled.button`
  border-radius: 0;
  background-color: var(--background-transparent-color);
  border-bottom-left-radius: var(--card-radius);
  position: absolute;
  z-index: 20;
  padding: 4px;
  top: 0;
  right: 0;

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.sm}) {
    padding: 2px;
    svg {
      font-size: 16px;
      transition: all 0.3s ease-in-out;
    }
  }
`;
