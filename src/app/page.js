import Header from "../components/layout/Header"
import Hero from "../components/layout/Hero"
import HomeMenu from "../components/layout/HomeMenu"
import SectionHeaders from "../components/layout/SectionHeaders"

export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <section className="text-center my-16">
        <SectionHeaders subHeader='Our Story' mainHeader='About us' />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4" >
        <p>Welcome to SushiT, where tradition embraces innovation in the delicate 
        art of sushi cuisine.</p>

        <p>Established in 2010, SushiT is the culmination of a dream to bring the authentic 
        Japanese sushi experience to the heart of New York City. Our head chef, Chef Hiroshi Nakamura, 
        trained in the prestigious sushi schools of Tokyo, brings not only years of expertise but also a 
        fervent passion for experimenting with flavors and textures, all while honoring the age-old sushi-making traditions.</p>

        <p>At SushiT, each dish is a masterpiece. We take pride in using only the freshest, highest quality ingredients, 
        sourced directly from Japan and blended with the finest local produce, 
        to create unique flavors that satisfy both sushi connoisseurs and those new to the Japanese culinary journey.</p>
        
        <span className="text-primary font-bold">We look forward to welcoming you soon!</span>
      </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader='Contact us' />
        <div className="mt-8">
            <a className="text-4xl underline text-gray-500" href="tel:555-555-5555">555-555-5555</a>
        </div>
      </section>
        
    </>
  )
}
