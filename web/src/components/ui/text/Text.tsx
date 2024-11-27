import { TextComponentType } from "@/types/Text";
import { ComponentProps } from "react";

type Props = ComponentProps<"p"> & {
  text: string;
  componentType?: "p" | "span";
  isSecondary?: boolean;
};

export const Text = ({
  text,
  componentType = TextComponentType.P,
  isSecondary,
  ...props
}: Props) => {
  const className = isSecondary ? "secondaryText" : "";

  switch (componentType) {
    case TextComponentType.P:
      return (
        <p className={className} {...props}>
          {text}
        </p>
      );
    case TextComponentType.Span:
      return (
        <span className={className} {...props}>
          {text}
        </span>
      );
    default:
      return (
        <p className={className} {...props}>
          {text}
        </p>
      );
  }
};
