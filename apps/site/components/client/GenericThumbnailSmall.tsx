import { Stack, Typography } from "@/design-system";

interface GenericThumbnailSmallProps {
  text?: string;
}

export function GenericThumbnailSmall({ text }: GenericThumbnailSmallProps) {
  return (
    <Stack
      className={`bg-[#E9E9E9] justify-center items-center w-[38px] h-[38px]`}
    >
      <Typography className={`text-secondary-foreground text-[10px]`}>
        {text
          ? text === "image/jpeg"
            ? `${text.slice(-5).toLowerCase()}`
            : `${text.slice(-4).toLowerCase()}`
          : ""}
      </Typography>
    </Stack>
  );
}
