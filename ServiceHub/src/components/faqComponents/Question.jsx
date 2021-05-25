import React ,{ useState }from 'react';
import {AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const Question=({title,info}) => {
    const[showInfo,setShowInfo]=useState(false);
return (
  <div class="p-4">
    <article className="question">
    <div class="flex sm:grid grid-cols-3  ">
    
        <div class="text-xl font-bold sm:col-span-2  ">
        {title}
        </div>
        <div class="order-last">
        <button className="btn" onClick={()=>setShowInfo(!showInfo)}>
            {showInfo ? <AiOutlineMinus/> :<AiOutlinePlus/>}
        </button>
        </div>
        
   
    </div>
    <div>
    {showInfo && <p> {info} </p>}
    </div>
   
</article>
</div>)
};

export default Question;

