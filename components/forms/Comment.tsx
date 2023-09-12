"use client"

import { useForm } from "react-hook-form"
import * as z from "zod"
// import profile from '@/assets/profile.svg'
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
// import { Input } from "@/components/ui/input"
// import Image from "next/image"
// import { ChangeEvent, useState } from "react"
// import { Textarea } from "../ui/textarea"
import { commentValidation } from "@/lib/validations/thread"
import { Input } from "../ui/input"
import Image from "next/image"
import { addCommentToThread } from "@/lib/actions/threads.action"
// import { createThread } from "@/lib/actions/threads.action"


interface props {
    threadId:string,
    currentUserImg:string,
    currentUserId:string
}

export default function Comment({threadId,currentUserImg,currentUserId}:props) {
    const router=useRouter();
    const pathname=usePathname();
    
    const onSubmit=async(values:z.infer<typeof commentValidation>)=>{
      await addCommentToThread(
        threadId, values.thread,JSON.parse(currentUserId),pathname
      );
      form.reset();
    }
  const form=useForm({
    resolver:zodResolver(commentValidation),
    defaultValues:{
      thread: ""
    }
  });
  return (
    <Form {...form}>
            <form 
                onSubmit={form.handleSubmit(onSubmit)} className="comment-form"
            >
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-3 w-full">
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="profile"
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover"
                                />
                            </FormLabel>
                            <FormControl className="border-none bg-transparent">
                            <Input
                                type='text'
                                placeholder="comment..."
                                className="no-focus text-light-1 outline-none"
                                // onChange={(e)=>handleImage(e,field.onChange)}
                                {...field}
                            />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn">Submit</Button>
            </form>
        </Form>
  )
}
