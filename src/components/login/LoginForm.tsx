"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { login } from "@/actions/login";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<{ username?: string[]; password?: string[] }>({});
  const [isCredentialError, setIsCredentialError] = useState(false);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const loginCredentials = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };
    const res = await login(loginCredentials);
    if (res.isValid) {
      return router.push("/");
    }
    if (res.errors) {
      setError(res.errors);
    } else {
      setIsCredentialError(true);
    }
    setPending(false);
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col w-80 gap-2">
      <div>
        <TextField name="username" placeholder="아이디" size="small" fullWidth />
        {error.username && <FormHelperText error>{error.username[0]}</FormHelperText>}
      </div>
      <div>
        <TextField
          name="password"
          placeholder="비밀번호"
          size="small"
          type={showPassword ? "text" : "password"}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton size="small" onClick={handlePasswordVisibility}>
                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
              </IconButton>
            ),
          }}
        />
        {error.password && <FormHelperText error>{error.password[0]}</FormHelperText>}
      </div>
      {isCredentialError && <FormHelperText error>* 잘못된 아이디 또는 비밀번호입니다.</FormHelperText>}
      <Button type="submit" variant="contained" className="mt-6" disabled={pending} disableElevation>
        로그인
      </Button>
    </form>
  );
}
