import UserPanel from '../../components/Dasboard/siderbar'
import EditPerfil from '../../components/Perfil/EditPerfil'
import Layout from '../layout/Layout'

export default function page() {
    return (
        <Layout>
            <div className='mb-24 lg:mb-0'>
            <EditPerfil />
            </div>
        </Layout>

    )
}
