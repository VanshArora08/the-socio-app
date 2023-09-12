import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchThreadById } from "@/lib/actions/threads.action";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default async function page({params}:{params:{id:string}}) {
  if(!params.id) return null;
  const  user  =await currentUser(); 
  if(!user) return null;
  const userInfo=await fetchUser(user.id);
  if(!userInfo?.onboarded) redirect("/onboarding")

  const post=await fetchThreadById(params.id);

  return (
    <section className="relative">
      <div>
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
      </div>
      <div className="mt-7">
        <Comment
          threadId={post.id}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        />
      </div>
      <div className="mt-10">
        {/* {console.log(post.children)} */}
        {post.children.map((comment:any) => (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUser={comment?.id || ""}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
          />
        ))}
      </div>
    </section>
  )
}
