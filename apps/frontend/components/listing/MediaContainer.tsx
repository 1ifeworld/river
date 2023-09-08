import React from "react";
import { Flex, cn } from "@river/design-system";

export function MediaContainer({ children }: { children: React.ReactNode }) {
  return (
    <Flex className="border-b border-base-border h-[75%] w-full justify-center items-center">
      {children}
    </Flex>
  );
}
