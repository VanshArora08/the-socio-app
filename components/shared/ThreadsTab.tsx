import { fetchUserPosts } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation';
// import React from 'react'
import ThreadCard from '../cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.action';

interface props {currentUserId:string,accountId:string,accountType:string}

export default async function ThreadsTab({
    currentUserId,accountId,accountType
}:props) {
    let result:any;
    if(accountType==="User") result=await fetchUserPosts(accountId);
    else result=await fetchCommunityPosts(accountId);
    // console.log(result);
    if(!result) redirect('/');
    return (
      <section className="mt-9 flex flex-col gap-10" >
        {result.threads.map((post:any)=>{
        // console.log(post);

          return(
          <ThreadCard 
            key={post._id} 
            id={post._id}
            currentUser={currentUserId}
            parentId={post.parentId}
            content={post.text}
            author={accountType==="User"?{name:result.name,image:result.image,id:result.id}:{name:post.author.name,image:post.author.image,id:post.author.id}}
            community={post.community}
            createdAt={post.createdAt}
            comments={post.children}
          />  
        )
})}
    </section>
)
}
