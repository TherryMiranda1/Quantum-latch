import { createLazyFileRoute } from "@tanstack/react-router";
import { View } from "../components";
import { Landing } from "@/Views/Landing";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <View applyMaxWidth={false}>
      <Landing />
    </View>
  ),
});
