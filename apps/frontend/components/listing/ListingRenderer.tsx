import React from "react";
import { Flex, Stack, Body, BodySmall, AspectRatio } from "@river/design-system";
import Image from "next/image";


type ListingRendererProps = {
    mediaURL: string// You can replace 'any' with the actual type of your listings
  };

export function ListingRenderer({mediaURL}: ListingRendererProps) {
  // Render the listings
  return (
    <Stack className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <Image fill src={mediaURL} alt="Image" className="rounded-md object-cover" />
      </AspectRatio>
    </Stack>
  );
}
