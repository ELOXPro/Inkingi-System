'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { api } from "@/trpc/react";

const formSchema = z.object({
	name: z.string().min(4, {
		message: "Name must be at least 4 characters.",
	}),
	phonenumber: z.string().length(10, {
		message: "Phone Number must be 10 numbers.",
	}),
	password: z.string().min(4, {
		message: "Password must be at least 4 characters.",
	}),
})

interface SignUpFormProps {
  schoolId: string;
  role: string;
}

export default function SignUpForm({ schoolId, role }: SignUpFormProps) {
	const {data: school , isLoading} = api.school.findSchool.useQuery(schoolId)
	const schoolName = school?.name
	const Address = school ? school.province + " / " + school.district + " / " + school.sector : null
	const [terms,setTerms]= useState(false)
	const [loading, setLoading] = useState(false)
	const AddUser = api.user.create.useMutation({
		onSuccess: (data) => {
			if (data.result) {
				alert(data.result)
				setLoading(false)
			}
		}
	})
	
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			phonenumber: "",
			password: ""
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true)
		const fields = {
			name: values.name,
			phonenumber: values.phonenumber,
			password: values.password,
			role: role,
			id: schoolId,
		}
		AddUser.mutate(fields)
	}

	return (
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-2 overflow-auto">
							<h1 className="text-xl font-bold text-primary">
								School Information
							</h1>
							<h1 className="text-sm font-medium text-zinc-500">
								Make Sure it is your school before creating account.
							</h1>
							<h1 className="text-sm font-medium text-zinc-700 capitalize">
								School Name : <span>{isLoading? "Loading..." : schoolName ? schoolName :" Not Found"}</span>
							</h1>
							<h1 className="text-sm font-medium text-zinc-700 capitalize">
								Location : <span>{isLoading? "Loading..." : Address ? Address :" Not Found"}</span>
							</h1>
							<h1 className="text-xl font-bold text-primary">
								Personal Information
							</h1>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Full Name</FormLabel>
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
							<Checkbox id="terms" onCheckedChange={()=> setTerms(!terms)} />
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
	)
}
