import React from "react";
import { Flex, cn } from "@river/design-system";

export function MediaContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex className="h-[75%] w-full justify-center items-center border-2 border-label-faint">
      {children}
    </Flex>
  );
}
