import { createRoot } from "react-dom/client";
import "./index.css";

import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { GlobalContainer } from "./context/GlobalContext/GlobalContext";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const userPreferredTheme = localStorage.getItem("data-theme");
const userPreferredVariant = localStorage.getItem("data-variant");

if (userPreferredTheme) {
  document.documentElement.setAttribute("data-theme", userPreferredTheme);
} else {
  document.documentElement.setAttribute("data-theme", "dark-zen");
}

if (userPreferredVariant) {
  document.documentElement.setAttribute("data-variant", userPreferredVariant);
} else {
  document.documentElement.setAttribute("data-variant", "BUBBLE");
}

createRoot(document.getElementById("root")!).render(
  <GlobalContainer>
    <RouterProvider router={router} />
  </GlobalContainer>
);
