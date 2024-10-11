import React from 'react'
import UserPanel from '../components/Dasboard/siderbar'
import PublicationForm from '../components/publication'
import CreatePublication from '@/components/CreatePublication'

export default function page() {
    return (
        <div>
            <UserPanel />
            <main className="flex overflow-hidden select-none md:ml-40 ml-0 flex-1">
                <CreatePublication/>
            </main>
        </div>
    )
}
