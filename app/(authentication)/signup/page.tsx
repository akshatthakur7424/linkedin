"use client"

// next imports 
import { useState } from "react"
import { useRouter } from "next/navigation"

// shadcn imports
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// third party packages imports
import axios from "axios";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

// defining form schema 
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required." })
        .regex(emailRegex, { message: "Please enter a valid email address." }),

    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long." }),
});

export default function SignUp() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const { isValid, isSubmitting } = form.formState;

    const handleSignIn = () => {
        router.push("/signin")
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        console.log("Form Data: ", values);
        try {
            const response = await axios.post("/api/auth/signup", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("User Registered: ", response.data);
            // accessing and setting token in the cookies 
            const { token } = response.data;
            await axios.post("/api/auth/set-token", { token });

            router.push("/email-verification");
        } catch (error) {
            console.error("Cannot register. Error: ", error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-start gap-2 p-4">
            <p className="text-3xl m-2 my-4">Make the most of your professional life</p>

            <div className="h-auto w-full max-w-md flex flex-col items-center justify-start bg-white rounded-md p-6 shadow">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input {...field} className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" {...field} className="bg-white" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full rounded-full"
                            disabled={!isValid || isSubmitting || isLoading}
                        >
                            {isLoading ? "Registering..." : "Agree & Join"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center text-xs text-gray-500 max-w-sm leading-relaxed mt-4">
                    By clicking Agree & Join or Continue, you agree to LinkedIn’s
                    <a href="#" className="text-blue-600 hover:underline"> User Agreement</a>,
                    <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>, and
                    <a href="#" className="text-blue-600 hover:underline"> Cookie Policy</a>.
                </p>

                <p className="text-muted-foreground my-4">or</p>

                <p className="text-sm text-gray-700">
                    Already on LinkedIn?{" "}
                    <button
                        onClick={handleSignIn}
                        className="text-blue-600 font-medium hover:underline cursor-pointer"
                    >
                        Sign in
                    </button>
                </p>
            </div>
        </div>
    )
}


// "use client"

// // next imports
// import { useState } from "react"
// import { useRouter } from "next/navigation"

// // shadcn imports
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"

// // third party packages imports
// import axios from "axios";
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import toast from "react-hot-toast"

// // defining form schema
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// const formSchema = z.object({
//     email: z
//         .string()
//         .min(1, { message: "Email is required." })
//         .regex(emailRegex, { message: "Please enter a valid email address." }),

//     password: z
//         .string()
//         .min(8, { message: "Password must be at least 8 characters long." }),
// });

// export default function SignUp() {
//     // initiallizing hooks
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);

//     // defining form
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             email: "",
//             password: ""
//         },
//     })

//     // form state
//     const { isValid, isSubmitting } = form.formState;

//     const handleSignIn = () => {
//         router.push("/signin")
//     }

//     const onSubmit = async (values: z.infer<typeof formSchema>) => {
//         setIsLoading(true)
//         console.log("Form Data: ", values);
//         try {
//             const response = await axios.post("/api/auth/signup", values, {
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             });
//             console.log("User Registered: ", response.data);
//             router.push("/email-verification");
//         } catch (error) {
//             console.log("Cannot register. Error: ", error);
//             toast.error("Something went wrong");
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     return (
//         <div className="w-full h-full flex flex-col items-center justify-start gap-2 p-4">

//             {/* Heading */}
//             <p className="text-3xl m-2 my-4" >Make the most of your professional life</p>

//             {/* Signup Form */}
//             <div className="h-auto w-1/4 flex flex-col items-center justify-start bg-white rounded-md p-4 px-8">

//                 {/* Sign Up Form  */}
//                 <Form {...form}>
//                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full ">
//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel htmlFor="email">Email</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} className="p-2 bg-white" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <FormField
//                             control={form.control}
//                             name="password"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel htmlFor="password">Password</FormLabel>
//                                     <FormControl>
//                                         <Input {...field} className="p-2 bg-white" />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <div className="flex gap-4" >
//                             {/* Sign Up Button  */}
//                             <button
//                                 disabled={!isValid || isSubmitting || isLoading}
//                                 type="submit"
//                                 className="w-full bg-sky-700 text-white rounded-full py-2 my-4 cursor-pointer"
//                             >
//                                 Agree & Join
//                             </button>
//                         </div>
//                     </form>
//                 </Form>

//                 {/* Terms  */}
//                 <p className="text-center text-xs text-gray-500 max-w-sm leading-relaxed mt-2">
//                     By clicking Agree & Join or Continue, you agree to LinkedIn’s
//                     <a href="#" className="text-blue-600 hover:underline"> User Agreement</a>,
//                     <a href="#" className="text-blue-600 hover:underline"> Privacy Policy</a>, and
//                     <a href="#" className="text-blue-600 hover:underline"> Cookie Policy</a>.
//                 </p>



//                 <p className="text-muted-foreground my-4" >or</p>

//                 {/* Sign In page navigation  */}
//                 <p className="text-sm text-gray-700">
//                     Already on LinkedIn? {" "}
//                     <button
//                         onClick={handleSignIn}
//                         className="text-blue-600 font-medium hover:underline cursor-pointer">
//                         Sign in
//                     </button>
//                 </p>
//             </div>

//         </div >
//     )
// }