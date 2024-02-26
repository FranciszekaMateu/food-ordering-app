"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import EditableImage from "../../components/layout/EditableImage"
import  UsersTabs from "../../components/layout/UserTabs"
import toast from "react-hot-toast";
import Loader from '../../components/layout/Loader';
export default function ProfilePage() {
  const session = useSession();
  const [userName, setUserName] = useState(session?.data?.user?.name || '');
  const { status } = session;
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(session?.data?.user?.image || '');
  const [phone, setPhone] = useState(session?.data?.user?.phone || '');
  const [address, setAddress] = useState(session?.data?.user?.address || '');
  const [city, setCity] = useState(session?.data?.user?.city || '');
  const [country, setCountry] = useState(session?.data?.user?.country || '');
  const [postal, setPostal] = useState(session?.data?.user?.postal || '');
  const [admin, setAdmin] = useState(session?.data?.user?.admin || false);
  const [profileFetcher,setProfileFetcher] = useState(true);
  useEffect(() => {
    if (status === 'authenticated') {
      setUserName(session.data.user.name);
      setImage(session.data.user.image);
      fetch('/api/profile')
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
          setImage(data.image);
          setPhone(data.phone);
          setAddress(data.address);
          setCity(data.city);
          setCountry(data.country);
          setPostal(data.postal);
          setIsLoading(false);
          setAdmin(data.admin); 
          console.log(data.admin);
          setProfileFetcher(false);
        });
    }
  }, [status, session]);

  if (isLoading) {
    return (
      <Loader/>
   );
  }
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

  if (status === 'loading' || profileFetcher) {
    return 'Loading ..';
  }

  if (status === 'unauthenticated') {
    return redirect('/login');
  }


  return (
    <section  className={` mt-8 `}>
     
        <UsersTabs isAdmin={admin}/>
      <h1 className="text-center text-primary text-4xl mb-4">
        
      </h1>

       <div className="max-w-md mx-auto  mt-8">
        <div className="flex gap-4">
          <div>
            <div className="p-2 rounded-lg relative max-w-[120px]">
            <EditableImage link={image} setLink={setImage} />
          </div>
          </div>

          <form className="grow" onSubmit={handleProfileInfoUpdate}>
            <label>
              <span className="block text-gray-500">Nombre y apellido</span>
            </label>
            <input
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
              type="text"
              placeholder="Nombre y apellido"
            />
            <label>
              <span className="block text-gray-500">Email</span>
            </label>
            <input type="email" disabled={true} value={session.data.user.email} placeholder="mail" />
            <label>
              <span className="block text-gray-500">Telefono</span>
            </label>
            <input type="tel"  placeholder="Telefono" 
            value={phone} onChange={ev => setPhone(ev.target.value)}/>
            <label>
              <span className="block text-gray-500">Direccion</span>
            </label>
            <input type="text"  v placeholder="Direccion" 
            value={address} onChange={ev  => setAddress(ev.target.value)}/>
            <label>
              <span className="block text-gray-500">Ciudad, codigo postal y pais</span>
            </label>
            <div className="flex gap-2">
              <input  type="text" placeholder="Cuidad" 
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
