import { Header } from "@/components";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import styled from "styled-components";
import { GalleryView } from "./Gallery";
import { Repository } from "@/types/Repository";

const APP_SLUG = "quantum-latch";

export const Checkout = () => {
  const getInstallationUrl = (repoName: string) =>
    `https://github.com/apps/${APP_SLUG}/installations/new?repository_ids=${repoName}`;

  const handleSelect = (item: Repository) => {
    window.location.href = getInstallationUrl(item.title);
  };
  return (
    <CheckoutStyled>
      <Header componentType="h2" text={"Dashboard"} />
      <CheckoutCardStyled>
        <GalleryView onSelect={handleSelect} />
      </CheckoutCardStyled>
    </CheckoutStyled>
  );
};

const CheckoutStyled = styled.section`
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  gap: 16px;
  padding: 16px;
  background-color: var(--bg-000);
`;

const CheckoutCardStyled = styled.article`
  display: flex;
  flex-direction: column;
  max-width: ${DEVICE_BREAKPOINTS.md};
  margin: 32px auto;
  padding: 8px;
  gap: 12px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: var(--gradient-100);
  border-radius: var(--card-radius);
  border: 0.1px solid var(--bg-300);
`;
