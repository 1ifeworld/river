"use client";

import { Typography, Stack } from "@/design-system";

export default function Home() {
  return (
    <Stack className="gap-4 justify-center items-center h-[calc(100dvh-72px)]">
      <Typography variant="h1">River is undergoing maintenance</Typography>
      <Typography>Check back soon</Typography>
    </Stack>
  );
}
