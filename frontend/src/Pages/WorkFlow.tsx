
import codeImg from "/public/images/code.jpg"
import { checklistItems } from '../constants'
import { CheckCircle2 } from 'lucide-react'

function WorkFlow() {
  return (
    <div className='mt-20'>

        <h2 className='text-3xl sm:text-5xl lg:text-6xl text-center mt-4 tracking-wide leading-15 mb-4 '>
           Supercharge your {" "}

            <span className='bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'>
                learning workflow
            </span>
        </h2>

        <div className='flex flex-wrap justify-center'>

            <div className='p-2 w-full lg:w-1/2 '>
         <img className="rounded-lg" src={codeImg} alt="" />
            </div>

<div className='pt-12 w-full lg:w-1/2'>
{checklistItems.map((item, index) => (
    <div key={index} className='flex mb-12'>
        <div className='text-green-400 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full mr-3'>
            <CheckCircle2/>
        </div>
        <div>
            <h5 className='mt-1 mb-2 text-xl'>{item.title}</h5>

            <p className='text-md text-neutral-500'>{item.description}</p>
        </div>
    </div>
))}
</div>

        </div>
     
    </div>
  )
}

export default WorkFlow