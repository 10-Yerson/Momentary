'use client'

import { MyProvider, useState } from '../context/MyContext';
import UserPanel from '../components/Dasboard/siderbar'
import Amigos from '../components/Amistades/friends';
export default function ViewPublication() {

    return (
        <MyProvider>
            <UserPanel />
            <div className='flex overflow-hidden select-none md:ml-40 ml-0 flex-1'>
                <Amigos/>
            </div>
        </MyProvider>
    );
}
