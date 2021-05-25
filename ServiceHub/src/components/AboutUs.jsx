import React from 'react'

export default function AboutUs() {
    return (
        <>
        <div class="bg1"></div>
        <div class="bg1 bg2"></div>
        <div class="bg1 bg3"></div>
        <div className="">
            <h1 className="text-3xl md:text-5xl text-gray-700 font-bold text-center m-6 md:m-10 md:mt-0 pt-7">About Us</h1>
            <div className="bg-white mx-4 md:mx-16 md:mt-4 p-10 rounded-3xl bg-opacity-80 shadow-2xl">
                <h2 className="text-2xl text-gray-800 md:text-4xl font-bold text-center mb-5 ">Who we are </h2>
                <p className="text-gray-600 text-justify text-base md:text-xl">
                    Service Hub d in November 2014. It is the largest home services platform in Asia, with presence in India, UAE, Singapore and Australia. The platform helps customers book reliable home services like beauty services, massage therapy, cleaning, plumbing, carpentry, appliance repair, painting etc. The company's vision is to empower millions of service professionals across the world to deliver services at home like never seen before. The company partners with tens of thousands of service professionals, helping them with  with training, credit, product procurement, insurance, technology etc.                </p>
            </div>
            <div className="text-white  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  m-8 md:mx-40">
                <div className="m-4   ">
                    <div className="text-base md:text-4xl text-center p-6">2500000+</div>
                    <div className="text-base md:text-2xl text-center">Trained Professional</div>
                </div>
                <div className="m-4  ">
                    <div className="text-base md:text-4xl text-center p-6">50 Million+</div>
                    <div className="text-base md:text-2xl text-center">Happy Customers</div>
                </div>
                 <div className="m-4 ">
                    <div className="text-base md:text-4xl text-center p-6">360</div>
                    <div className="text-base md:text-2xl text-center">Cities</div>
                </div>
                 <div className="m-4  ">
                    <div className="text-base md:text-4xl text-center p-6">5</div>
                    <div className="text-base md:text-2xl text-center">Countries</div>
                </div>
            </div>

             <div className="bg-white mx-4 md:mx-16 md:mt-4 p-10 rounded-3xl bg-opacity-80 shadow-2xl">
                <h2 className="text-2xl text-gray-800 md:text-4xl font-bold text-center mb-5 ">How we do it  </h2>
                <p className="text-gray-600 text-justify text-base md:text-xl">
                    Service Hub provides a platform that allows skilled and experienced professionals to connect with users looking for specific services. All the professionals, though experienced and skilled, undergo intensive training modules before being allowed to list their services on the platform. Once on the platform, our match-making algorithm identifies professionals who are closest to the users’ requirements and available at the requested time and date.</p> 
            </div>

             <div className="mx-4 md:mx-16 mt-6 p-10 ">
                <h2 className="text-2xl text-gray-800 md:text-3xl font-bold text-center mb-5 ">Our Mission is to empower millions of service professionals by delivering servces at home in a way that has never been experienced before.</h2>
            </div>

            </div>
            </>
    )
}
