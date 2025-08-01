import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { signInAuth } from "@/api/AuthLoginApi";
import { AlertCircleIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface Errors {
    username: string;
    password: string;
}

interface UserInfo {
  userName: string;
  roles: string[];
}

export function LoginForm() {

    const { login } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errors, setErrors] = useState<Errors>({
        username: '',
        password: ''
    });
    const [errorsAll, setErrorsAll] = useState<string>("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (validateForm()) {
            try {
                const result = await signInAuth({ username, password});
                if(result.data){

                    const userData: UserInfo = {
                        userName: result.data.petugasUsername,
                        roles: result.data.petugasRoles,
                    };


                    localStorage.setItem("accessToken", result.data.token);
                    localStorage.setItem("refreshToken", result.data.refreshToken);
                    localStorage.setItem("petugas_data", JSON.stringify(userData));
                    login(result.data);
                    navigate("/");
                }else{
                    setErrorsAll("Login gagal. Cek email/password.");
                }
            } catch (err) {
                console.error("Gagal login", err);
                setErrorsAll("Login gagal. Cek email/password.");
            }
        }
    }

    function validateForm(): boolean{
        console.log("proccess validation");
        let valid = true;
        const errorsCopy = {... errors}
        if(username.trim()){
            errorsCopy.username = '';
        }else{
            errorsCopy.username = 'username is required';
            valid = false;
        }

        if(password.trim()){
            errorsCopy.password = '';
        }else{
            errorsCopy.password = 'password is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    }


  return (
    <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
            </p>
        </div>
        {errorsAll && 
            <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Unable to process your payment.</AlertTitle>
                <AlertDescription>
                <p>Please verify your billing information and try again.</p>
                {errorsAll}
                </AlertDescription>
            </Alert>
        }
        <div className="grid gap-6">
            <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input id="username" type="text" onChange={(e) => setUsername(e.target.value)} required />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="email">Password</Label>
                <Input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            
            <Button type="submit" className="w-full">
            Login
            </Button>
            <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                </span>
            </div>
            <Button variant="outline" className="w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                    fill="currentColor"
                    />
                </svg>
                Login with GitHub
            </Button>
        </div>
        <div className="text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/register" className="underline underline-offset-4">
            Sign up
            </a>
        </div>
    </form>
  )
}
