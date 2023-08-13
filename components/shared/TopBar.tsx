import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignOutButton, OrganizationSwitcher } from '@clerk/nextjs'


export default function TopBar() {

    const isUserLoggedIn = true;

  return (
    <nav className="topbar">
        <Link href="/" className='flex items-center gap-4'>
            <Image src='/logo.svg' alt='logo' width={50} height={50}/>
            <p className='text-heading3-bold text-light-1 max-xs:hidden'>Socio</p>
            <div className='flex items-center gap-1'>
                <div className="block md:hidden">
                    <SignedIn>
                        <SignOutButton>
                            <div className='flex cursor-pointer'>
                                <Image src='./assets/logout.svg' alt='signout' width={24} height={24}/>
                            </div>
                        </SignOutButton>
                    </SignedIn>
                </div>
                <OrganizationSwitcher 
                    
                />
            </div>
        </Link>
    </nav>
  )
}
