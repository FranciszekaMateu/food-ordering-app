import Image from 'next/image'
export default function RegisterPage()
{
    return( 
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            <form className="block max-w-xs mx-auto ">
                <input type="email" placeholder="Email" className="input" />
                <input type="password" placeholder="Password" className="input" />
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