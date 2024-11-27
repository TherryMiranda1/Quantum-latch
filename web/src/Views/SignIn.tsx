import { Button, Section } from "@/components";
import { AuthWidget } from "./../components/widgets/AuthWidget/AuthWidget";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import styled from "styled-components";

export const SignIn = () => {
  const {
    user: { logout, currentUser },
  } = useGlobalContext();

  return (
    <LoginSection>
      {!currentUser && <AuthWidget />}
      {currentUser && <Button onClick={() => logout()}>Cerrar sesion</Button>}
    </LoginSection>
  );
};

const LoginSection = styled(Section)`
  padding: 48px 16px;
`;
