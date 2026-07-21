import { Header } from "@/src/components/header";
import { HeroHeader } from "@/src/components/hero-header";
import { ChevronLeftIcon, Icon } from "@/src/components/ui/icon";
import { Pressable } from "@/src/components/ui/pressable";
import { useRouter } from "expo-router";
import React from "react";

interface LayoutHeaderProps {
  subtitle: string;
  title: string;
  rightIcon?: any;
  onTitlePress?: () => void;
  onBackPress?: () => void;
}

export function LayoutHeader({
  subtitle,
  title,
  rightIcon,
  onTitlePress,
  onBackPress,
}: LayoutHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <>
      <Header />
      <Pressable onPress={handleBack} className="mb-4 self-start">
        <Icon as={ChevronLeftIcon} size="xl" className="text-foreground" />
      </Pressable>
      <HeroHeader
        subtitle={subtitle}
        title={title}
        rightIcon={rightIcon}
        onTitlePress={onTitlePress}
      />
    </>
  );
}
