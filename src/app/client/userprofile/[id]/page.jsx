'use client';

import ProfileHeader from './components/ProfileHeader';
import ProfileBio from './components/ProfileBio';
import ProfileTabs from './components/ProfileTabs';
import ProfilePost from './components/ProfilePost';
import { MyProvider } from '../../context/MyContext';
import UserPanel from '../../components/Dasboard/siderbar';

const UserProfile = () => {
  return (
    <MyProvider>
      <UserPanel />
      <main className='flex overflow-hidden select-none md:ml-40 ml-0 flex-1 flex-col mb-24 lg:mb-0'>
        <ProfileHeader />
        <ProfileBio />
        <ProfileTabs />
        <ProfilePost />
      </main>
    </MyProvider>

  );
};

export default UserProfile;
