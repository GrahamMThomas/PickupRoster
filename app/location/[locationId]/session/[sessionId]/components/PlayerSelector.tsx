"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Player } from "@prisma/client";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { createPlayer } from "../actions/createPlayer";

export default function PlayerSelector({
  playerList,
  locationId,
  onSelect,
}: {
  playerList: Player[];
  locationId: number;
  onSelect: (selectedPlayer: Player) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [inProgressValue, setProgressValue] = React.useState("");
  //   const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? playerList.find((player) => player.name === value)?.name : "Enter Name"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Name T."
            value={inProgressValue}
            onInput={(e) => setProgressValue(e.currentTarget.value)}
          />
          <CommandList>
            <CommandEmpty>
              <Button
                onClick={async () => {
                  const player: Player = await createPlayer(inProgressValue, locationId);
                  playerList.push(player);
                  setValue(player.name);
                  setOpen(false);
                  onSelect(player);
                }}
              >
                Create {inProgressValue}
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {playerList
                .filter((x) => x.name.toLowerCase().startsWith(inProgressValue.toLowerCase()))
                .map((player) => (
                  <CommandItem
                    key={player.id}
                    value={player.name}
                    onSelect={(currentValue: string) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onSelect(player);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === player.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {player.name}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
