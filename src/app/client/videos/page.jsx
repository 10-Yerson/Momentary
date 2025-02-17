'use client'

import UserPanel from '../components/Dasboard/siderbar'
import Videos from '../components/Amistades/videos';
export default function ViewPublication() {

    return (
        <>
            <UserPanel />
            <div className='flex overflow-hidden select-none md:ml-40 ml-0 flex-1'>
                <Videos/>
            </div>
        </>
    );
}
