import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from 'next/navigation'
// import ProfileHeader from "@/components/shared/profileHeader";
import Link from "next/link";
import Image from "next/image";


export default async function page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo=await fetchUser(user.id); 
  if(!userInfo?.onboarded) redirect('/onboarding');
  // console.log(userInfo)

  // get activity
  const activities=await getActivity(userInfo._id);
  console.log(activities)


  return(
    <section>
      <h1 className="head-text mb-10">Activity</h1>
      <section className="mt-10 flex flex-col gap-5">
        {
          activities.length>0?(
            <>
              {/* hello */}
              {activities.map((activity)=>(
                <Link
                  key={activity._id}
                  href={`/thread/${activity.parentId}`}
                >
                  
                  <article className="activity-card">
                    <Image 
                      src={activity.author.image}
                      alt="profile Picture"
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">{activity.author.name}</span> replied to your Leaf
                    </p>
                  </article>
                </Link>
              ))}
            </>
          ):(
            <p className="!text-base-regular text-light-3">
              No Activity Yet
            </p>
          )
        }
      </section>
    </section>
  )
}
