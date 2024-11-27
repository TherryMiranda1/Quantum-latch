import { useState } from "react";
import { UIOptions } from "../types";

export const useUI = (): UIOptions => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return {
    showLoginModal,
    setShowLoginModal,
  };
};
