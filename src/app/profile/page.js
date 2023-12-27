"use client";
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user?.name || '');
  const {status} = session;
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
    console.log(session);




  


  useEffect(() => {
    if(status === 'authenticated') {
      setUserName(session.data.user.name);
    }
  }, [status,session]);

  async function handleProfileInfoUpdate(ev){
    ev.preventDefault();
    setSaved(false);
    setIsSaving(true);
    const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: userName})});
    if (response.ok) {
      setIsSaving(false);
      setSaved(true);
    }
    setTimeout(() => {
            setSaved(false);

    }, 3000);
  }
  if (status === 'loading') {
    return 'Loading ..'
  }
  if (status === 'unauthenticated') {
    return redirect('/login');
  }
  const userImage = session.data.user.image;
  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1)  {
      const data = new FormData;
      data.set('file', files[0]);
      await fetch('/api/upload', {
        method: 'POST',
        body: data,
        
      })
    }
  }
  return (
    <section className="mt-8">
        <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>
        
        <div className="max-w-md mx-auto ">
          {
            saved && (
              <h2 className="text-center bg-green-200 p-4 rounded-lg border border-green-400">
                Profile saved!
              </h2>
            )
          }
          {
            isSaving && (
              <h2 className="text-center bg-gray-200 p-4 rounded-lg border border-green-400">
                Saving...
              </h2>
            )
          }
            <div className="flex gap-4 items-center">
                <div>
                    <div className=" p-2 rounded-lg relative">
                        <Image  className="rounded-lg w-full h-full mb-2" src={ userImage } alt={'avatar'} width={250}  height={250}/>
                        <label>
                          <input type="file" className="hidden" onChange={handleFileChange}/>
                          <span className=" block border rounded-lg p-2 text-center font-semibold
                          border-gray-300 cursor-pointer">
                             Edit
                          </span>

                        </label>
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