import { View } from "@/components";
import { getIsMember } from "@/utils/localStorage/getIsMember";
import { Checkout } from "@/Views/Checkout";
import { redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/app/")({
  beforeLoad: ({ location }) => {
    if (!getIsMember()) {
      throw redirect({
        to: "/login",
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <View applyMaxWidth={false}>
      <Checkout />
    </View>
  ),
});
