import { useUserContext } from "@/context";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  Toast,
  Typography,
  Stack,
  Button,
  Form,
  FormItem,
  FormControl,
  FormField,
  FormMessage,
  Input,
  Separator,
  Flex,
  StatusFilled,
  StatusEmpty,
  cn,
  Loading,
} from "@/design-system";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton, EditMembersInput } from "@/client";
import { type Channel, type ChannelRoles } from "@/gql";
import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import debounce from "debounce";
import { toast } from "sonner";
import {
  type UsernameSchemaValues,
  getUsername,
  usernameSchema,
  checkUsernameAvailability,
  getDataForUsername,
  processEditMembersPost,
} from "@/lib";
import { Hex } from "viem";

interface ChannelSettingsProps {
  channel: Channel;
}

export function ChannelSettings({ channel }: ChannelSettingsProps) {
  const { signMessage, userId, embeddedWallet } = useUserContext();
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false);

  // function isAdminOrAdder({
  //   userRid,
  //   channelRoleData,
  // }: {
  //   userRid: bigint;
  //   channelRoleData: ChannelRoles[];
  // }) {
  //   // to see if they have admin access for channel
  //   for (let i = 0; i < channelRoleData.length; ++i) {
  //     let rid = channelRoleData[i].rid;
  //     if (rid === userRid && channelRoleData[i].role > 1) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // const enableUpdateMembers =
  //   !embeddedWallet?.address || !targetUserId || !channel?.roles?.items
  //     ? false
  //     : isAdminOrAdder({
  //         userRid: targetUserId,
  //         channelRoleData: channel.roles.items,
  //       });

  // const members: bigint[] = (channel?.roles?.items ?? [])
  //   .filter((member) => member.role > 0)
  //   .map((member) => member.rid);

  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  type Roles = {
    rid: bigint;
    username: string;
    startingRole: bigint;
    newRole: bigint | null;
  };
  const [roles, setRoles] = useState<Roles[]>([]);
  console.log("roles state: ", roles);

  function getStateDiff(roles: Roles[]): Roles[] {
    return roles.filter(
      (role) => role.newRole !== null && role.newRole !== role.startingRole
    );
  }

  const rolesStateDif: Roles[] = getStateDiff(roles);
  console.log("roles state dif: ", rolesStateDif);

  const stateDifMembers: bigint[] = rolesStateDif.map((role) => BigInt(role.rid));
  const stateDifRoleValues: bigint[] = rolesStateDif.map(
    (role) => role.newRole || BigInt(0)
  ); // default to BigInt(0) if newRole is null
  console.log("stae dif members:", stateDifMembers);
  console.log("stae dif values:", stateDifRoleValues);

  /* 
  *
    username input validation
  *
  */

  const [isValidUser, setIsValidUser] = useState(0); // 0 null state, 1 = valid, 2 = invalid, 3 = already added
  const [validationComplete, setValidationComplete] = useState(false);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Subscribe to changes to the username input
  const watchUsername = debounce(() => form.watch("username"), 500);

  // username checkibng
  const triggerValidation = useMemo(
    () =>
      debounce(() => {
        form.trigger("username");
        setValidationComplete(true);
      }, 500),
    [form]
  );

  useEffect(() => {
    if (form.formState.isValid && validationComplete) {
      const inputUsername = form.getValues().username;
      const usernameAddedCheck = roles.some(
        (role) => role.username === inputUsername
      );
      if (usernameAddedCheck) {
        setIsValidUser(3); // 3 == already added
        setIsCheckingUsername(false);
      } else {
        checkUsernameAvailability(form.getValues().username).then((result) => {
          console.log("username check result: ", result);
          setIsValidUser(result.exists ? 1 : 2); // 1 == valid, 2 == invalid
          setIsCheckingUsername(false);
        });
      }
      return () => {
        setValidationComplete(false);
      };
    }
  }, [validationComplete, watchUsername]);

  async function addUsernameHandler() {
    // dont let more than 5 get added at once. add an error state for this too
    // NOTE: add a warning message for specifically this
    if (roles.length > 4) return;
    const username = form.getValues().username;
    if (username) {
      const dataForUsername = await getDataForUsername({
        username: form.getValues().username,
      });
      console.log("data for username: ", dataForUsername);
      if (dataForUsername) {
        console.log("setting new role in state");
        const newRole = {
          rid: dataForUsername.id,
          username: username,
          startingRole: BigInt(0),
          newRole: BigInt(1),
        };
        setRoles((prevRoles) => [newRole, ...prevRoles]);
        setIsValidUser(0);
        form.reset();
      }
    }
  }

  function clearUsernameHandler() {
    setIsValidUser(0);
    form.reset();
  }

  function setRoleToZero(rid: bigint) {
    console.log("running set role to zero");
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.rid === rid ? { ...role, newRole: BigInt(0) } : role
      )
    );
  }

  function setRoleToOne(rid: bigint) {
    console.log("running set role to one");
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.rid == rid ? { ...role, newRole: BigInt(1) } : role
      )
    );
  }

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const startingRoles = await Promise.all(
          (channel?.roles?.items ?? [])
            .filter((member) => member.role > 0)
            .map(async (member) => ({
              rid: BigInt(member.rid),
              username: await getUsername({ id: member.rid }),
              startingRole: BigInt(member.role),
              newRole: null,
            }))            
        );        
        // Sort the startingRoles array based on startingRole in descending order
        startingRoles.sort((a, b) => Number(a.startingRole) - Number(b.startingRole));
        setRoles(startingRoles);
      } catch (error) {
        console.error("Error setting roles:", error);
      }
    };

    if (channel) {
      fetchRoles();
    }
  }, [channel]);

  //   console.log("starting roles", roles)

  // NOTE has flaw in logic that makes it so that
  // if you toggle off + on an admin, they will be reset as a member (2 -> 1)
  function MemberRow({ rid, role }: { rid: bigint; role: bigint }) {
    return (
      <Flex className=" w-full justify-between">
        <Typography className="text-secondary-foreground">
          {roles.find((role) => role.rid === rid)?.username}
        </Typography>
        {role === BigInt(2) && (
          <Typography className="text-secondary-foreground">admin</Typography>
        )}
        {role === BigInt(1) && (
          <button onClick={() => setRoleToZero(rid)}>
            <StatusFilled />
          </button>
        )}
        {role !== BigInt(2) && role !== BigInt(1) && (
          <button onClick={() => setRoleToOne(rid)}>
            <StatusEmpty />
          </button>
        )}
      </Flex>
    );
  }

  return (
    <Dialog>
      {/* Dropdown logic */}
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none mb-1">
          <Typography className="hover:font-bold" variant="h2">
            {"..."}
          </Typography>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom">
          <DropdownMenuGroup className="flex flex-col gap-2">
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button variant="link">
                  <Typography>Edit members</Typography>
                </Button>
              </DialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Dialog logic */}
      <DialogContent className="sm:max-w-[425px] focus:outline-none">
        <Stack className="items-center gap-4">
          <DialogHeader className="flex w-full px-5 justify-between items-center">
            <div className="flex-1">{/* Placholder */}</div>
            <DialogTitle className="flex-1 text-center">
              <Typography>Edit members</Typography>
            </DialogTitle>
            <DialogClose asChild className="flex-1 justify-end">
              <Button variant="link">
                <Typography>close</Typography>
              </Button>
            </DialogClose>
          </DialogHeader>
          <Form {...form}>
            <form className="w-full" action={async () => {}}>
              <Stack className="gap-8">
                <Separator />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mx-5 justify-center text-center">
                      <FormControl>
                        <EditMembersInput
                          onButtonClickStateTrue={addUsernameHandler}
                          onButtonClickStateFalse={clearUsernameHandler}
                          state={isValidUser}
                          className=""
                          placeholder="Enter username..."
                          {...field}
                          onChange={(e) => {
                            const lowercasedValue =
                              e.target.value.toLowerCase();
                            field.onChange({
                              ...e,
                              target: { ...e.target, value: lowercasedValue },
                            });
                            setIsCheckingUsername(true);
                            triggerValidation();
                          }}
                        />
                      </FormControl>
                      <div className="h-3">
                        {isValidUser == 2 ? (
                          <FormMessage className="pt-2 text-red-500">
                            User doesnt exist, please try again
                          </FormMessage>
                        ) : isValidUser == 3 ? (
                          <FormMessage className="pt-2 text-red-500">
                            User already added
                          </FormMessage>
                        ) : (
                          <></>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                {/* display existing members */}
                <Stack className="mx-8 gap-y-[20px]">
                  {roles.map((role, index) => (
                    <MemberRow
                      key={index}
                      rid={role.rid}
                      role={
                        role.newRole != null ? role.newRole : role.startingRole
                      }
                    />
                  ))}
                </Stack>
                <Separator className="-mt-3" />
              </Stack>
              <DialogFooter className="text-center pt-[18px]">
                <Button
                  variant="link"
                  type="submit"
                  disabled={
                    rolesStateDif.length == 0 ||
                    isEditing
                  }
                  onClick={async (e) => {
                    // prevent form from submitting
                    e.preventDefault()
                    // check to make sure userId and wallet are present
                    if (!embeddedWallet?.address || !userId) return false;
                    // set isRemoving state to true
                    setIsEditing(true);
                    // initialize bool for txn success check
                    let txSuccess: boolean = false;
                    // Generate removeReference post
                    if (signMessage) {
                      txSuccess = await processEditMembersPost({
                        rid: userId,
                        signer: embeddedWallet.address as Hex,
                        privySignMessage: signMessage,
                        channelCid: channel.id,
                        members: stateDifMembers,
                        roles: stateDifRoleValues,
                      });
                      setDialogOpen(false)
                      if (txSuccess) {                        
                        toast.custom((t) => (
                          <Toast>{"Members successfuly edited"}</Toast>
                        ));
                        setIsEditing(false);
                      } else {
                        toast.custom((t) => (
                          <Toast>{"Error editing members"}</Toast>
                        ));
                        setIsEditing(false);
                      }
                    }
                  }}
                >
                  {isEditing ? <Loading /> : "Save"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
