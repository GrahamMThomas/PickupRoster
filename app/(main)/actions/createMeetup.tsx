"use server";

import { RosterByPosition } from "@/app/models/Team";
import { PrismaClient, RosterStrategy } from "@prisma/client";
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
  rosterStrategy: RosterStrategy;
  rosterByPosition: RosterByPosition | null;
  // rosterOpen:
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

  let roster = await prisma.roster.create({
    data: {
      strategyType: formData.rosterStrategy,
      strategy: serializedStrategy(formData.rosterStrategy, formData),
    },
  });

  await prisma.meetup.create({
    data: {
      title: formData.title,
      orgId: formData.orgId,
      description: formData.description,
      splashImage: formData.splashImage,
      locationId: locationToMeet?.placeId,
      rosterId: roster.id,
    },
  });
}

function serializedStrategy(rosterStrategy: RosterStrategy, request: CreateMeetupRequest): string {
  switch (rosterStrategy) {
    case RosterStrategy.POSITIONS:
      if (!request.rosterByPosition) {
        throw new Error("Roster by position is required for positions strategy");
      }
      console.log(JSON.stringify(request.rosterByPosition));
      return JSON.stringify(request.rosterByPosition);
    case RosterStrategy.OPEN:
      return "";
    default:
      throw new Error("Invalid roster strategy: " + rosterStrategy);
  }
}
