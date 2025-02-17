'use client'

import { MyProvider, useState } from '../context/MyContext';
import UserPanel from '../components/Dasboard/siderbar'
import NotFriends from '../components/Amistades/NotFriends';
import Jireh from '../components/Amistades/Jireh';
export default function ViewPublication() {

    return (
        <MyProvider>
            <UserPanel />
            <div className='flex overflow-hidden select-none md:ml-40 ml-0 flex-1 md:flex-row'>
                <NotFriends />
                <Jireh/>
            </div>
        </MyProvider>
    );
}
