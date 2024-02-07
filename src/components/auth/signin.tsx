'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { signIn} from "next-auth/react"
import { toast } from "sonner"

const formSchema = z.object({
  phonenumber: z.string().min(10, {
    message: "Phone Number must be 10 numbers.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
})

export default function LoginForm() {
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phonenumber: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    await signIn("credentials", {
      phonenumber: values.phonenumber,
      password: values.password,
      redirect: true,
      callbackUrl: "/login",
    }).then((res) => {
      if (res?.status === 401) {
        toast(res.error,{duration: 1000});
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  };

return (
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 px-2">
        <FormField
          control={form.control}
          name="phonenumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your Phone number" {...field} />
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
                <Input placeholder="Enter your Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading ? true : false} type="submit">Login</Button>
      </form>
      <button className="text-sm hover:underline text-primary">forgot password?</button>
    </Form>
)
}