import styled from "styled-components";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { Popover } from "../Popover/Popover";
import { AuthWidget } from "../AuthWidget/AuthWidget";
import { useParamsHandler } from "@/hooks/useParamsHandler";
import { Footer } from "../Footer/Footer";
import { FooterBottom, FooterBrand } from "../Footer/FooterBrand";
import { Button } from "@/components/ui";
import { MdFeedback } from "react-icons/md";
import { FOOTER_LINKS } from "@/translations/footer";
import { BRAND } from "@/assets/brand";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  children?: React.ReactNode;
}

export const Navigation = ({ children }: Props) => {
  const navigate = useNavigate();
  const {
    user: { currentUser },
    ui: { showLoginModal, setShowLoginModal },
  } = useGlobalContext();

  useParamsHandler();

  return (
    <NavigationStyled>
      <AppContainer>
        {showLoginModal && (
          <Popover onClose={() => setShowLoginModal(false)}>
            <AuthWidget />
          </Popover>
        )}
        {children}
      </AppContainer>
      <Footer
        topContent={<FooterBrand title={BRAND.title} logo={BRAND.logo} />}
        bottomContent={<FooterBottom title={BRAND.title} />}
        links={FOOTER_LINKS}
        {...(currentUser && {
          footerCTA: (
            <Button
              onClick={() => navigate({ to: "/feedback" })}
              text="Dar feedback"
            >
              <MdFeedback />
            </Button>
          ),
        })}
      />
    </NavigationStyled>
  );
};

const NavigationStyled = styled.main`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

const AppContainer = styled.section`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  align-items: center;
`;
