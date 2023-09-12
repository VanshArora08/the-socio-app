// "use client"

import ThreadCard from '@/components/cards/ThreadCard';
import { fetchPosts } from '@/lib/actions/threads.action';
import { currentUser } from '@clerk/nextjs';

export default async function Home() {

  const results = await fetchPosts(1,30);
  console.log(results)

  const user = await currentUser();

  return (
    <>
      <h1 className='text-white'>Home</h1>
      <section className="mt-9 flex flex-col gap-10">{results.posts.length === 0 ? ( <p>No threads found</p> ):(
        <>
          {results.posts.map((post)=>(
            <ThreadCard 
              key={post._id} 
              id={post._id}
              currentUser={user?.id || ""}
              parentId={post.parentId}
              content={post.text}
              author={post.author}
              community={post.community}
              createdAt={post.createdAt}
              comments={post.children}
            />
          ))}
        </>
      )}</section>
    </>
  )
}
