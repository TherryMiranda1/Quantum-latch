import { useEffect } from "react";
import { BASE_API_URL } from "@/infra/Paths";
import styled from "styled-components";
import { FaBitbucket, FaGithub, FaGitlab } from "react-icons/fa";
import { ICON_SIZES } from "@/constants/sizes";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import { Button, Header } from "@/components/ui";

export const AuthWidget = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.location.href = "/dashboard"; // Redirige a la página principal
    }
  }, []);

  const handleGithubLogin = () => {
    window.location.href = `${BASE_API_URL}/auth/github`;
  };

  return (
    <AuthCardStyled>
      <Header componentType="h2" text={"Iniciar sesion"} />

      <AuthButtonStyled onClick={handleGithubLogin}>
        <FaGithub size={ICON_SIZES.md} /> Iniciar sesión con Github
      </AuthButtonStyled>

      <AuthButtonStyled disabled onClick={handleGithubLogin}>
        <FaGitlab size={ICON_SIZES.md} /> Iniciar con Gitlab (Proximamente)
      </AuthButtonStyled>
      <AuthButtonStyled disabled onClick={handleGithubLogin}>
        <FaBitbucket size={ICON_SIZES.md} /> Iniciar con Bitbucket
        (Proximamente)
      </AuthButtonStyled>
    </AuthCardStyled>
  );
};

const AuthCardStyled = styled.article`
  display: flex;
  flex-direction: column;
  margin: 32px auto;
  padding: 48px 32px;
  gap: 16px;
  width: 100%;
  max-width: ${DEVICE_BREAKPOINTS.sm};
  box-sizing: border-box;
  background: var(--bg-50);
  backdrop-filter: blur(10px);
  border-radius: var(--card-radius);
  border: 0.1px solid var(--bg-300);

  h2 {
    text-align: center;
    padding-bottom: 32px;
  }
`;

const AuthButtonStyled = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--small-radius);
  padding: 16px 24px;
  color: var(--text-100);
  background: var(--bg-000);
  border: 0.1px solid var(--bg-300);
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  &:hover {
    background: var(--gradient-100);
    border: 1px solid var(--text-200);
  }
`;
