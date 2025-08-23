
import { features } from "../constants"




export function Features() {
  return (
    <div className="relative mt-20 border-b border-neutral-700 min-h-[800px] ">

      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
            feature
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide leading-14">Organize your digital knowledge

            <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
                {" "} effortlessly
            </span>
        </h2>
      </div>

<div className="flex flex-wrap mt-10 lg:mt-20">
    {features.map((feature, index) => (
        <div key={index} className="w-full sm:w-1/2 lg:w-1/3">
            <div className="flex">
                <div className="flex mx-6 h-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full">
                    {feature.icon}
                </div>
                <div>
                    <h1 className="mt-1 mb-6 text-xl">{feature.text}</h1>

                    <p className="text-md p-2 mb-20">{feature.description}</p>
                </div>
            </div>
             </div>
    ))}
</div>

    </div>
  )
}

