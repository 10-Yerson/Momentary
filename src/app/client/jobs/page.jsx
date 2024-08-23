import React from 'react'
import UserPanel from '../components/Dasboard/siderbar'

export default function page() {
  return (
    <div>
        <UserPanel/>
        <main class="h-screen flex overflow-hidden select-none ml-32 flex-1">
          <div class="flex flex-col capitalize text-3xl">
            <span class="font-semibold">hello,</span>
            <span>jobs</span>
          </div>
        </main>
      
    </div>
  )
}
