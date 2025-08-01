
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCallback, useEffect, useRef, useState } from "react";
import type { SignUpReq } from "@/interface/SignUp.interface";
import { getListRoleAuth, signUpAuth } from "@/api/AuthRegisterApi";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react"


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

type OptionRole = {
    value: string;
    label: string;
};


interface Errors {
    fullName: string;
    email: string;
    username: string;
    password: string;
    role: string;
}


export default function RegisterForm() {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [errorsAll, setErrorsAll] = useState<string>("");
    const [optionsRole, setOptionsRole] = useState<OptionRole[]>([]);

    const hasFetched = useRef(false);
    
    const [errors, setErrors] = useState<Errors>({
        fullName: '',
        email: '',
        username: '',
        password: '',
        role: '',
    });


    const getListAllRole = useCallback(async (): Promise<void> => {
        
        try {
            const response = await getListRoleAuth();
            const mapped = response.map((cat) => ({
                value: cat.rolePetugasId.toString(),
                label: cat.rolePetugasName,
            }));
            setOptionsRole(mapped);
            console.log("Success processing data");
        } catch (error) {
            console.log("Failed processing data", error);
            throw error;
        }
    }, []);
    
    useEffect(() => {
        console.log(hasFetched);
        if (!hasFetched.current) {
            getListAllRole();
            hasFetched.current = true; // Cegah request kedua
        }
    }, [getListAllRole]);


    function validateForm(): boolean{
        console.log("proccess validation");
        let valid = true;
        const errorsCopy = {... errors}
        if(fullName.trim()){
            errorsCopy.fullName = '';
        }else{
            errorsCopy.fullName = 'FullName is required';
            valid = false;
        }
    
        if(username.trim()){
            errorsCopy.username = '';
        }else{
            errorsCopy.username = 'Username is required';
            valid = false;
        }
        if(password.trim()){
            errorsCopy.password = '';
        }else{
            errorsCopy.password = 'Password is required';
            valid = false;
        }
        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if(role.trim()){
            errorsCopy.role = '';
        }else{
            errorsCopy.role = 'role is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (validateForm()) {
            console.log("Testtt signup ");
            try {
                const newSignUp: SignUpReq = {
                    fullName,
                    email,
                    username,
                    password,
                    role
                };

                console.log("register :"+newSignUp);
            
                const result = await signUpAuth(newSignUp);
                if(result){
                    console.log("success add data", result);
                    setFullName("");
                    setEmail("");
                    setUsername("");
                    setPassword("");
                    setRole("");
                    setErrorsAll("");
                }else{
                    setErrorsAll("Login gagal. Cek email/password.");
                }
            } catch (err) {
                console.error("Gagal login", err);
                setErrorsAll("Login gagal. Cek email/password.");
            }
        }

        console.log("Saving changes...");
    };



  return (
    <form onSubmit={handleSave}>
        <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Register to your account</h1>
            <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
            </p>
        </div>

        <div className="grid w-full max-w-xl items-start gap-4">
            <Alert>
                <CheckCircle2Icon />
                <AlertTitle>Success! Your changes have been saved</AlertTitle>
                <AlertDescription>
                This is an alert with icon, title and description.
                </AlertDescription>
            </Alert>
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
        
        
                    
        <div className="grid gap-6 mt-5">
            <div className="grid gap-3">
                <Label htmlFor="fullname">Full Name</Label>
                <Input id="fullname" type="text" placeholder="Enter your Full Name" onChange={(e) => setFullName(e.target.value)} required />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Enter your Email" onChange={(e) => setEmail(e.target.value)} required />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input id="username" type="text" placeholder="Enter your Username" onChange={(e) => setUsername(e.target.value)} required />
                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="email">Password</Label>
                <Input id="password" type="password" placeholder="Enter your Password" onChange={(e) => setPassword(e.target.value)}  required />
                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>
            <div className="grid gap-3">
                <Label htmlFor="email">Role</Label>
                <Select onValueChange={(value) => setRole(value)}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                        {optionsRole.map((role) => (
                            <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        
            <Button type="submit" className="w-full">
            Register
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
            <a href="/login" className="underline underline-offset-4">
            Sign In
            </a>
        </div>
    </form>
  )
}
