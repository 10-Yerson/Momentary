import React from 'react'
import Provider from '../../components/Perfil/provide'
import UserPanel from '../../components/Dasboard/siderbar'



export default function page() {
  return (
    <div>
      <UserPanel />
      <main className="flex overflow-hidden select-none md:ml-40 ml-0 flex-1">
        <Provider />
      </main>
    </div>

  )
}
