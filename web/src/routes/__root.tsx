import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { toastConfig } from "../config/toast.config";
import { TopBar } from "@/components/widgets/Navigation/components/TopBar";
import { Navigation } from "@/components";

export const Route = createRootRoute({
  component: () => (
    <>
      <TopBar />
      <Navigation>
        <ScrollRestoration  />
        <Outlet />
        <Toaster toastOptions={toastConfig} />
      </Navigation>
    </>
  ),
});
