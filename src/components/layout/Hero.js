'use client'
import Image from 'next/image'
import Right from '../icons/Right'
import { useInView } from 'react-intersection-observer';
export default function Hero() {
    return (
        <section className={`hero mt-4 fadeIn `}>
            <div className='py-12'>
                <h1 className='text-5xl font-semibold '>
                <span className='text-primary'>
                        Sushi 
                    </span><br/>
                    a&nbsp;touch of delight<br/>
                    to every biter<br/>      
                </h1>
                <p className='my-6 text-gray-500 text-sm'>
                    Sushi is the secret ingredient that completes your existence
                </p>
                <div className='flex gap-4 text-sm' >
                    <button className='bg-primary uppercase flex justify-center rounded-full text-white py-2 gap-2 px-4 
                     items-center'
                    >
                        Order Now
                        <Right />
                    </button>
                    <button className='text-gray-600 items-center border-0 font-semibold flex gap-2 rounded-full   py-2'>
                        Learn More
                        <Right />
                    </button>
                </div>

            </div>

            <div className='relative'>
                <Image src={'/sushi.png'} layout='fill' objectFit='contain' alt="pizza" />
            </div>
        </section>
            )
}
