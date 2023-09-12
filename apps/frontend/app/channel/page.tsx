'use client';
import React, { useState } from "react";
import { useWeb3Storage } from "../../hooks/useWeb3Storage";
import { ChannelUri } from "../../components/client/ChannelUri/ChannelUri";
import { Input, Button, Stack } from "@river/design-system";

export default function Page() {
  
      
    return (
      <Stack>
       <ChannelUri />
      </Stack>
    );
}