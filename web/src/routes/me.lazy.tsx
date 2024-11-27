import { createLazyFileRoute } from "@tanstack/react-router";
import { ProfileView } from "./../Views/Profile";
import { View } from "@/components";

export const Route = createLazyFileRoute("/me")({
  component: () => (
    <View>
      <ProfileView />
    </View>
  ),
});
