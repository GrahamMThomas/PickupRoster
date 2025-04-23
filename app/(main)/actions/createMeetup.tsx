"use server";

import { PrismaClient } from "@prisma/client";
import { request } from "http";

const prisma = new PrismaClient();

interface CreateLocationRequest {
  placeId: string;
  name: string;
  address: string;
}

export interface CreateMeetupRequest {
  title: string;
  orgId: string;
  description?: string;
  splashImage?: string;

  location?: CreateLocationRequest;
}

export async function createMeetup(formData: CreateMeetupRequest) {
  // Ensure all variables are set

  let locationToMeet = null;

  if (formData.location) {
    locationToMeet = await prisma.location.create({
      data: {
        placeId: formData.location.placeId,
        name: formData.location.name,
        address: formData.location.address,
      },
    });
  }

  await prisma.roster.create({
    data: {},
  });

  await prisma.meetup.create({
    data: {
      title: formData.title,
      orgId: formData.orgId,
      description: formData.description,
      splashImage: formData.splashImage,
      locationId: locationToMeet?.id,
    },
  });
}
