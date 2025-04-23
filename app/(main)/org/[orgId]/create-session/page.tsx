"use client";

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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { ImageUpload, ImageUploadFolder, ImageUploadHandle } from "@/app/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/app/components/spinner";
import { FormStatus } from "@/app/models/FormStatus";
import { useParams, useRouter } from "next/navigation";
import { createMeetup, CreateMeetupRequest } from "@/app/(main)/actions/createMeetup";
import { useOrg } from "../components/OrgContextProvider";
import { RosterStrategy } from "@prisma/client";

const libraries: any = ["places"];

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().optional(),
  location: z.string().optional(),
  splashImage: z.string().optional(),
  openSlots: z.number().optional(),
});

export default function CreateSessionPage() {
  const [formStatus, setFormStatus] = useState(FormStatus.IDLE);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [rosterStrategy, setRosterStrategy] = useState<RosterStrategy>("OPEN");

  const router = useRouter();
  const params = useParams();
  const org = useOrg();

  // Google maps location stuff
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [locationValue, setLocationValue] = useState("");
  const [googleMapLocation, setGoogleMapLocation] = useState<google.maps.places.PlaceResult | null>(
    null
  );

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();
    if (place?.geometry?.location) {
      console.log(place);

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address || locationValue;
      setLocationValue(address);
      setGoogleMapLocation(place);
      // onLocationSelect(lat, lng, address);
    }
  };

  // Define your form.

  const imageUploadRef = useRef<ImageUploadHandle>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setFormStatus(FormStatus.LOADING);
    await imageUploadRef.current?.uploadImage();

    console.log("Form values:", values);

    let data: CreateMeetupRequest = {
      title: values.title,
      description: values.description,
      orgId: org.id,
      splashImage: imageUrl,
    };

    if (googleMapLocation) {
      data = {
        ...data,
        location: {
          placeId: googleMapLocation.place_id || "UNKNOWN",
          name: googleMapLocation.name || "UNKNOWN",
          address: googleMapLocation.formatted_address || "UNKNOWN",
        },
      };
    }

    createMeetup(data);

    router.push(`/org/${org.id}`);
  }

  if (!isLoaded) return <Spinner />;

  return (
    <div className="flex flex-col h-full w-full items-start justify-start mx-4">
      <h1>Create Session</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Name</FormLabel> */}
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Name</FormLabel> */}
                <FormControl>
                  <Input placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Name</FormLabel> */}
                <FormControl>
                  <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                    <Input
                      value={locationValue}
                      onChange={(e) => {
                        setLocationValue(e.target.value);
                        field.onChange(e);
                      }}
                      placeholder="Search for a location"
                    />
                  </Autocomplete>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date and Time Selector */}

          <FormField
            control={form.control}
            name="splashImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Splash Image</FormLabel>
                <ImageUpload
                  ref={imageUploadRef}
                  onUpload={(imageUrl) => setImageUrl(imageUrl)}
                  fileName={crypto.randomUUID()}
                  filePath={ImageUploadFolder.Meetup}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Name</FormLabel> */}
                <FormControl>
                  <RadioGroup
                    onValueChange={(v) =>
                      setRosterStrategy(
                        v === "open" ? RosterStrategy.OPEN : RosterStrategy.POSITIONS
                      )
                    }
                    defaultValue="open"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open" id="r1" defaultChecked={true} />
                      <Label htmlFor="r1">Open</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="positions" id="r2" />
                      <Label htmlFor="r2">Positions</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {rosterStrategy === RosterStrategy.OPEN && (
            <FormField
              control={form.control}
              name="openSlots"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Name</FormLabel> */}
                  <FormControl>
                    <Input className="w-[30%]" placeholder="# People" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Conditional Position Sign Up */}

          <Button type="submit" className="w-full" disabled={formStatus !== FormStatus.IDLE}>
            {formStatus === FormStatus.LOADING ? <Spinner /> : "Create Session"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
