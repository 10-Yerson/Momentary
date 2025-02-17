'use client'

import { MyProvider, useState } from '../context/MyContext';
import UserPanel from '../components/Dasboard/siderbar'
import Adiction from '../components/Perfil/adiction';

export default function ViewPublication() {

    return (
        <>
            <UserPanel />
            <div className='flex overflow-hidden select-none md:ml-40 ml-0 flex-1 md:flex-row'>
                <Adiction/>
            </div>
        </>
    );
}
