import React from 'react'

export default function Review() {

    const reviews = [
        {
            name: "Bill gate",
            review: "One stop solution for all your needs at your doorstep.. staying focused on hygiene & sanitization..."
        }
        ,
        {
            name: "Jef Bezos",
            review: "You guys rock, didn't expect this excpetional service even in this pandamic situation..."
        },
        {
            name: "Elon Musk ",
            review: "I appreciate the precautinary measures taken by your servicemen. They aware of aarogrya setu importance..."
        },
        {
            name: "Sundar Pichai",
            review: "Had a short circuit in the apartment, Electrician visit scheduled in a flash. Now things are back to normal..."
        }
    ]
    

    return (
        <>
        <div class="bg1"></div>
        <div class="bg1 bg2"></div>
        <div class="bg1 bg3"></div>
        <div className=" md:py-10 " >
            <div className="pt-10 text-center">
                <div className="text-2xl md:text-4xl font-bold text-center ">
                    Customer Safety is our Priority
                </div>
                <div className="text-sm md:text-2xl text-gray-500 font-medium pt-2 text-center ">
                    What customers are saying about our safety standards
                </div>
            </div>
            <div className=" md:p-4 md:pt-2 md: py-8 grid md:grid-cols-2 lg:grid-cols-4"> 
            {
                reviews.map(({ name, review }) => (
                <div className="  m-4 bg-white h-40 md:h-56 rounded-3xl shadow-md hover:shadow-2xl transform delay-150 hover:rotate-1 ">
                <div className="text-base md:text-xl italic font-medium text-center p-6">
                "{review}"
                </div>
                <div className="text-lg md:text-2xl font-medium  p-1 md:p-6 text-white absolute bottom-0 w-full h-10 md:h-20 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-b-3xl ">
                    <span className=" absolute w-max right-8">- {name}</span>
                </div>
                </div>
                ))
            }
            </div>
        </div>    
        </>
    )
}
