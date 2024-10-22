
import UserPanel from '../components/Dasboard/siderbar'

export default function page() {

  return (
    <div>
      <UserPanel />
      <main className="flex overflow-hidden select-none md:ml-40 ml-0 flex-1">
        <div className="h-screen flex justify-center items-center w-full">
          <div className="text-center">
            <h1 className="lg:text-3xl text-2xl font-semibold text-gray-800 mb-4">Mensajes en etapa de desarrollo 💻</h1>
            <p className="text-lg text-gray-600">Estamos trabajando en esta sección. ¡Pronto estará disponible!</p>
          </div>
        </div>
      </main>
    </div>
  )
}
