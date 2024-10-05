'use client'

import { MyProvider, useState } from '../context/MyContext';
import UserPanel from '../components/Dasboard/siderbar'
import NotFriends from '../components/Amistades/NotFriends';
export default function ViewPublication() {

    return (
        <MyProvider>
            <UserPanel />
            <div className='flex overflow-hidden select-none ml-32 flex-1'>
                <NotFriends />
            </div>
        </MyProvider>
    );
}
