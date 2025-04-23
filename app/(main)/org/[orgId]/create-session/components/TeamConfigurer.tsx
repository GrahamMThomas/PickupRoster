"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TeamConfigurer() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Configure</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Configuration</DialogTitle>
          <DialogDescription>
            Configure your team settings here. You can set the roster strategy and other options.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
