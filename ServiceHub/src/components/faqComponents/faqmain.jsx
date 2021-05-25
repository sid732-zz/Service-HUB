import React, { useState}  from 'react';
import data from './data';
import SingleQuestion from './Question';

function Faqmain() {
    const [questions,setQuestions] = useState(data);
    return (
        <div class="ml-8 mr-8 p-3 grid cols-1  sm:grid-cols-3" >

            <div class="text-2xl font-bold bg-indigo-200 rounded-xl text-center p-6 rounded-b-none sm:rounded-r-none   ">
              <h3> Frequently Asked Questions</h3>
            </div>

            <div class=" bg-white rounded-xl rounded-t-none sm:col-span-2   rounded-l-none ">
              <section className="info">
                {questions.map((question)=>{
                    return <SingleQuestion key={question.id} {...question} ></SingleQuestion>
                })}
               </section>
            </div>
            
            
        </div>
    )
}

export default Faqmain;
