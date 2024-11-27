import { Animated } from "@/components/ui/animated/Animated";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import { ICON_SIZES } from "@/constants/sizes";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

interface Props {
  children?: React.ReactNode;
  onClose?: () => void;
}
export const Popover = ({ children, onClose }: Props) => {
  return (
    <PopoverStyled>
      <Animated>
        <PopoverModalStyled>
          <FloatingButtonStyled onClick={() => onClose?.()}>
            <IoClose size={ICON_SIZES.sm} />
          </FloatingButtonStyled>
          {children}
        </PopoverModalStyled>
      </Animated>
    </PopoverStyled>
  );
};

const PopoverStyled = styled.div`
  z-index: 100;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 32px;
  background: var(--bg-50);
  box-sizing: border-box;
  backdrop-filter: blur(8px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const PopoverModalStyled = styled.section`
  position: relative;
  width: 100%;
  margin: auto;
  max-width: ${DEVICE_BREAKPOINTS.xs};
`;

const FloatingButtonStyled = styled.div`
  position: absolute;
  z-index: 10;
  top: 6px;
  right: 6px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
`;
