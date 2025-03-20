import UserPanel from '../components/Dasboard/siderbar'
import AddNotifications from '../components/Notificaciones/add'
import Notification from '../components/Notificaciones/notificaciones'
import Layout from '../layout/Layout'

export default function Notificaciones() {
  return (
    <Layout>
        <main className="mb-24 lg:mb-0 flex">
           <Notification/>
           <AddNotifications/>
        </main>
    </Layout>
  )
}
