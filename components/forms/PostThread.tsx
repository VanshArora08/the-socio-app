"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
// import profile from '@/assets/profile.svg'
import {zodResolver} from "@hookform/resolvers/zod"
import { useOrganization } from "@clerk/nextjs"
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
// import { Input } from "@/components/ui/input"
// import Image from "next/image"
// import { ChangeEvent, useState } from "react"
import { Textarea } from "../ui/textarea"
import { ThreadValidation } from "@/lib/validations/thread"
import { createThread } from "@/lib/actions/threads.action"

// import React from 'react'

interface Props {
    userId:string,
}



export default function PostThread({userId}:Props) {


    
    const router=useRouter();
    const pathname=usePathname();
    const {organization}=useOrganization();
    
    const onSubmit=async(values:z.infer<typeof ThreadValidation>)=>{
        if(!organization)
        {
            await createThread({
                text:values.thread,
                author:userId,
                communityId:null,
                path:pathname,
            })
        }else{
            await createThread({
                text:values.thread,
                author:userId,
                communityId:organization.id,
                path:pathname,
            })
        }
        router.push('/')
    }
  const form=useForm({
    resolver:zodResolver(ThreadValidation),
    defaultValues:{
      thread: "",
      accountId: userId,
    }
  });

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