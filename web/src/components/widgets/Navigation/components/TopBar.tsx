import { Link } from "@tanstack/react-router";

import { Header, Image, Navbar } from "../../../ui";
import { BRAND } from "@/assets/brand";
import styled from "styled-components";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { useTitle } from "@/hooks/useTitle";

export const TopBar = () => {
  const {
    user: { currentUser, isMember, isUserLoaded },
    ui: { setShowLoginModal },
  } = useGlobalContext();
  const title = useTitle();

  const homePage = isMember ? "/app" : "/";

  return (
    <Navbar>
      <Link to={homePage}>
        <HeaderStyled className="header">
          <Image $hideBorder src={BRAND.logo} alt={title} />
        </HeaderStyled>
      </Link>
      {currentUser && (
        <CurrentUserStyled>
          <Link to={"/me"}>
            <Header
              className="truncate"
              componentType="h5"
              text={`${currentUser.name || currentUser.email}`}
            />
            {currentUser.profileImage && (
              <img src={currentUser.profileImage} alt="profile" />
            )}
          </Link>
        </CurrentUserStyled>
      )}
      {isUserLoaded && !currentUser && (
        <CtaStyled onClick={() => setShowLoginModal(true)}>
          Iniciar sesión
        </CtaStyled>
      )}
    </Navbar>
  );
};
const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  img {
    width: auto;
    height: 44px;
  }
`;

const CurrentUserStyled = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;

  a {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    object-fit: cover;
    border: var(--border);
  }
`;

const CtaStyled = styled.button`
  padding: 8px 16px;
  font-weight: bold;
  border-radius: var(--small-radius);
  border: 1px solid var(--bg-100);
  color: var(--bg-100);
  background: var(--text-100);
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;
