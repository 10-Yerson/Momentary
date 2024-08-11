import Link from 'next/link'
import './zcss.css'

export default function Loandig() {
  return (
    <div className='Content-Loandig'>
      <div className='flex flex-col h-[90vh] justify-end pl-[4vw] pb-[5vh] w-[50vw]'>
        <Link href="/auth/sign-in">
          <button class="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
            Ingresar
          </button>
        </Link>
      </div>
      <div className='grid place-content-center h-[90vh] w-[50vw]'>
        <div class="relative flex justify-center h-[300px] w-[160px] border border-4 border-black rounded-2xl bg-gray-50">
          <span class="border border-black bg-black w-20 h-2 rounded-br-xl rounded-bl-xl"></span>
          <span class="absolute -right-2 top-14 border border-4 border-black h-7 rounded-md"></span>
          <span class="absolute -right-2 bottom-36 border border-4 border-black h-10 rounded-md"></span>
        </div>
      </div>
    </div>
  )
}
