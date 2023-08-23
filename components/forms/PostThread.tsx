"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
import profile from '@/assets/profile.svg'
import {zodResolver} from "@hookform/resolvers/zod"
// import { userValidation } from "@/lib/validations/user"
// import {useUploadThing} from '@/lib/uploadthing';
import { usePathname, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
// import { ChangeEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
// import { isBase64Image } from "@/lib/utils"
// import { updateUser } from "@/lib/actions/user.actions"
import { ThreadValidation } from "@/lib/validations/thread"

// import React from 'react'

interface Props {
    user:{
        id:string,
        objectId:string,
        username:string,
        name:string,
        bio:string,
        image:string,
    },
    btnTitle:string
}



export default function PostThread({userId}:{userId:string}) {

  const router=useRouter();
  const pathname=usePathname();

  const form=useForm({
    resolver:zodResolver(ThreadValidation),
    defaultValues:{
      thread: "",
      userId: userId,
    }
  });

  const onSubmit=async(data:any)=>{
    console.log(data);
  }
    return (
        <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-3 w-full">
                            <FormLabel className="text-base-semibold text-light-2">
                                content
                            </FormLabel>
                            <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Textarea
                                rows={15}
                                // onChange={(e)=>handleImage(e,field.onChange)}
                                {...field}
                            />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    )
}