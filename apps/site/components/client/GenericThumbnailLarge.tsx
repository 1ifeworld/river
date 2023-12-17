import { Stack, Typography } from "@/design-system";

interface GenericThumbnailLargeProps {
  text?: string;
}

export function GenericThumbnailLarge({ text }: GenericThumbnailLargeProps) {
  return (
    <Stack
      className={`bg-[#E9E9E9] justify-center items-center w-[316px] h-[316px]`}
    >
      <Typography className={`text-secondary-foreground text-[50px]`}>
        {text
          ? text === "image/jpeg"
            ? `${text.slice(-5).toLowerCase()}`
            : `${text.slice(-4).toLowerCase()}`
          : ""}
      </Typography>
    </Stack>
  );
}
