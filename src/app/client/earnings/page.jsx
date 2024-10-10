import React from 'react'
import UserPanel from '../components/Dasboard/siderbar'
import PublicationForm from '../components/publication'
import CreatePublication from '@/components/CreatePublication'

export default function page() {
    return (
        <div>
            <UserPanel />
            <main class="flex overflow-hidden select-none ml-40 flex-1">
                <CreatePublication/>
            </main>
        </div>
    )
}
