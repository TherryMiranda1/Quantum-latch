import { View } from "@/components";
import { getIsMember } from "@/utils/localStorage/getIsMember";
import { Checkout } from "@/Views/Checkout";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/product")({
  beforeLoad: () => {
    if (getIsMember()) {
      throw redirect({
        to: "/app",
      });
    }
  },
  component: () => (
    <View applyMaxWidth={false}>
      <Checkout />
    </View>
  ),
});
