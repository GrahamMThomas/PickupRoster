"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createOrganization } from "../../actions/createOrganization";

// TODO: Input validation
const OrganizationSchema = z.object({
  id: z
    .string()
    .min(3, "ID must be at least 3 characters")
    .max(24, "ID must be under 24 characters")
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters")
    .max(48, "Display name must be under 48 characters"),
});

type OrganizationFormData = z.infer<typeof OrganizationSchema>;

export default function OrganizationCreator() {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      id: "",
      displayName: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create new Organization</Button>
      </DialogTrigger>
      <DialogContent className="rounded w-[85%]">
        <DialogHeader className="text-left">
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Select name and ID, you can update additional fields after creation.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-6 flex flex-col"
            onSubmit={form.handleSubmit(async (data) => {
              await createOrganization(data);
              window.location.reload();
            })}
          >
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ID</FormLabel>
                  <FormDescription>
                    This is the unique identifier for your organization. It will be used in the URL.
                  </FormDescription>
                  <FormControl>
                    <Input placeholder="awesome-volleyball-club" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Awesome Volleyball Club" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="flex self-center w-[50%]" type="submit">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
