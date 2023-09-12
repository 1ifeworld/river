import React, { useState } from "react";
import { useWeb3Storage } from "../../../hooks/useWeb3Storage";
import { Input, Button, Stack } from "@river/design-system";
import { Channel } from "../../../gql/sdk.generated";

export function ChannelUri({
  channels,
  cid,
  setCid,
  name,
  setName,
  description,
  setDescription,
}: {
  channels?: Channel;
  cid: string;
  name: string;
  description: string;
  setCid: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [image, setImage] = useState<File | null>(null);
  const { client } = useWeb3Storage(cid);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      const imageCid = await client.put([image], { wrapWithDirectory: false });
      console.log(`Uploaded image CID: ${imageCid}`);
      setCid(imageCid);
    }
  };
  const handleContractInsertion = async () => {
    const contractUriData = {
      name,
      description,
      image: `ipfs://${cid}`,
    };
    console.log("Data for Channel:", contractUriData);
    setName(contractUriData.name);
    setDescription(contractUriData.description);

    const blob = new Blob([JSON.stringify(contractUriData)], {
      type: "application/json",
    });
    const file = new File([blob], "schema.json", { type: "application/json" });
    const schemaCid = await client.put([file], { wrapWithDirectory: false });
    console.log(`Schema CID: ${schemaCid}`);
  };

  return (
    <Stack>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>  {setName(e.target.value)
        console.log("Updated Name:", e.target.value);
        }}
        
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) =>  {setDescription(e.target.value)
        console.log("Updated Description:", e.target.value);
        } }
      />
      <Input type="file" onChange={handleImageChange} />
      <Button onClick={handleUpload}>Upload Image</Button>
      <Button onClick={handleContractInsertion}>Insert into Contract</Button>
    </Stack>
  );
}
