/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSignupMutation } from "@/redux/api/user/userApi";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
// import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z
        .string()
        .email("Please enter a valid email address")
    //     .refine(
    //         (email) => {
    //             const domain = email.split("@")[1];
    //             return domain === "gmail.com" || domain === "yahoo.com";
    //         },
    //         { message: "Only Gmail and Yahoo email addresses are allowed" }
    // ),
    ,
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password must not exceed 50 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export default function SignupForm() {
    const [signup, { isLoading }] = useSignupMutation(); // RTK Query Hook
    // const router = useRouter()
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(values: any) {
        try {
            const response = await signup({
                name: values.name,
                email: values.email,
                password: values.password,
            }).unwrap();
            if (response?.data) {
                toast.success(response.message);
                localStorage.setItem("email", response?.data.email)
                toast.success("Register is completed, go to login page")
                // router.push("/otp")
            }

        } catch (err: any) {
            toast.error(err?.data?.message || "Signup failed");
        }
    }

    return (
        <div className="container section-gap">
            <div className="mx-auto max-w-md p-6 bg-white rounded-md">
                <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
                <p className="mt-2 text-sm text-gray-600 text-center">
                    Create an account to get started!
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Full Name</label>
                        <input
                            {...register("name")}
                            type="text"
                            className="w-full p-2 border rounded-md"
                            disabled={isLoading}
                            placeholder="Enter your full name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            className="w-full p-2 border rounded-md"
                            disabled={isLoading}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <input
                            {...register("password")}
                            type="password"
                            className="w-full p-2 border rounded-md"
                            disabled={isLoading}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Confirm Password</label>
                        <input
                            {...register("confirmPassword")}
                            type="password"
                            className="w-full p-2 border rounded-md"
                            disabled={isLoading}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    {/* {error && <p className="text-red-500 text-sm">{error.confirmPassword?.message || "Signup failed"}</p>} */}

                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-primary/80 hover:bg-primary rounded-xl"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/logIn" className="text-blue-500 hover:underline">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
}
