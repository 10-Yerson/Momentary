import UserPanel from '../components/Dasboard/siderbar'
import AddNotifications from '../components/Notificaciones/add'
import Notification from '../components/Notificaciones/notificaciones'

export default function Notificaciones() {
  return (
    <div>
      <UserPanel/>
        <main className="flex overflow-hidden select-none md:ml-40 ml-0 flex-1 md:flex-row">
           <Notification/>
           <AddNotifications/>
        </main>
    </div>
  )
}
