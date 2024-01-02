import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from 'next/navigation'
import ProfileHeader from "@/components/shared/profileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
// import { TabsContent } from "@radix-ui/react-tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import UserCard from "@/components/cards/UserCard";

export default async function page() {
    const user = await currentUser();
    if (!user) return null;

    const userInfo=await fetchUser(user.id); 
    if(!userInfo?.onboarded) redirect('/onboarding');
    // console.log(userInfo)
    
    // fetch users
    const result=await fetchUsers({
        userId:user.id,
        searchTerm:"",
        pageNumber:1,
        pageSize:25
    })
  return (
    <section>
      <h1 className='head-text mb-10'>Search</h1>
      {/* searchbar */}
      <div className="mt-14 flex flex-col gap-9">
        {result.users.length===0?(
            <p className="no-result">No Users</p>
        ):(
            <>
                {result.users.map((person)=>(
                    <UserCard
                        key={person.id}
                        id={person.id}
                        name={person.name}
                        username={person.username}
                        imgUrl={person.image}
                        personType="User"
                    />
                ))}
            </>
        )}
      </div>
    </section>
  )
}


