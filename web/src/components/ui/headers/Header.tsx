import { TextComponentType } from "@/types/Text";
import { ComponentProps } from "react";

type Props = ComponentProps<"h1"> & {
  text: string;
  componentType?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Header = ({
  text,
  componentType = TextComponentType.H1,
  ...props
}: Props) => {
  switch (componentType) {
    case TextComponentType.H1:
      return <h1 {...props}>{text}</h1>;
    case TextComponentType.H2:
      return <h2 {...props}>{text}</h2>;
    case TextComponentType.H3:
      return <h3 {...props}>{text}</h3>;
    case TextComponentType.H4:
      return <h4 {...props}>{text}</h4>;
    case TextComponentType.H5:
      return <h5 {...props}>{text}</h5>;
    case TextComponentType.H6:
      return <h6 {...props}>{text}</h6>;
  }
};
