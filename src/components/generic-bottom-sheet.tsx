import {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetContent,
  BottomSheetPortal,
  BottomSheetRef,
} from "@/src/components/ui/bottomsheet";
import React, { useCallback, useEffect, useRef } from "react";
import { Text } from "react-native";

export interface GenericBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function GenericBottomSheet({
  isOpen,
  onClose,
  title,
  children,
}: GenericBottomSheetProps) {
  const bottomSheetRef = useRef<BottomSheetRef>(null);

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
        backgroundClassName="bg-[#1B1B1B]"
        handleIndicatorClassName="bg-neutral-500 w-12 h-1 rounded-full"
        backdropComponent={renderBackdrop}
      >
        <BottomSheetContent className="bg-[#1B1B1B] pb-4">
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
