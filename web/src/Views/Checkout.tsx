import { Button, Header, Input } from "@/components";
import { DEVICE_BREAKPOINTS } from "@/constants/devices";
import styled from "styled-components";
import { GalleryView } from "./Gallery";
import { useGlobalContext } from "@/context/GlobalContext/useGlobalContext";
import { useEffect, useState } from "react";
import { Popover } from "@/components/widgets/Popover/Popover";
import { getStatusRequest, pairLatchRequest } from "@/infra/api/latch";

const APP_SLUG = "quantum-latch";

export const Checkout = () => {
  const [latchCode, setLatchCode] = useState("");
  const [showLatchModal, setShowLatchModal] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const {
    user: { currentUser, isUserLoaded },
  } = useGlobalContext();
  const getInstallationUrl = () =>
    `https://github.com/apps/${APP_SLUG}/installations/new`;

  const handleLinkLatch = async () => {
    const result = await pairLatchRequest({ code: latchCode });

    if (result) {
      setShowLatchModal(false);
      window.location.reload();
    }
  };

  const handleGetStatus = async () => {
    const status = await getStatusRequest();
    if (status.operation) {
      setStatus(status.operation === "on" ? "Desbloqueado 🟢" : "Protegido 🔴");
    }
  };

  const handleGithubPermissions = () => {
    window.location.href = getInstallationUrl();
  };

  useEffect(() => {
    if (currentUser?.isPaired) {
      handleGetStatus();
    }
  }, [currentUser]);

  return (
    <CheckoutStyled>
      {showLatchModal && (
        <Popover onClose={() => setShowLatchModal(false)}>
          <LatchModalContent>
            <Header componentType="h3" text={"Vincular Latch"} />
            <Input
              onChange={(e) => setLatchCode(e.target.value)}
              value={latchCode}
              placeholder="Código de Latch"
            />
            <Button disabled={!latchCode} onClick={handleLinkLatch}>
              Vincular
            </Button>
          </LatchModalContent>
        </Popover>
      )}
      <div>
        <Header componentType="h2" text={"Dashboard"} />
        {status && <p>{`${status}`}</p>}
      </div>
      <div>
        {isUserLoaded && !currentUser?.isPaired && (
          <ButtonStyled onClick={() => setShowLatchModal(true)}>
            Vincular Latch
          </ButtonStyled>
        )}
        <ButtonStyled onClick={() => handleGithubPermissions()}>
          Revisar Permisos
        </ButtonStyled>
      </div>

      <CheckoutCardStyled>
        <GalleryView />
      </CheckoutCardStyled>
    </CheckoutStyled>
  );
};

const LatchModalContent = styled.div`
  padding: 32px;
  background-color: var(--bg-000);
  overflow: hidden;
  border-radius: var(--card-radius);
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: var(--border);
`;

const CheckoutStyled = styled.section`
  width: 100%;
  max-width: ${DEVICE_BREAKPOINTS.md};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  box-sizing: border-box;
  gap: 8px;
  padding: 16px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    p {
      font-size: 14px;
      color: var(--text-200);
    }
  }
`;

const ButtonStyled = styled(Button)`
  max-width: 180px;
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
