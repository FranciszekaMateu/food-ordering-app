import Image from 'next/image'
import Right from '../icons/Right'
export default function Hero() {
    return (
        <section className='hero'>
            <div className='py-12'>
                <h1 className='text-4xl font-semibold '>
                    Everthing <br/>
                    tastes better<br/>
                     with a little bit of a&nbsp;
                    <span className='text-primary'>
                        PIZZA
                    </span>
                </h1>
                <p className='my-6 text-gray-500 text-sm'>
                    Pizza is the missing ingredient in your life
                </p>
                <div className='flex gap-4 text-sm' >
                    <button className='bg-primary uppercase rounded-full text-white py-2 gap-2 px-4 flex
                     items-center'
                    >
                        Order Now
                        <Right />
                    </button>
                    <button className='text-gray-600 font-semibold flex gap-2 rounded-full   py-2'>
                        Learn More
                        <Right />
                    </button>
                </div>

            </div>

            <div className='relative'>
                <Image src={'/pizza.png'} layout='fill' objectFit='contain' alt="pizza" />
            </div>
        </section>
            )
}
