'use client'

import { MyProvider, useState } from '../context/MyContext';
import UserPanel from '../components/Dasboard/siderbar'
import NotFriends from '../components/Amistades/NotFriends';
import Jireh from '../components/Amistades/Jireh';
import Layout from '../layout/Layout'

export default function ViewPublication() {

    return (
        <MyProvider>
            <Layout>
                <div className='flex overflow-hidden md:flex-row'>
                    <NotFriends />
                    <Jireh />
                </div>
            </Layout >
        </MyProvider>
    );
}
