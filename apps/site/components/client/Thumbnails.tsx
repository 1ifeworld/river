import { Stack, Typography } from "@/design-system";


export function GenericThumbnailLarge({ text }: {text?: string}) {
  return (
    <Stack
      className="bg-[#E9E9E9] justify-center items-center min-w-[316px] w-full h-[316px]"
    >
      <Typography className="text-secondary-foreground text-[50px]">
        {text
          ? text === "image/jpeg"
            ? `${text.slice(-5).toLowerCase()}`
            : `${text.slice(-4).toLowerCase()}`
          : ""}
      </Typography>
    </Stack>
  );
}

export function GenericThumbnailSmall({ text }: {text?: string}) {
  return (
    <Stack
      className="bg-[#E9E9E9] justify-center items-center w-[38px] h-[38px]"
    >
      <Typography className="text-secondary-foreground text-[10px]">
        {text
          ? text === "image/jpeg"
            ? `${text.slice(-5).toLowerCase()}`
            : `${text.slice(-4).toLowerCase()}`
          : ""}
      </Typography>
    </Stack>
  );
}

