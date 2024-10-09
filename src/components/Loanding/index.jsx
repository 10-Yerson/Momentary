import Link from 'next/link'
import './main.css'

export default function Loandig() {
  return (

    <div className="relative h-[90vh] flex flex-col justify-end">
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
      <div className='w[100vw] flex'>
        <div className='w-[50vw] p-[5vh] pl-[4vw]'>
          <a href="/auth/sign-in">
            <button className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
              Ingresar
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}
