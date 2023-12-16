"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function LoginPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [loginInProgress,setLoginInProgress] = useState(false);
    function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginInProgress(true);
        const {ok} =fetch('/api/login',{
            body:JSON.stringify({email,password}),
            headers:{'content-type':'application/json'},
            method:'POST'
        });
        if(ok){

        }
        else{

        }
        setLoginInProgress(false);

        console.log('submit');
    }
    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="Email" value={email} 
                    disabled={loginInProgress}
                    onChange={ev => setEmail(ev.target.value)} className="input" 
                    />
                <input disabled={loginInProgress} type="password" placeholder="Password" value={password} onChange={ev => setPassword(ev.target.value)} className="input" />
                <button disabled={loginInProgress}  type="submit">Login</button>
                <div className="my-4 text-center text-gray-500 "> or loogin with provider</div>
                <button className='flex gap-4 justify-center'>
                  <Image src={'/google.png'} width={24} height={24} alt="google" />
                    Login with google
                </button>
                <div className='text-center my-4 text-gray-500 border-t'>
                    Dont have an account?
                    <Link href={"/register"} className=' mx-1 underline text-primary'>
                        Register here &raquo;
                    </Link>
                </div>
            </form>
        </section>
    );
}