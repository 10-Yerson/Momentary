import ProfileInfo from '../components/Perfil/ProfileInfo';
import PostBox from '../components/Perfil/PostBox';
import PublicationGetting from '../components/Perfil/publication';
import UserPanel from '../components/Dasboard/siderbar'


export default function ProfilePage() {
  return (
    <>
      <UserPanel />
      <main className='flex overflow-hidden select-none md:ml-40 ml-0 flex-1 sm:mb-24 md:mb-0 lg:mb-0'>
        <div className="container mx-auto px-4 py-4">
          <ProfileInfo />
          <PostBox />
          <PublicationGetting />
        </div>
      </main>
    </>
  );
}
