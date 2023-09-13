import {
  Flex,
} from "@river/design-system";
import { useWeb3Storage } from "../../../hooks/useWeb3Storage";
import { useState, useEffect } from "react";
import { ChannelUri } from "../ChannelUri/ChannelUri";
import { CardWithUpload } from ".";
import { CreateChannelButton } from ".";
import { useSetupPress } from "../../../hooks";
import {
  Hex,
  Hash,
  encodeAbiParameters,
  parseAbiParameters,
  zeroAddress,
} from "viem";
import { factory, logic, renderer } from "../../../constants";
import { useAccount } from "wagmi";
import { usePathname, useRouter } from "next/navigation";
import { LanyardMerkle } from "./LanyardMerkle";

export function NewChannelContainer() {
  const { address } = useAccount();
  const initialAdmin = address ? address : zeroAddress;

  // const pathname = usePathname();
  // const router = useRouter();

  const [imageCid, setImageCid] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [uriCid, setUriCid] = useState<string>("");
  const [merkleRoot, setMerkleRoot] = useState<string>("");



  const { client } = useWeb3Storage(uriCid);
  const handleUriUpload = async () => {
    const contractUriData = {
      name,
      description,
      image: `ipfs://${imageCid}`,
    };
    const blob = new Blob([JSON.stringify(contractUriData)], {
      type: "application/json",
    });
    const file = new File([blob], "schema.json", { type: "application/json" });
    const schemaCid = await client.put([file], { wrapWithDirectory: false });
    setUriCid(`ipfs://${schemaCid}`)
    console.log(`Schema CID: ${schemaCid}`);
  };

  /* setupPress Hook */
  // setup logic innits
  const initialAdminArray: Hex[] = [initialAdmin];
  const initialMerkleRoot: Hash =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  const logicInit: Hash = encodeAbiParameters(
    parseAbiParameters("address[], bytes32"),
    [initialAdminArray, initialMerkleRoot]
  );
  // setup rendererInits
  const rendererInit: Hash =
    "0x0000000000000000000000000000000000000000000000000000000000000000";
  // encode sub inputs
  const encodedUri: Hash = encodeAbiParameters(parseAbiParameters("string"), [
    uriCid,
  ]);
  const setupInputs: Hash = encodeAbiParameters(
    parseAbiParameters(
      "(string, bytes, address, address, bytes, address, bytes)"
    ),
    [[name, encodedUri, initialAdmin, logic, logicInit, renderer, rendererInit]]
  );

  const { setupPressConfig, setupPress, setupPressLoading, setupPressSuccess } =
    useSetupPress({
      factory: factory,
      data: setupInputs,
      prepareTxn: uriCid ? true : false
      // successCallback: router.refresh,x
    });

    console.log("uri cid ", uriCid)
    console.log("setup pres config, ", setupPressConfig)



  return (
    <Flex className="gap-x-10 h-[248px]">
      {/* First Column: Channel image upload */}
      <CardWithUpload imageCid={imageCid} setImageCid={setImageCid} />
      {/* Second Column: Channel name + description + create trigger */}
      <Flex className="h-full flex-col justify-between cursor-default">
        <ChannelUri
          setName={setName}
          name={name}
          setDescription={setDescription}
          description={description}
        />
          <LanyardMerkle onMerkleRootChange={setMerkleRoot} />
        <CreateChannelButton
          createReady={!!imageCid && !!name && !!setupPressConfig}
          handleUriUpload={handleUriUpload}
          createTrigger={setupPress}
        />
      </Flex>
    </Flex>
  );
}
