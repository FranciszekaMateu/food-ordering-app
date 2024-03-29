'use client'
import Link from 'next/link'
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react'
export default function Header() {
    const session = useSession();
    const userData = session.data?.user;
    let userName =  userData?.name || userData?.email;
    if (userName?.includes(' ')) {
      userName = userName.split(' ')[0];
    }
    console.log(session);
    const status =session.status;
    return (
        <>
        <header className='flex items-center justify-between'>
        
          <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
              <Link className='text-primary font-semibold text-2xl flex ' href="/">
                <Image src={'/logo.png'} width={140} height={140} alt="pizza" />
              </Link>
              <Link className='hover:border-b-4 transition-colors duration-300 border-primary' href={''}>Menu</Link>
              <Link className='hover:border-b-4 transition-colors duration-300 border-primary' href={''}>About</Link>
              <Link className='hover:border-b-4 transition-colors duration-300 border-primary' href={''}>Contact</Link>
          </nav>
          
          <nav className='flex items-center gap-4 text-gray-500 font-semibold'>
            { status === 'authenticated' && (
              <>
              <Link className=' whitespace-nowrap hover:text-gray-700' href={'/profile'}>Hello {userName}</Link>
              <button onClick={() => signOut()} className='bg-primary rounded-full text-white px-8 py-2'>
                Logout</button>
              </>
            )}
            {
              status === 'unauthenticated' && (
                <>
                  <Link href={"/login"}>Login</Link>
            <Link href={'/register'} className='bg-primary rounded-full text-white px-8 py-2'>Register</Link>
                </>
              )
            }
            
          </nav>
      </header>
        </>
    )
}
