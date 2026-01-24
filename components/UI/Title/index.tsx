import clsx from "clsx";
import { CSSProperties, ReactNode } from "react";

type FontType = "sans" | "mono" | "pacifico";
type HeadingLevel =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span"
  | "div";

interface TitleProps {
  children: ReactNode;
  font?: FontType;
  as?: HeadingLevel;
  className?: string;
  style?: CSSProperties;
  size?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
}

const fontMap: Record<FontType, string> = {
  sans: "font-sans",
  mono: "font-mono",
  pacifico: "font-pacifico",
};

export default function ComponentUITitle({
  children,
  font = "sans",
  as: Component = "h1",
  className,
  style,
  size,
}: TitleProps) {
  return (
    <Component
      className={clsx(fontMap[font], size && `text-${size}`, className)}
      style={style}
    >
      {children}
    </Component>
  );
}
