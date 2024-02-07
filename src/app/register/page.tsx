'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/trpc/react";
import { toast } from "sonner"


const formSchema = z.object({
  schoolname: z.string().min(3, {
    message: "School Name must be at least 3 characters.",
  }),
  province: z.string().min(4, {
    message: "Province must be at least 4 characters.",
  }),
  district: z.string().min(4, {
    message: "District must be at least 4 characters.",
  }),
  sector: z.string().min(4, {
    message: "Sector must be at least 4 characters.",
  }),
  adminname: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  phonenumber: z.string().length(10, {
    message: "Phone Number must be 10 numbers.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
  checkboxes: z.object({
    primary: z.boolean(),
    ordinary: z.boolean(),
    reb: z.boolean(),
    tvet: z.boolean(),
  }).refine(data => Object.values(data).some(Boolean), {
    message: "At least one checkbox must be selected.",
  }),
})

export default function RegisterSchool() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schoolname: "",
      province: "",
      district: "",
      sector: "",
      adminname: "",
      phonenumber: "",
      password: "",
      checkboxes: {
        primary: false,
        ordinary: false,
        reb: false,
        tvet: false,
      },
    },
  });
  const AddSchool = api.school.create.useMutation({
    onSuccess: (data) => {
      if (data.result) {
        toast(data.result)
        setLoading(false)
      }
    }
  })
  const [terms, setTerms] = useState(false)
  const [loading, setLoading] = useState(false)

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    AddSchool.mutate(values)
  }

  return (
      <div className="flex flex-col gap-4 min-h-screen items-center justify-center p-2">
        <div className="container p-0 w-auto shadow-lg shadow-primary flex flex-col items-center justify-center gap-0 border border-primary rounded-2xl overflow-hidden mt-16">
          <div className="flex w-full bg-primary justify-center p-2">
            <h1 className="text-xl font-bold text-primary-foreground">Register School</h1>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-2 overflow-auto">
              <h1 className="text-xl font-bold text-primary">
                School Information
              </h1>
              <h1 className="text-sm font-medium text-zinc-500">
                Provide all Data in The Fields and Make Sure that it is all Accurate
              </h1>
              <FormField
                control={form.control}
                name="schoolname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>School Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your School Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h1 className="text-sm font-medium text-zinc-500">
                Choose All Levels in Your School.
              </h1>
              <div className="grid grid-cols-2 gap-2 items-center">
                <FormField
                  control={form.control}
                  name="checkboxes.primary"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Primary
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkboxes.ordinary"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Ordinary
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkboxes.reb"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Reb A level
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="checkboxes.tvet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-reverse">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          TVET
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <h1 className="text-sm font-medium text-zinc-500">
                Enter School Location
              </h1>
              <div className="grid grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Province" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="district"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>District</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter District" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sector</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Sector" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <h1 className="text-xl font-bold text-primary">
                Admin Information
              </h1>
              <h1 className="text-sm font-medium text-zinc-500">
                Make Sure You Are The Admin of The School
              </h1>
              <FormField
                control={form.control}
                name="adminname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Full Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
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
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" onCheckedChange={() => setTerms(!terms)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept <Link className="text-secondary" href="#" >terms and conditions</Link>
                </label>
              </div>
              <Button disabled={terms === false || loading ? true : false} type="submit">Submit</Button>
            </form>
          </Form>
        </div>
        <Footer />
      </div>
  )
}
