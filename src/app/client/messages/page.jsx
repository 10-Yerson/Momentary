import UserPanel from '@/components/Dasboard'
import React from 'react'

export default function page() {
  return (
    <div>
        <UserPanel/>
        <main class="my-1 pt-2 pb-2 px-10 flex-1 bg-gray-200 dark:bg-black rounded-l-lg
		transition duration-500 ease-in-out overflow-y-auto">
          <div class="flex flex-col capitalize text-3xl">
            <span class="font-semibold">hello,</span>
            <span>tempest!</span>

          </div>
          

        </main>
    </div>
  )
}
