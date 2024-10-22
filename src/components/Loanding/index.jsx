import Link from 'next/link'
import './main.css'

export default function Loandig() {
  return (

    <div className=" h-[90vh] flex flex-col justify-end">
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className='w-full flex'>
        <div className='w-[50vw] p-[10vh] pl-[4vw]'>
          <a href="/auth/sign-in">
            <button className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md text-white">
              Ingresar
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
