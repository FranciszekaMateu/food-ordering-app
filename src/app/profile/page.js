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

  console.log(session);

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
        body: JSON.stringify({ name: userName, image }),
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
        <div className="flex gap-4 items-center">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
              {image && (
                <Image
                  className="rounded-lg w-[120px] h-full mb-2"
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
            <input type="tel" disabled={true} placeholder="Telefono" />
            <input type="text" disabled={true} v placeholder="Direccion" />
            <div className="flex gap-4">
              <input type="text" disabled={true} placeholder="Cuidad" />
              <input type="text" disabled={true} placeholder="Codigo postal" />
            </div>
            
            <input type="text" disabled={true} placeholder="Pais" />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </section>
  );
}
