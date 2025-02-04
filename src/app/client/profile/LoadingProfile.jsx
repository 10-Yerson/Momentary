export default function LoadingProfile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  dark:bg-gray-800">
      <div
        className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-black mb-6"
      ></div>
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white mt-4">
        Preparando tu espacio...
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
        Tu perfil estará listo en un instante.
      </p>
      <div className="mt-6">
        <div className="w-32 h-1 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
    </div>

  );
}
