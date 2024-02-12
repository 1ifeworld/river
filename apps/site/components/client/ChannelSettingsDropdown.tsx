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
  InputWithButton,
  Separator,
  Flex,
  StatusFilled,
  StatusEmpty
} from "@/design-system";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton, ClientUsername } from "@/client";
import { type Channel, type ChannelRoles } from "@/gql";
import { usePrivy } from "@privy-io/react-auth";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import debounce from "debounce";
import { type UsernameSchemaValues, usernameSchema, checkUsernameAvailability, getDataForUsername } from "@/lib";

interface ChannelSettingsDropdownProps {
  channel: Channel;
}

export function ChannelSettingsDropdown({
  channel,
}: ChannelSettingsDropdownProps) {
  const { login } = usePrivy();
  const {
    signMessage,
    userId: targetUserId,
    embeddedWallet,
  } = useUserContext();
  const [isRemoving, setIsRemoving] = useState(false);

  function isAdminOrAdder({
    userRid,
    channelRoleData,
  }: {
    userRid: bigint;
    channelRoleData: ChannelRoles[];
  }) {
    // to see if they have admin access for channel
    for (let i = 0; i < channelRoleData.length; ++i) {
      let rid = channelRoleData[i].rid;
      if (rid === userRid && channelRoleData[i].role > 1) {
        return true;
      }
    }
    return false;
  }

  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const enableUpdateMembers =
    !embeddedWallet?.address || !targetUserId || !channel?.roles?.items
      ? false
      : isAdminOrAdder({
          userRid: targetUserId,
          channelRoleData: channel.roles.items,
        });

  const members: bigint[] = (channel?.roles?.items ?? [])
    .filter((member) => member.role > 0)
    .map((member) => member.rid);
          

  type Roles = {
    rid: bigint;
    role: bigint;
  };
  const [roles, setRoles] = useState<Roles[]>([]);


  /* 
  *
    username input validation
  *
  */

  const [isValidUser, setIsValidUser] = useState(0); // 0 no check, 1 = valid, 2 = invalid
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
      checkUsernameAvailability(form.getValues().username).then((result) => {
        console.log("username check result: ", result)
        setIsValidUser(result.exists ? 1 : 2);
        setIsCheckingUsername(false);
      });
      return () => {
        setValidationComplete(false);
      };
    }
  }, [validationComplete, watchUsername]);

  async function addUsernameHandler() {
    const username = form.getValues().username
    if (username) {
        const dataForUsername = await getDataForUsername({username: form.getValues().username})
        console.log("data for username: ", dataForUsername)
        if (dataForUsername) {
            console.log("setting new role in state")
            const newRole = {rid: dataForUsername.id, role: BigInt(1)}
            setRoles((prevRoles) => [...prevRoles, newRole]) 
            setIsValidUser(0)
            form.reset()
        }
    }
  }

  function clearUsernameHandler() {
    setIsValidUser(0)
    form.reset()    
  }

  function setRoleToZero(rid: bigint) {
    console.log("running set role to zero")
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.rid === rid ? { ...role, role: BigInt(0) } : role
      )
    );
  }

  function setRoleToOne(rid: bigint) {
    console.log("running set role to one")
    setRoles((prevRoles) =>
      prevRoles.map((role) =>
        role.rid === rid ? { ...role, role: BigInt(1) } : role
      )
    );
  }  

  useEffect(() => {
    const fetchEdits = () => {
      try {
        const startingRoles = (channel?.roles?.items ?? [])
          .filter((member) => member.role > 0)
          .map((member) => ({
            rid: member.rid,
            role: member.role,
          }));

        setRoles(startingRoles);
      } catch (error) {
        console.error('Error setting roles:', error);
      }
    };

    if (channel) {
      fetchEdits();
    }
  }, [channel]);

//   console.log("starting roles", roles)

  // NOTE has flaw in logic that makes it so that
  // if you toggle off + on an admin, they will be reset as a member (2 -> 1)
  function MemberRow({rid, role}: {rid: bigint, role: bigint}) {
    return (
        <Flex className=" w-full justify-between">
            <ClientUsername id={rid} />    
            {role > 0 ? <button onClick={()=>setRoleToZero(rid)}><StatusFilled/></button> : <button onClick={()=>setRoleToOne(rid)}><StatusEmpty/></button>}
        </Flex>
    )
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
        {/* <DropdownMenuPortal> */}
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
        {/* </DropdownMenuPortal> */}
      </DropdownMenu>
      {/* Dialog logic */}
      {/* <DialogPortal> */}
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
            <form action={async () => {}} className="w-full">
              <Stack className="gap-8">
                <Separator />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mx-5 justify-center text-center">
                      <FormControl>
                        <InputWithButton
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
                        ): (
                            <></>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                {/* display existing members */}
                <Stack className="mx-8 gap-y-[20px]">
                  {roles.map((role, index) => (
                    // <ClientUsername id={role.rid} />
                    <MemberRow key={index} rid={role.rid} role={role.role}  />
                    // <ClientUsername id={role.rid} />
                  ))}
                </Stack>
                <Separator className="-mt-3" />
              </Stack>
              <DialogFooter className="text-center pt-[18px]">
                <SubmitButton
                  type="submit"
                  variant="link"
                  //   disabled={
                  //     !form.formState.isValid ||
                  //     usernameExists ||
                  //     isCheckingUsername ||
                  //     isProcessing
                  //   }
                >
                  Save changes
                </SubmitButton>
              </DialogFooter>
            </form>
          </Form>

          {/* <Form {...form}>
              <form
                id="newChannel"
                className="flex flex-col justify-center w-full gap-6"
                onSubmit={form.handleSubmit(createNewChannel)}
              >
                <Separator />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mx-5">
                      <FormLabel htmlFor="name">
                        <Typography variant="small">Name</Typography>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter channel name..."
                          id="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pt-2 text-red-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="mx-5">
                      <FormLabel htmlFor="description">
                        <Typography variant="small">Description</Typography>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Write a description..."
                          id="description"
                          className="resize-none"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pt-2 text-red-500" />
                    </FormItem>
                  )}
                />
                <Separator />
                <DialogFooter className="flex flex-col py-2">
                  <Button
                    form="newChannel"
                    type="submit"
                    variant="link"
                    disabled={!targetUserId || isSubmitting}
                  >
                    {isSubmitting ? <Loading /> : 'Create'}
                  </Button>
                </DialogFooter>
              </form>
            </Form> */}
        </Stack>
      </DialogContent>
      {/* </DialogPortal>         */}
    </Dialog>
  );
}
