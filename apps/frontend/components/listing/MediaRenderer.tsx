import React from "react";
import Image from "next/image";

export function MediaRenderer({ mediaURL }: { mediaURL: string }) {
  return (
    <div className="relative h-[90%] w-full">
      <Image
        fill={true}
        src={mediaURL}
        alt="Image"
        className=""
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
