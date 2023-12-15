import Image from 'next/image'
import MenuItem from '../menu/MenuItem'
import SectionHeaders from './SectionHeaders';
export default function HomeMenu (){
    return(
        <section className="">
            <div className='absolute h- left-0 right-0  '   >
                <div className='   absolute -left-12  -top-[70px] -z-10 text-left'>
                    <Image alt='sallad' src={"/sallad1.png"} width={109} height={189}  />
                </div>
                <div className=' absolute -top-36 -right-0 -z-10'>
                    <Image alt='sallad' src={"/sallad2.png"} width={107} height={195}  />
                </div>
            </div>
            <div className="text-center mb-4">
                <SectionHeaders subHeader='Check out' mainHeader='Menu' />
            </div>
            <div className='grid grid-cols-3 gap-4'>
                <MenuItem />
                <MenuItem />
                <MenuItem />    
                <MenuItem />    
                <MenuItem />    
                <MenuItem />    

            </div>
        </section>
    );
}