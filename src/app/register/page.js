"use client";
import Image from 'next/image'
import { useState } from 'react';
import Link from 'next/link';
import { set } from 'mongoose';
export default function RegisterPage()

{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [creatingUser,setCreatingUser] = useState(false);
    const [userCreated,setUserCreated] = useState(false);
    const [error,setError] = useState(false);
    async function handleSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false);
        const response = await fetch('/api/register',{
                method:'POST',
                body:JSON.stringify({email,password}),
                headers:{
                'Content-Type':'application/json'
            }
        });
        if(!response.ok){
            setError(true);
        }
        else{
            setUserCreated(true);
        }
        setCreatingUser(false);
        console.log('submit');
       
    }
    return( 
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {userCreated && (
                <div className="my-4 text-center">
                    User created. <br/> Please 
                    <Link href={"/login"} className='underline text-primary'>Login &raquo;</Link>
                </div>
            )}
            {error && (
                <div className="my-4 text-center">
                    An Error has ocurred. <br/> Please try again later
                </div>
            )
            }
            <form className="block max-w-xs mx-auto " onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} 
                disabled={creatingUser}
                onChange={ev => setEmail(ev.target.value)} className="input" 
                />
                <input disabled={creatingUser} type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} className="input" />
                <button disabled={creatingUser} type="submit">Register</button>
                <div className="my-4 text-center text-gray-500 "> or loogin with provider</div>
                <button className='flex gap-4 justify-center'>
                  <Image src={'/google.png'} width={24} height={24} alt="google" />
                    Login with google
                </button>
                <div className='text-center my-4 text-gray-500 border-t'>
                    Existing accunt? 
                    <Link href={"/login"} className=' mx-1 underline text-primary'>
                        Login here &raquo;
                    </Link>
                </div>
            </form>
            
        </section>
    )
}