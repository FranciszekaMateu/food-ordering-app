'use client'
import Image from 'next/image'
import MenuItem from '../menu/MenuItem'
import SectionHeaders from './SectionHeaders';
import { useInView } from 'react-intersection-observer';

export default function HomeMenu (){
    const { ref, inView } = useInView({
        /* Opciones: puedes ajustar el umbral, el delay, etc. */
        threshold: 0.1, // El elemento se considera en vista cuando el 10% es visible
        triggerOnce: true // La animación se dispara una sola vez
    });
    

    return(
        <section className="">
            <div className='absolute h- left-0 right-0  '   >
                <div className='   absolute -left-20  -top-[70px] -z-10 text-left'>
                    <Image alt='sallad' src={"/arroz.png"} width={250} height={300}  />
                </div>
                <div className=' absolute -top-36 -right-20 -z-10'>
                    <Image alt='sallad' src={"/arroz.png"} width={250} height={300}  />
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders subHeader='Check out' mainHeader='Menu' />
            </div>
            <div className='grid grid-cols-3 gap-4' >
                <div ref={ref} className={inView ? 'fadeIn' : 'fadeOut'}><MenuItem /></div>
                <div ref={ref} className={inView ? 'fadeIn' : 'fadeOut'}><MenuItem /></div>
                <div ref={ref} className={inView ? 'fadeIn' : 'fadeOut'}><MenuItem /></div>
                <div ref={ref} className={inView ? 'fadeIn' : 'fadeOut'}><MenuItem /></div>
                <div ref={ref} className={inView ? 'fadeIn' : 'fadeOut'}><MenuItem /></div>
                <div ref={ref} className={inView ? 'fadeIn' : 'fadeOut'}><MenuItem /></div>
            </div>
        </section>
    );
}