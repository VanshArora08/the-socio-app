// import React from 'react'

import PostThread from "@/components/forms/PostThread";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from 'next/navigation'

export default async function page() {
    const user = await currentUser();
    if (!user) return null;
    const userInfo=await fetchUser(user.id); 
    if(!userInfo?.onboarded) redirect('/onboarding');
    return (
        <>
            <h1 className="head-text">Create Leaf</h1>
            <PostThread userId={userInfo._id}/>
        </>
    )
}
