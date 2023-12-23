"use client";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user?.name || '');
  const {status} = session;
    console.log(session);
  if (status === 'loading') {
    return 'Loading ..'
  }
  if (status === 'unauthenticated') {
    return redirect('/login');
  }
  const userImage = session.data.user.image;
  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: userName})});

  }
  return (
    <section className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
        <div className="max-w-md mx-auto ">
            <div className="flex gap-4 items-center">
                <div>
                    <div className=" p-2 rounded-lg relative">
                        <Image  className="rounded-lg w-full h-full mb-2" src={ userImage } alt={'avatar'} width={250}  height={250}/>
                        <button type={'buttton'} >
                            Edit
                        </button>
                    </div>
                </div>
                <form className="grow" onSubmit={handleProfileInfoUpdate}>
                    <input value={userName} onChange={ev =>setUserName(ev.target.value)} type="text" placeholder="First Name and last name" /> 
                    <input type="email" disabled={true} value={session.data.user.email} placeholder="email" /> 
                    <button type="submit">Save</button>    
                </form>
            </div>
        </div>
    </section>
  )
}