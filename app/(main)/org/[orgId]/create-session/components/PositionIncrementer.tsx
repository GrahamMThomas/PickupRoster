"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PositionIncrementerProps {
  label: string;
  initialValue?: number;
  onChange?: (value: number) => void;
}

export default function PositionIncrementer({
  label,
  initialValue,
  onChange,
}: PositionIncrementerProps) {
  const [counter, setCounter] = useState(initialValue || 0);

  const handleChange = (value: number) => {
    setCounter(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <p className="font-normal text-secondary-foreground text-sm">{label}</p>
      <div className="flex flex-row items-center justify-between gap-2">
        <Button
          size="icon"
          variant="outline"
          disabled={counter <= 0}
          className="w-6 h-6"
          onClick={() => handleChange(counter - 1)}
        >
          −
        </Button>
        <p className="font-medium text-sm w-2">{counter}</p>
        <Button
          size="icon"
          variant="outline"
          className="w-6 h-6"
          onClick={() => handleChange(counter + 1)}
        >
          +
        </Button>
      </div>
    </div>
  );
}
