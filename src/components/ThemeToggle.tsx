
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn("relative overflow-hidden transition-colors duration-300", className)}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${
        theme === 'light' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all ${
        theme === 'dark' ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`} />
    </Button>
  );
};

export default ThemeToggle;
