import React ,{useState , useEffect}from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

function RegisterAsProfessional(props) {
    const [cities,setCities] = useState([]);
      useEffect(()=>{
          axios.get(`http://52.66.249.12:3002/cities`)
          .then((response)=>{
              setCities(response.data.cities);
          }).catch((err)=>{
              console.log(err);
          })
      },[]);

    const history = useHistory();
    const [city,setCity]=useState('');
    const [name,setName]=useState('');
    const [number,setNumber]=useState('');
    const [email,setEmail]=useState('');
    const [work,setWork]=useState('');
    const handleSubmit = e => {
     // Firebase1.database();
      e.preventDefault();
      if(city==""){
        document.getElementById('error-msg').innerHTML="Please select your city";
      }
     else if(name==""){
        document.getElementById('error-msg').innerHTML="Please enter your name";
      }
      else if(number==""){
        document.getElementById('error-msg').innerHTML="Please enter your phone number";
      }
      else if(email==""){
        document.getElementById('error-msg').innerHTML="Please enter your email";
      }
      else if(work==""){
        document.getElementById('error-msg').innerHTML="Please enter your work";
      }   
      else if( !( /^[a-zA-Z]{3,}(?: [a-zA-Z]+){0,2}$/.test(name) ))
            {
              document.getElementById('error-msg').innerHTML="Please enter valid name";
            }
           else if( !( /^[6789]\d{9}$/.test(number) ))
            {
              document.getElementById('error-msg').innerHTML="Please enter valid 10 digit phone number";
            }
            else if( !( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) ))
            {
              document.getElementById('error-msg').innerHTML="Please enter valid email";
            }
            else if(/^[0-9]+$/.test(work) || !(/^.{3,}$/.test(work)) || !work.replace(/\s/g, '').length )
            {
              document.getElementById('error-msg').innerHTML="Please enter valid work";
            }
            
            else
            {
           
              document.getElementById('error-msg').innerHTML="";
              
                // Firebase1.database().ref('Requests/').push({
                //   city:city,
                //   name: name,
                //   number:number,
                //   email: email,
                //   work:work
                // });
                const obj = {
                  city:city,
                  name: name,
                  number:number,
                  email:email,
                  work:work
                  
              };

                axios.post('http://52.66.249.12:3002/register-as-professional', obj)
            .then((res) => { alert("Thank you "+name + " we have recived your request");
                
            }).catch((error) => {
                console.log(error)
            });
              
          alert("Thank you " + name + " we have recived your request");
            let path = '/'; 
            history.push(path);
              }
        

    };
    
  
    return (
        <div>
<div class="bg1"></div>
        <div class="bg1 bg2"></div>
        <div class="bg1 bg3"></div>
<div class="">

        <div class="">
        <div class="  grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 " >
         <div class=" place-self-center  font-sans tracking-tighter">
             <h1 class=" text-4xl  tracking-tighter font-bold">Earn More. Earn Respect.</h1>
             <h1 class="text-4xl tracking-tighter font-bold">Safety Ensured.</h1>
             <p class="text-gray-500 text-2xl tracking-tighter">Join 30,000+ partners across India</p>
               {/* <p class="text-gray-500 text-2xl tracking-tighter">Singapore and the UAE</p>    */}
         </div>
    
        <div>
            <img src="../img.png" alt=""/>
        </div>
    </div>
    
    
    
    
    
    <div class="justify-center flex">
     
      <div class=" rounded-xl bg-blue-600 	">
        
        <h2 class="pt-7 pb-3 text-3xl text-white justify-center flex">Start earning straight away. Share your details and we’ll reach out with next steps.</h2>
        <div class="mb-10 pt-5">
        
    <form onSubmit={(e) => handleSubmit(e)}>
    <div class=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-6 xl:grid-cols-6" >
   
  <select value={city} onChange={(e) => setCity(e.target.value)} class="mb-2 mr-1 ml-2 px-3 py-3 opacity-70	text-gray-800 relative bg-blue-100 rounded text-md">
  <option value="" >Select your City</option>
  {
    cities.map(option=>(
      <option value={option.name}>{option.name}</option>
    ))
  }
</select>
  
      <input type="text" value={name} onChange={(e) => setName(e.target.value)}    placeholder="Name" class="mb-2 mr-2 ml-2 opacity-70	 px-3 py-3 placeholder-gray-600 text-gray-800 relative bg-blue-100 rounded text-md border-0 shadow outline-none focus:outline-none focus:ring "/>
      <input type="tel" value={number} onChange={(e) => setNumber(e.target.value)}  placeholder="Your phone number" class="mr-2 ml-2 mb-2 opacity-70	 px-3 py-3 placeholder-gray-600 text-gray-600 relative bg-blue-100 rounded text-md border-0 shadow outline-none focus:outline-none focus:ring "/>
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}   placeholder="Email" class="opacity-70 mb-2	mr-2 ml-2 px-3 py-3 placeholder-gray-600 text-gray-600 relative bg-blue-100 rounded text-md border-0 shadow outline-none focus:outline-none focus:ring "/>
      <input type="text" value={work} onChange={(e) => setWork(e.target.value)}  placeholder="What do you do?" class="opacity-70 mr-2 ml-2 mb-2	 px-3 py-3 placeholder-gray-600 text-gray-600 relative bg-blue-100 rounded text-md border-0 shadow outline-none focus:outline-none focus:ring "/>
      <input type="submit" value="Get in Touch" name="Submit" className="font-bold  mb-2 mr-2 ml-2 px-3 py-3 text-blue-600 relative bg-white rounded text-md border-0 shadow outline-none focus:outline-none focus:ring hover:bg-gray-400" ></input>
      
      </div>
      </form>
      

    </div>
    <span id="error-msg" class="pb-3 text-3xl text-yellow-500 justify-center flex  "></span>

    </div>
    
    </div>
    
    </div>
    
    
    
    
    <div  class=" font-sans  ">
    <p class="justify-center mb-2 flex tracking-tighter  text-4xl font-bold text-gray-900	mt-20">Join Service HUB to change your life</p>
    <p  class="justify-center flex text-2xl text-gray-600 mb-7">Service HUB is an app-based marketplace that empowers professionals like you to become your own boss</p>
    </div >
    
    
    
    
    <div class="mb-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
    <div class=" pt-20 bg-user bg-right bg-no-repeat place-self-center ">
      <p class="text-gray-200 text-5xl font-bold">30,000+</p>
      <p class="font-bold" >Partners already on board</p>
    </div>
    <div class=" pt-20  bg-rupee bg-right bg-no-repeat  place-self-center ">
      <p class="text-gray-200  text-5xl font-bold">₹566Cr</p>
      <p class="font-bold">Paid out to partners in 2019</p>
    </div>
    <div class=" pt-20 bg-smile bg-right bg-no-repeat place-self-center ">
      <p class="text-gray-200 text-5xl font-bold">750,000+</p>
      <p class="font-bold">Services delivered each month </p>
    </div>
    
    </div>
    
    <div class=" m-20 border-solid flex justify-center items-center ">
       <div class=" bg-white border-2 border-gray-300 pt-20 pb-20 pl-40 pr-40  rounded-xl tracking-wide shadow-xl">
         <p class=" flex justify-center text-3xl font-semibold pb-2">Wondering who can Join? </p>
         <p class="place-self-center">If you have 1 year of related experiance in any of these fields, you can join service HUB</p>
         <div class="pt-10 grid grid-cols-2 gap-4 ">
            <img class="place-self-center" src="../c1.png" alt="cat-1"/>
            <img class="place-self-center" src="../c2.png" alt="cat-2"/>
         </div>
       </div>
    </div>
    
    </div>
    
    </div>
     );
  }

  export default RegisterAsProfessional;