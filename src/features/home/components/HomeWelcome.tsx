import { HeroHeader } from "@/src/components/hero-header";
import { ChevronRightIcon } from "@/src/components/ui/icon";

interface HomeWelcomeProps {
  username: string;
  currentPeriod: string;
  onPeriodPress?: () => void;
}

export function HomeWelcome({
  username,
  currentPeriod,
  onPeriodPress,
}: HomeWelcomeProps) {
  return (
    <HeroHeader
      subtitle={`Olá, ${username}!`}
      title={currentPeriod}
      onTitlePress={onPeriodPress}
      rightIcon={ChevronRightIcon}
    />
  );
}
