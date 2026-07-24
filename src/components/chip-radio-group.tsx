import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { CheckIcon, Icon } from '@/src/components/ui/icon';

export interface ChipOption {
  value: string;
  label: string;
}

interface ChipRadioGroupProps {
  label: string;
  options: ChipOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  className?: string;
}

export function ChipRadioGroup({
  label,
  options,
  selectedValue,
  onValueChange,
  className = '',
}: ChipRadioGroupProps) {
  return (
    <View className={className}>
      <Text className="text-white text-base font-normal mb-3">{label}</Text>
      <View className="flex-row flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          return (
            <Pressable
              key={option.value}
              onPress={() => onValueChange(option.value)}
              className={`flex-row items-center px-5 py-3 rounded-full border active:opacity-75 ${
                isSelected
                  ? 'bg-surface-neutral border-surface-neutral'
                  : 'bg-transparent border-surface-neutral/50'
              }`}
            >
              <Text
                className={`text-base font-medium ${
                  isSelected ? 'text-white' : 'text-white/80'
                }`}
              >
                {option.label}
              </Text>
              {isSelected && (
                <Icon
                  as={CheckIcon}
                  size="xs"
                  className="text-white ml-2"
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
