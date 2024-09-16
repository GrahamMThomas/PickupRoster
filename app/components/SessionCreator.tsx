"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { createSession } from "../../actions/createSession";
import { revalidatePath } from "next/cache";

interface SessionCreatorProps {
  locationId: number;
}

export default function SessionCreator({ locationId }: SessionCreatorProps) {
  const form = useForm();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new Session</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Session</DialogTitle>
          <DialogDescription>
            Can be anything you want. Name of the occasion, or court distinction.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            action={async (formData) => {
              await createSession(locationId, formData);
              revalidatePath("/");
            }}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Open Gym - Court 1" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your public display name.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
