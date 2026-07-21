import type { VariantProps } from "@gluestack-ui/utils/nativewind-utils";
import { tva } from "@gluestack-ui/utils/nativewind-utils";
import React from "react";
import { Text, View } from "react-native";

const tagStyle = tva({
  base: "flex-row items-center justify-center self-start",
  variants: {
    variant: {
      neutral: "bg-surface-neutral/80 border border-surface-neutral",
      primary: "bg-primary border border-primary",
    },
    size: {
      md: "px-4 py-2 rounded-full",
      lg: "px-6 py-4 rounded-full w-full",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
  },
});

const tagTextStyle = tva({
  base: "text-center font-medium",
  variants: {
    variant: {
      neutral: "text-foreground",
      primary: "text-primary-foreground",
    },
    size: {
      md: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
  },
});

export type TagProps = React.ComponentProps<typeof View> &
  VariantProps<typeof tagStyle> & {
    children: React.ReactNode;
  };

export function Tag({
  variant,
  size,
  className,
  children,
  ...props
}: TagProps) {
  return (
    <View className={tagStyle({ variant, size, class: className })} {...props}>
      <Text className={tagTextStyle({ variant, size })}>{children}</Text>
    </View>
  );
}
