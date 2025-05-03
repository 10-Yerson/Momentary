'use client'
import React, { useState, useEffect } from 'react'

const verses = [
  '"El Señor es mi pastor, nada me faltará." — Salmo 23:1',
  '"Todo lo puedo en Cristo que me fortalece." — Filipenses 4:13',
  '"No temas, porque yo estoy contigo." — Isaías 41:10',
  '"Ama a tu prójimo como a ti mismo." — Marcos 12:31',
  '"Porque yo sé los planes que tengo para vosotros." — Jeremías 29:11'
]

export default function CompanyFollowers() {
  const [verse, setVerse] = useState('')
  
  useEffect(() => {
    const randomVerse = verses[Math.floor(Math.random() * verses.length)]
    setVerse(randomVerse)
  }, [])
  
  return (
    <div className="hidden md:flex md:w-1/2 h-screen sticky top-0 items-center justify-center py-4 px-2 ">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Reflexión del Día 🧠
        </h1>
        <p className="text-center text-lg text-gray-600 mt-4 px-4 italic">
          {verse}
        </p>
      </div>
    </div>
  )
}