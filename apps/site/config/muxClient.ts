import Mux from "@mux/mux-node";

export const muxClient = new Mux(
  process.env.NEXT_PUBLIC_MUX_TOKEN_ID as string,
  process.env.NEXT_PUBLIC_MUX_TOKEN_SECRET as string
);
