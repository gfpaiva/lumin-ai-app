import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetPortal,
  BottomSheetRef,
} from "@/src/components/ui/bottomsheet";
import React, { useCallback, useEffect, useRef } from "react";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export interface GenericBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  keyboardBehavior?: "interactive" | "extend" | "fillParent";
  children: React.ReactNode;
}

export function GenericBottomSheet({
  isOpen,
  onClose,
  title,
  keyboardBehavior = "interactive",
  children,
}: GenericBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const insets = useSafeAreaInsets();

  const paddingBottom = Math.max(insets.bottom, 16) + 16;

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.open();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  return (
    <BottomSheet ref={bottomSheetRef} onClose={onClose} defaultSnapIndex={0}>
      <BottomSheetPortal
        enableDynamicSizing={true}
        enablePanDownToClose
        keyboardBehavior={keyboardBehavior}
        backgroundClassName="bg-[#1B1B1B]"
        handleIndicatorClassName="bg-neutral-500 w-12 h-1 rounded-full"
        backdropComponent={renderBackdrop}
      >
        <BottomSheetContent
          className="bg-[#1B1B1B]"
          style={{ paddingBottom }}
        >
          {title && (
            <Text className="text-white font-bold text-4xl mb-4 mt-8">
              {title}
            </Text>
          )}
          {children}
        </BottomSheetContent>
      </BottomSheetPortal>
    </BottomSheet>
  );
}
