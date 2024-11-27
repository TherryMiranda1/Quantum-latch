import { Button, Header } from "@/components";
import { Text } from "@/components/ui/text/Text";
import { AuthWidget } from "@/components/widgets/AuthWidget/AuthWidget";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { useNavigate } from "@tanstack/react-router";

import styled from "styled-components";

export const ProfileView = () => {
  const navigate = useNavigate();
  const {
    user: { logout, currentUser },
  } = useGlobalContext();

  return (
    <div>
      {!currentUser && <AuthWidget />}
      {currentUser && (
        <UserCardStyled>
          <Header text="Mi perfil" />
          {currentUser.name && <Text text={` ${currentUser.name}`} />}
          <Text text={` ${currentUser.email}`} />
          <Text text={` ${currentUser.role}`} />
          <Button
            onClick={() => {
              logout();
              navigate({ to: "/" });
            }}
          >
            Cerrar sesion
          </Button>
        </UserCardStyled>
      )}
    </div>
  );
};

const UserCardStyled = styled.article`
  display: flex;
  flex-direction: column;
  max-width: ${DEVICE_BREAKPOINTS.md};
  margin: 32px auto;
  padding: 32px;
  gap: 16px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--bg-50);
  backdrop-filter: blur(10px);
  border-radius: var(--card-radius);
  border: 0.1px solid var(--bg-100);

  button {
    padding: 16px 24px;
  }
`;
