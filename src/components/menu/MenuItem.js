export default function MenuItem() {
    return (
        <div className='bg-gray-200 p-4 rounded-lg text-center hover:shadow-md hover:shadow-black/25 hover:bg-white transition-all'>
            <div className="text-center ">
                <img className=" max-h-24 block mx-auto " src='/pizza.png' alt='pizza'></img>
            </div>
            <h4 className='font-semibold my-3 text-xl'>
                Pepperoni Pizza
            </h4>
            <p className='text-gray-500 text-sm'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                Quasi, quae.
            </p>
            <button className='bg-primary text-white rounded-full px-8 py-2'>Add to cart 15$</button>
        </div>
    )
}