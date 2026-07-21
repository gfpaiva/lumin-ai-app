import React from 'react';
import { Pressable } from '@/src/components/ui/pressable';

interface ButtonProps {
  onPress?: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({ onPress, children, className = '' }: ButtonProps) {
  return (
    <Pressable 
      onPress={onPress}
      className={`flex-row items-center justify-center bg-surface-neutral rounded-full py-4 px-6 active:opacity-80 border border-surface-neutral/30 ${className}`}
    >
      {children}
    </Pressable>
  );
}
