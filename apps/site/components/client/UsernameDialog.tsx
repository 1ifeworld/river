import { SubmitButton } from "@/client";
import { useUserContext } from "@/context";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Separator,
  Stack,
  Toast,
  Typography,
} from "@/design-system";
import {
  type UsernameSchemaValues,
  checkUsernameAvailability,
  processRegisterFor,
  usernameSchema,
  setUsername,
} from "@/lib";
import { addresses } from "scrypt";
import { zodResolver } from "@hookform/resolvers/zod";
import debounce from "debounce";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Hex, createWalletClient, custom, EIP1193Provider } from "viem";
import { optimism } from "viem/chains";
import { getExpiration} from "scrypt";

interface UsernameDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function UsernameDialog({ open, setOpen }: UsernameDialogProps) {
  const form = useForm<UsernameSchemaValues>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const { userId, username, signMessage, embeddedWallet, fetchUserData } =
    useUserContext();

  const [usernameExists, setUsernameExists] = useState(false);
  const [validationComplete, setValidationComplete] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationFailed, setRegistrationFailed] = useState(false);

  // Subscribe to changes to the username input
  const watchUsername = debounce(() => form.watch("username"), 500);

  const triggerValidation = React.useMemo(
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
        setUsernameExists(result.exists);
        setIsCheckingAvailability(false);
      });
      return () => {
        setValidationComplete(false);
      };
    }
  }, [validationComplete, watchUsername]);

  async function processUserRegistration() {
    if (!fetchUserData) {
      console.log("fetch user data missing")
      return
    }
    // set is processing to false. disables ability to submit form
    setIsProcessing(true);
    // initialize eip1193 provider for eip712 signature
    const eip1193Provider = await embeddedWallet?.getEthereumProvider();
    const customEip1193Client = createWalletClient({
      chain: optimism,
      transport: custom(eip1193Provider as EIP1193Provider),
    });
    // generate signature for register txn + username set
    const deadline = getExpiration();
    const ID_REGISTRY_EIP_712_DOMAIN = {
      name: 'River IdRegistry',
      version: '1',
      chainId: 10,
      verifyingContract:
        addresses.idRegistry.optimism, 
    } as const
    const REGISTER_TYPE = [
      { name: 'to', type: 'address' },
      { name: 'recovery', type: 'address' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ] as const    
    const sig = await customEip1193Client.signTypedData({
      account: embeddedWallet?.address as Hex,
      domain: ID_REGISTRY_EIP_712_DOMAIN,
      types: { Register: REGISTER_TYPE },
      primaryType: "Register",
      message: {
        to: embeddedWallet?.address as Hex,
        recovery: addresses.riverRecovery.optimism,
        // assumes all wallets calling this have 0 previous transactions
        // CURRENTLY this is fine because username db sig will not be rejected
        // if the nonce is off (since its still a valid recoverable message)
        nonce: BigInt(0),
        deadline: deadline,
      },
    });
    // if no userId/usernmae, then go thru the reg + username flow
    // if no username, only go through username flow
    // we can lean on userContext since thats whats dictating header
    let inFlightUserId = userId ? userId.toString() : "";
    // check if inflightUserId was overwritten from valid userId in user context
    if (!inFlightUserId) {
      const registeredId = await processRegisterFor({
        signer: embeddedWallet?.address as Hex,
        recovery: addresses.riverRecovery.optimism,
        deadline: deadline,
        sig: sig,
      });
      if (registeredId) inFlightUserId = registeredId;
    }
    // If userId is still null here, skip username set process
    if (inFlightUserId) {
      const resp = await setUsername({
        userIdRegistered: inFlightUserId,
        signature: sig,
        timestamp: deadline.toString(),
        username: form.getValues().username,
        registerForRecipient: embeddedWallet?.address as Hex,        
      });
    }
    // reset context embeddedWallet + userId + username
    await fetchUserData();    
    // set is processing to false. re enables ability to submit form
    setIsProcessing(false);
  }

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[425px]">
        <Stack className="items-center gap-5">
          <DialogTitle>
            <Typography>Choose a username</Typography>
          </DialogTitle>
          <Form {...form}>
            <form
              action={async () => {
                // reset registrationFailed to false incase you had already submitted it
                setRegistrationFailed(false);
                // validating starting state
                if (!embeddedWallet || !signMessage || !fetchUserData) return;
                // process registration
                await processUserRegistration();
                // recheck userId + username. only close dialog if both are true
                if (userId && username) {
                  // Set registration status to true
                  // Close dialog
                  setOpen(false);
                  // Emit successful registration toast
                  toast.custom((t) => (
                    <Toast>
                      Welcome to River{" "}
                      <span className="font-bold">{username}</span>
                    </Toast>
                  ));
                } else {
                  // if you submitted the form and post registration attempt
                  // userId + username are still invalid, display a
                  // registration failed attempt
                  setRegistrationFailed(true);
                }
              }}
              className="w-full"
            >
              <Stack className="gap-8">
                <Separator />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mx-5 text-center">
                      <FormControl>
                        <Input
                          placeholder="Enter username..."
                          {...field}
                          onChange={(e) => {
                            const lowercasedValue = e.target.value.toLowerCase();
                            field.onChange({ ...e, target: { ...e.target, value: lowercasedValue } });
                            setIsCheckingAvailability(true);
                            triggerValidation();
                            setRegistrationFailed(false);
                          }}
                        />
                      </FormControl>
                      <div className="h-3">
                        {usernameExists ? (
                          <FormMessage className="pt-2 text-red-500">
                            Username not available, please try another
                          </FormMessage>
                        ) : registrationFailed ? (
                          <></>
                        ) : (
                          <FormMessage className="pt-2 text-red-500" />
                        )}
                        {registrationFailed && (
                          <FormMessage className="pt-2 text-red-500">
                            Registration failed, please try again
                          </FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
                <Separator className="-mt-3" />
              </Stack>
              <DialogFooter className="text-center pt-[18px]">
                <SubmitButton
                  type="submit"
                  variant="link"
                  disabled={
                    !form.formState.isValid ||
                    usernameExists ||
                    isCheckingAvailability ||
                    isProcessing
                  }
                >
                  Complete
                </SubmitButton>
              </DialogFooter>
            </form>
          </Form>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
