"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"


const AuthFormSchema = (type: FormType)=> {
  return z.object({
    name: type==="sign-up" ? z.string().min(2) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(8),
  })
}


const AuthForm = ({type} : {type : FormType}) => {
  // 1. Define your form.
  const router = useRouter();
  const formSchema = AuthFormSchema(type)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if(type === "sign-in") {
        // Call your sign-in API
        toast.success("Sign in successful")
        router.push("/")
      }else {
        // Call your sign-up API
        toast.success("Account created successfully. Please sign in")
        router.push("/sign-in")
      }
    } catch (error) {
      console.error(error)
      toast.error(`Something went wrong: ${error}`)
    }
  }

  const isSignIn = type === "sign-in"

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-row gap-2 justify-center">
            <Image 
              src="/logo.svg" 
              alt="logo" 
              height={32} 
              width={38}
            />
            <h2 className="text-primary-100">PrepWise</h2>
          </div>
          <h3 className="">Practice job interview with AI</h3>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your name"
              />
            )}
            <FormField
                control={form.control}
                name="email"
                label="Email"
                placeholder="Your email address"
                type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />
            <Button className="btn" type="submit">{isSignIn ? "Sign in" : "Create an Account"}</Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link 
            href={isSignIn ? "/sign-up" : "/sign-in"} 
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm