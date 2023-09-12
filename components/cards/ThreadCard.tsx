// "use client"

import Image from "next/image";
import Link from "next/link";
import share from '@/assets/share.svg'
import repost from '@/assets/repost.svg'
import reply from '@/assets/reply.svg'
import heartGray from '@/assets/heart-gray.svg'

interface Props{
    id:string;
    currentUser:string;
    parentId:string | null;
    content:string;
    author:{
        name:string,
        image:string,
        id:string,
    }
    community:{
        id:string,
        name:string,
        image:string,
    } | null;
    createdAt:string;
    comments:{
        author:{
            image:string,
        }
    }[]
    isComment?:boolean;
}

const ThreadCard=({id,currentUser,parentId,content,author,community,createdAt,comments,isComment}:Props)=>{
    return (
        <article className={`flex w-full flex-col rounded-xl p-7 ${isComment ? 'px-0 xs:px-7':'bg-dark-2'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className='relative h-11 w-11'>
                            <Image
                                src={author.image}
                                alt="Profile Picture"
                                fill
                                className="rounded-full cursor-pointer"
                            />
                        </Link>
                        <div className="thread-card_bar"/>
                    </div>
                    <div className="flex w-full flex-col">
                        <Link href={`/profile/${author.id}`} className='w-fit h-11'>
                            <h4 className="cursor-pointer text-base-semibold text-light-1">{author.name}</h4>
                        </Link>
                        <p className="mt-2 text-small-regular text-light-2">
                            {content}
                        </p>
                        <div className="mt-5 flex flex-col gap-3">
                            <div className="flex gap-3.5">
                                <Image src={heartGray} width={24} height={24} className="cursor-pointer object-contain" alt="share"/>
                                <Image src={share} width={24} height={24} className="cursor-pointer object-contain" alt="like"/>
                                <Link href={`/thread/${id}`}>
                                    <Image src={reply} width={24} height={24} className="cursor-pointer object-contain" alt="reply"/>
                                </Link>
                                <Image src={repost} width={24} height={24} className="cursor-pointer object-contain" alt="repost"/>
                            </div>
                            {isComment && comments.length>0 && (
                                <Link href={`/thread/${id}`}>
                                    <p className="mt-1 text-subtle-medium text-gray-1">{comments.length}</p>
                                </Link>

                            )}
                             
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default ThreadCard;