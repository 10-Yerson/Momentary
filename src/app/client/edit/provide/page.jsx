import UserPanel from '../../components/Dasboard/siderbar'
import EditPerfil from '../../components/Perfil/EditPerfil'

export default function page() {
    return (

        <div>
            <UserPanel />
            <main className="flex overflow-hidden select-none md:ml-40 ml-0 flex-1">
               <EditPerfil/>
            </main>
        </div>

    )
}
