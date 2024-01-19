"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user?.name || '');
  const { status } = session;
  const [image, setImage] = useState(session?.data?.user?.image || '');
  const [phone, setPhone] = useState(session?.data?.user?.phone || '');
  const [address, setAddress] = useState(session?.data?.user?.address || '');
  const [city, setCity] = useState(session?.data?.user?.city || '');
  const [country, setCountry] = useState(session?.data?.user?.country || '');
  const [postal, setPostal] = useState(session?.data?.user?.postal || '');
  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
    }
  }, [status, session]);

  async function handleProfileInfoUpdate(ev) {
    ev.preventDefault();
    const savingPromise = new Promise(async(resolve,reject ) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           name: userName, 
           image,
           address,
           city,
           country,
           postal,
           phone,}),
      });
      if(response.ok) {
        resolve();
      } else {
        reject();
      }
    })
    toast.promise(savingPromise, {
      loading: 'Saving',
      success: 'Saved',
      error: 'Failed to save'
    })
    
  }

  if (status === 'loading') {
    return 'Loading ..';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadingPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(async (response) => {
        if (response.ok) {
          const link = await response.json();
          setImage(link);
        } else {
          throw new Error('Failed to upload');
        }
      });

      await toast.promise(uploadingPromise, {
        loading: 'Uploading',
        success: 'Uploaded',
        error: 'Failed to upload',
      });
    }
  }

  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Profile</h1>

      <div className="max-w-md mx-auto">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {image && (
                <Image
                  className="rounded-lg max-w-[120px] relative p-2"
                  src={image}
                  alt={'avatar'}
                  width={250}
                  height={250}
                />
              )}

              <label>
                <input type="file" className="hidden" onChange={handleFileChange} />
                <span className="block border rounded-lg p-2 text-center font-semibold border-gray-300 cursor-pointer">
                  Edit
                </span>
              </label>
            </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <input
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              type="text"
              placeholder="Nombre y apellido"
            />
            <input type="email" disabled={true} value={session.data.user.email} placeholder="mail" />
            <input type="tel"  placeholder="Telefono" 
            value={phone} onChange={ev => setPhone(ev.target.value)}/>
            <input type="text"  v placeholder="Direccion" 
            value={address} onChange={ev  => setAddress(ev.target.value)}/>
            <div className="flex gap-4">
              <input type="text" placeholder="Cuidad" 
              value={city} onChange={ev => setCity( ev.target.value)}/>
              <input type="text"  placeholder="Codigo postal" 
              value={postal} onChange={ev =>  setPostal(ev.target.value)}/>
            </div>
            <input type="text"  placeholder="Pais" 
            value={country} onChange={ev =>  setCountry(ev.target.value)}/>
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
