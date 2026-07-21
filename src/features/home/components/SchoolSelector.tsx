import { Box } from "@/src/components/ui/box";
import { ChevronDownIcon, Icon } from "@/src/components/ui/icon";
import { Menu, MenuItem, MenuItemLabel } from "@/src/components/ui/menu";
import { Pressable } from "@/src/components/ui/pressable";
import { Text } from "react-native";

interface SchoolSelectorProps {
  selectedSchool: string;
}

export function SchoolSelector({ selectedSchool }: SchoolSelectorProps) {
  return (
    <Box className="mb-6">
      <Menu
        placement="bottom left"
        trigger={({ ...triggerProps }) => {
          return (
            <Pressable
              {...triggerProps}
              className="flex-row items-center self-start bg-card rounded-full px-6 py-4 gap-2 border border-surface-neutral/25"
            >
              <Text className="text-foreground font-medium text-base">
                {selectedSchool}
              </Text>
              <Icon
                as={ChevronDownIcon}
                size="sm"
                className="text-muted-foreground"
              />
            </Pressable>
          );
        }}
      >
        <MenuItem key={selectedSchool} textValue={selectedSchool}>
          <MenuItemLabel className="text-sm text-foreground">
            {selectedSchool}
          </MenuItemLabel>
        </MenuItem>
        <MenuItem key="school-2" textValue="EE Professor João">
          <MenuItemLabel className="text-sm text-foreground">
            EE Professor João
          </MenuItemLabel>
        </MenuItem>
      </Menu>
    </Box>
  );
}
