import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from '@/src/components/ui/form-control';
import { Input, InputField } from '@/src/components/ui/input';
import { KeyboardTypeOptions } from 'react-native';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  className?: string;
  multiline?: boolean;
}

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  className = '',
  multiline = false,
}: FormInputProps) {
  return (
    <FormControl className={className}>
      <FormControlLabel className="mb-0">
        <FormControlLabelText className="text-muted-foreground text-sm">
          {label}
        </FormControlLabelText>
      </FormControlLabel>
      <Input className="border-t-0 border-l-0 border-r-0 border-b-[1px] border-b-surface-neutral/30 rounded-none p-2 mt-2 h-auto min-h-0 bg-transparent">
        <InputField
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={keyboardType}
          multiline={multiline}
          className="text-white text-xl font-semibold px-0 py-2 h-auto leading-[1.2] bg-transparent"
          placeholderTextColor="#666"
        />
      </Input>
    </FormControl>
  );
}
