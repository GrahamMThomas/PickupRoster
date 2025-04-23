import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Fragment } from "react";

export default function OpenPositionFormFields(form) {
  return (
    <Fragment>
      <FormField
        control={form.control}
        name="openSlots"
        render={({ field }) => (
          <FormItem>
            {/* <FormLabel>Name</FormLabel> */}
            <FormControl>
              <Input placeholder="# Players" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Fragment>
  );
}
