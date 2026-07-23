import { Avatar, AvatarFallbackText } from "@/src/components/ui/avatar";
import { Box } from "@/src/components/ui/box";
import { ChevronDownIcon, Icon } from "@/src/components/ui/icon";
import { Pressable } from "@/src/components/ui/pressable";
import { LuminLogo } from "./lumin-logo";

interface HeaderProps {
  username?: string;
  onLogout?: () => void;
}

export function Header({ username = "Prof.", onLogout }: HeaderProps) {
  return (
    <Box className="flex-row items-center justify-between pt-12 pb-4">
      {/* Brand SVG Logo */}
      <LuminLogo width={80} height={20} color="#505C8E" />

      {/* Avatar Menu */}
      <Pressable className="flex-row items-center bg-card rounded-full pr-3 pl-2 py-2 gap-2 border border-surface-neutral/20">
        <Avatar className="h-8 w-8 bg-surface-dark">
          <AvatarFallbackText className="text-foreground text-xs">
            {username}
          </AvatarFallbackText>
        </Avatar>
        <Icon
          as={ChevronDownIcon}
          size="sm"
          className="text-muted-foreground"
        />
      </Pressable>
    </Box>
  );
}
