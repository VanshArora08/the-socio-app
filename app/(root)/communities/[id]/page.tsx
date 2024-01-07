import Image from "next/image";
import { currentUser } from "@clerk/nextjs"

import { communityTabs } from "@/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThreadsTab from "@/components/shared/ThreadsTab";
import ProfileHeader from "@/components/shared/profileHeader";
import { fetchCommunityDetails } from "@/lib/actions/community.action";
import UserCard from "@/components/cards/UserCard";
// import { TabsContent } from "@radix-ui/react-tabs";

export default async function page({params}:{params:{id:string}}) {
    const user = await currentUser();
    if (!user) return null;
    
    const communityInfo=await fetchCommunityDetails(params.id);
  return (
    <section>
      <ProfileHeader 
        accountId={communityInfo.id}
        authUserId={user.id}
        name={communityInfo.name}
        username={communityInfo.username}
        imgUrl={communityInfo.image}
        bio={communityInfo.bio}
        type="Community"
      />

      <div className="mt-9">
        <Tabs defaultValue="threads" className="w-full">
          <TabsList className="tab">
            {communityTabs.map((tab)=>(
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
                {tab.label==="Threads" && (
                  <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 !text-tiny-medium text-light-2">
                    {communityInfo?.threads?.length}
                  </p>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          
            <TabsContent value="threads" className="w-full text-light-1">
              <ThreadsTab 
                currentUserId={user.id}
                accountId={communityInfo._id}
                accountType="Community"
              />

            </TabsContent>
            <TabsContent value="members" className="w-full text-light-1">
              <section className="mt-9 flex flex-col gap-10">
                    {communityInfo?.members?.map((member:any)=>(
                        <UserCard
                            key={member.id}
                            id={member.id}
                            name={member.name}
                            username={member.username}
                            imgUrl={member.image}
                            personType="User"
                        />
                    ))}
              </section>

            </TabsContent>
            <TabsContent value="requests" className="w-full text-light-1">
              <ThreadsTab 
                currentUserId={user.id}
                accountId={communityInfo._id}
                accountType="Community"
              />

            </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
