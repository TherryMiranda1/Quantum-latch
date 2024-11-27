import { useLocation } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import styled from "styled-components";
import { NAVIGATION_OPTIONS } from "../navigation.constants";
import { DEVICE_BREAKPOINTS } from "../../../../constants/devices";

interface Props {
  $width: string;
}

export const LeftMenu = ({ $width }: Props) => {
  const { pathname } = useLocation();
  const getIsActive = (path: string) => pathname === path;

  return (
    <LeftMenuStyled $width={$width}>
      {NAVIGATION_OPTIONS.filter((item) => !item.isMainOption).map((item) => (
        <LeftMenuItemStyled
          key={item.title}
          to={item.path}
          $isActive={getIsActive(item.path)}
          $isMain={item.isMainOption}
        >
          {item.icon}
          {item.title}
        </LeftMenuItemStyled>
      ))}
      {NAVIGATION_OPTIONS.filter((item) => item.isMainOption).map((item) => (
        <MainOptionStyled to={item.path} key={item.title}>
          {item.title} {item.icon}
        </MainOptionStyled>
      ))}
    </LeftMenuStyled>
  );
};
const LeftMenuStyled = styled.nav<{ $width: string }>`
  background-color: var(--background-transparent-color);
  border-top: 1px solid var(--bg-300);
  position: fixed;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width};
  gap: 16px;
  padding: 32px 16px;

  @media screen and (max-width: ${DEVICE_BREAKPOINTS.md}) {
    display: none;
  }
`;

const LeftMenuItemStyled = styled(Link)<{
  $isMain?: boolean;
  $isActive?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: var(--small-radius);
  padding: 8px;
  color: ${({ $isActive }) =>
    $isActive ? "var(--primary-100)" : "var(--text-100)"};

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: var(--text-100);
    color: var(--bg-100);
  }
`;

const MainOptionStyled = styled(Link)`
  background-color: var(--text-100);
  color: var(--bg-100);
  border-radius: var(--small-radius);
  padding: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  font-size: 18px;
`;
