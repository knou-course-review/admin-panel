"use client";

import { type ChangeEvent, type FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cancel from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, FormHelperText, IconButton, TextField } from "@mui/material";
import useForm from "@/hooks/useForm";
import { login } from "@/actions/login";

export default function LoginForm() {
  const { formData, updateFormData } = useForm(["username", "password"]);
  const [showPassword, setShowPassword] = useState(false);
  const [isCredentialError, setIsCredentialError] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    const name = e.target.name;
    updateFormData(name, input);
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const clearInput = (key: string) => updateFormData(key, "");

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    const loginCredentials = {
      username: formData.username.value as string,
      password: formData.password.value as string,
    };
    const res = await login(loginCredentials);
    if (res?.isValid) {
      // save session
      return router.push("/");
    } else if (res?.errors) {
      updateFormData("username", formData.username.value, true, res?.errors.username && res?.errors.username[0]);
      updateFormData("password", formData.password.value, true, res?.errors.password && res?.errors.password[0]);
      setPending(false);
      return;
    }
    setIsCredentialError(true);
    setPending(false);
  };

  return (
    <div className="flex w-100">
      <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
        <div>
          <TextField
            name="username"
            label="아이디"
            value={formData.username.value}
            onChange={handleInput}
            fullWidth
            InputProps={{
              endAdornment:
                formData.username.value !== "" ? (
                  <IconButton onClick={() => clearInput("username")}>
                    <Cancel />
                  </IconButton>
                ) : null,
            }}
          />
          {formData.username.error && <FormHelperText error>{formData.username.errorMsg}</FormHelperText>}
        </div>
        <div>
          <TextField
            name="password"
            label="비밀번호"
            value={formData.password.value}
            type={showPassword ? "text" : "password"}
            onChange={handleInput}
            fullWidth
            InputProps={{
              endAdornment: (
                <>
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                  {formData.password.value !== "" ? (
                    <IconButton onClick={() => clearInput("password")}>
                      <Cancel />
                    </IconButton>
                  ) : null}
                </>
              ),
            }}
          />
          {formData.password.error && <FormHelperText error>{formData.password.errorMsg}</FormHelperText>}
        </div>
        <div className="text-right">
          <Link href="">아이디 찾기</Link> | <Link href="">비밀번호 찾기</Link>
        </div>
        {isCredentialError && <FormHelperText error>* 잘못된 아이디 또는 비밀번호입니다.</FormHelperText>}
        <Button type="submit" variant="contained" size="large" className="mt-6" disabled={pending} disableElevation>
          {pending ? "로그인 중..." : "로그인"}
        </Button>
      </form>
    </div>
  );
}
