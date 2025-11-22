import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { useForm } from "@tanstack/react-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import useLogin from "../hooks/mutations/useLogin";
import { useTokenInfoStore } from "@/store/user";
import { useState } from "react";
import { emit } from "@/utils/event";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function LoginButton() {
  const setTokenInfo = useTokenInfoStore((state) => state.setTokenInfo);

  const [isOpen, setIsOpen] = useState(false);
  const login = useLogin();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      login
        .mutateAsync(value)
        .then((tokenInfo) => {
          setTokenInfo(tokenInfo);
          emit("user::login");
          console.log(tokenInfo);
          setIsOpen(false);
        })
        .catch((error) => {
          console.error(error);
          alert(`${JSON.stringify(error)}`);
        });
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
        setIsOpen(value);
        form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button>登录</Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>登录</DialogTitle>
        </DialogHeader>
        <div>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="username"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>用户名</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="username"
                        autoComplete="off"
                      />
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>密码</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="password"
                        autoComplete="off"
                        type="password"
                      />
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </div>
        <DialogFooter>
          <Button type="submit" form="login-form" disabled={login.isPending}>
            {login.isPending && <Spinner />}
            登录
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
