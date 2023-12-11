import { useRef } from "react"

export default function Modal({open, closeModal, children}){

    const ref = useRef(null)

    function handleClick(e){
        if(ref.current && !ref.current.contains(e.target)){
            closeModal(false)
        }

    }

    return(
        <div onClick={(e) => handleClick(e)} className={`${open ? 'block' : 'hidden'} flex justify-center items-center p-4 absolute top-0 left-0 w-full h-full bg-gray-300/75`}>
            <div ref={ref} className="overflow-y-scroll h-fit max-h-full bg-white rounded-lg p-4 md:p-8 w-full md:w-2/3 relative">
            <i onClick={() => closeModal(false)} className="fa-solid fa-xmark absolute cursor-pointer text-black top-2 right-2 text-2xl"></i>
                {children}
            </div>
        </div>
    )
}