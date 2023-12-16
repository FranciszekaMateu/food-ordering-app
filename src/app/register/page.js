"use client";
import Image from 'next/image'
import { useState } from 'react';
export default function RegisterPage()

{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    function handleSubmit(ev){
        ev.preventDefault();
        fetch('/api/register',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        console.log('submit');
    }
    return( 
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            <form className="block max-w-xs mx-auto " onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={ev => setEmail(ev.target.value)} className="input" />
                <input type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} className="input" />
                <button type="submit">Register</button>
                <div className="my-4 text-center text-gray-500 "> or loogin with provider</div>
                <div >
                    <button className='flex gap-4 justify-center'>
                        <Image src={'/google.png'} width={24} height={24} alt="google" />
                        Login with google
                    </button>
                </div>
            </form>
            
        </section>
    )
}