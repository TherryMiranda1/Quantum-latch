import { View } from "@/components";
import { FeedbackView } from "@/Views/FeedbackView";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/feedback")({
  component: () => (
    <View>
      <FeedbackView />
    </View>
  ),
});
