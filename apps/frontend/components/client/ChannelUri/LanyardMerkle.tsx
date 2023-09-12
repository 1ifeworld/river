import React, { useState } from "react";
import { useWeb3Storage } from "../../../hooks/useWeb3Storage";
import { Input, Button, Stack } from "@river/design-system";
import { createLanyardTree } from "../../../hooks";

export function LanyardMerkle() {
  const [addresses, setAddresses] = useState<string[]>([]);
  const [inputAddress, setInputAddress] = useState<string>("");

  function isValidAddress(address: string): address is `0x${string}` {
    return address.startsWith("0x");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addresses.every(isValidAddress)) {
      const response = await createLanyardTree(addresses as `0x${string}`[]);
      console.log(response); // Display the result in the console
      setAddresses([]);
    } else {
      console.error("One or more addresses are not valid.");
    }
  };

  const handleAddAddress = () => {
    if (inputAddress) {
      const newAddresses = inputAddress.split(",").map((addr) => addr.trim());
      setAddresses((prev) => [...prev, ...newAddresses]);
      setInputAddress("");
    }
  };

  return (
    <Stack>
      <Input
        type="text"
        placeholder="Enter addresses separated by commas"
        value={inputAddress}
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <Button onClick={handleAddAddress}>Add Addresses</Button>
      <Button onClick={handleSubmit}>Create Lanyard Tree</Button>
    </Stack>
  );
}
