'use client';

import ProfileHeader from './components/ProfileHeader';
import ProfileBio from './components/ProfileBio';
import ProfileTabs from './components/ProfileTabs';
import ProfilePost from './components/ProfilePost';
import { MyProvider } from '../../context/MyContext';
import Layout from '../../layout/Layout'

const UserProfile = () => {
  return (
    <MyProvider>
      <Layout>
        <main className='overflow-hidden flex-col mb-24 lg:mb-0'>
          <ProfileHeader />
          <ProfileBio />
          <ProfileTabs />
          <ProfilePost />
        </main>
      </Layout>
    </MyProvider>

  );
};

export default UserProfile;
