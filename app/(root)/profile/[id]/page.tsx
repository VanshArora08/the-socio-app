import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs"
import { redirect } from 'next/navigation'
import ProfileHeader from "@/components/shared/profileHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";
import Image from "next/image";
// import { TabsContent } from "@radix-ui/react-tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";

export default async function page({params}:{params:{id:string}}) {
    const user = await currentUser();
    if (!user) return null;
    const userInfo=await fetchUser(params.id); 
    if(!userInfo?.onboarded) redirect('/onboarding');
    console.log(userInfo)
  return (
    <section>
      <ProfileHeader 
        accountId={userInfo.id}
        authUserId={user.id}
        name={userInfo.name}
        username={userInfo.username}
        imgUrl={userInfo.image}
        bio={userInfo.bio} type={"User"}      />

      <div className="mt-9">
        <Tabs defaultValue="leafs" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab)=>(
              <TabsTrigger key={tab.label} value={tab.value}>
                <Image
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">
                  {tab.label}
                </p>
                {tab.label==="Leafs" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {userInfo.threads.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {profileTabs.map((tab)=>(
            <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
              <ThreadsTab 
                currentUserId={user.id}
                accountId={userInfo.id}
                accountType="User"
              />

            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
