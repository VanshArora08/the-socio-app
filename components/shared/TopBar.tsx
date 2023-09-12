 

import Link from 'next/link'
import Image from 'next/image'
import { SignedIn, SignOutButton,UserButton } from '@clerk/nextjs'
import { OrganizationSwitcher } from '@clerk/nextjs'
import { dark } from '@clerk/themes' 
import logOut from '../../assets/logout.svg'
import logo from '../../assets/logo.svg'


export default function TopBar() {

  return (
    <nav className="topbar">
        <Link href="/" className='flex items-center gap-4'>
            <Image src={logo} alt='logo' width={28} height={28}/>
            <p className='text-heading3-bold text-light-1 max-xs:hidden'>Socio</p>
        </Link>
        <div className='flex items-center gap-1'>
            <div className="block md:hidden">
                <SignedIn>
                    <SignOutButton>
                        <div className='flex cursor-pointer '>
                            <Image src={logOut} alt='logout' width={24} height={24} />
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
            <OrganizationSwitcher 
                appearance={{
                    elements:{
                        organizationSwitcherTrigger:"py-2 px-4"
                    },
                    baseTheme:dark
                }}
            />
        </div>
    </nav>
  )
}
