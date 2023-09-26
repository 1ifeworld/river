import { BodyLarge, Stack } from "@river/estuary";

export default function Feedback() {
  return (
    <Stack className="h-screen  justify-center items-center gap-4 md:gap-8">
      <Stack className="w-9/12 md:w-6/12">
        <BodyLarge className="text-label">
          We've been working on River for quite some time, and are eager to hear
          about people's experience using the platform.
        </BodyLarge>
        <br />
        <BodyLarge className="text-label ">
          You can leave anything that comes to mind at the following&nbsp;
          <a
            className="italic underline"
            href="https://forms.gle/iXCnFcyiKj51fEeo6"
            target="_blank"
            rel="noopener noreferrer"
          >
            link
          </a>
        </BodyLarge>
      </Stack>
    </Stack>
  );
}
