"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Player } from "@prisma/client";
import { signIn } from "../actions/signIn";
import { useForm } from "react-hook-form";
import PlayerSelector from "./PlayerSelector";
import React from "react";

export default function SignInButton({
  sessionId,
  playerList,
  locationId,
}: {
  playerList: Player[];
  locationId: number;
  sessionId: number;
}) {
  const form = useForm();
  const [player, setPlayer] = React.useState<Player | null>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign In</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            action={async () => {
              await signIn(sessionId, player!.id);
              window.location.reload();
            }}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <PlayerSelector
                      locationId={locationId}
                      playerList={playerList}
                      onSelect={setPlayer}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={player == null}>
              Sign In
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
