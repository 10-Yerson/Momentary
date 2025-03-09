
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-white">
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 md:px-10 py-5">
        <div className="logo font-bold text-2xl">
          <img src="\img\logo.png" alt="Momentary Connect"
            className="w-16 h-16 object-cover"
          />
        </div>
        <div className="flex items-center">
          <a href="/auth/sign-in" className="mr-8 text-sm font-medium">LOGIN</a>
          <button className="text-3xl text-red-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="4" width="24" height="2" fill="currentColor" />
              <rect y="11" width="24" height="2" fill="currentColor" />
              <rect y="18" width="24" height="2" fill="currentColor" />
            </svg>
          </button>
        </div>
      </nav>
      <main className="relative min-h-screen flex flex-col justify-center px-5 md:px-10">
        <div className="flex items-center justify-around">
          <div className="w-full md:w-2/5 justify-center">
            <div className="mt-4 mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Momentary <br /> Connect
              </h1>
            </div>

            <p className="text-base max-w-md mb-6">
              Cada momento cuenta. Comparte el tuyo con el mundo, antes de que se pierda.
            </p>
            <Link href="/auth/sign-in">
              <button className="border-2 border-black rounded-full px-8 py-3 text-base font-medium">
                Explorar ahora
              </button>
            </Link>
          </div>
          <div className="w-1/2 relative hidden md:block">
            <div className="relative w-full h-96">
              <div className="relative w-full h-full">

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-96 rounded-full border border-gray-200 flex items-center justify-center">
                    <div className="w-80 h-80 rounded-full border border-gray-200 flex items-center justify-center">
                      <div className="w-64 h-64 rounded-full border border-gray-200"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    src="\img\mv.png"
                    alt="Skateboarder"
                    className="object-contain w-[450px] h-[450px]"
                  />
                </div>

                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 bg-red-600 transform rotate-45"></div>
                </div>

                <div className="absolute bottom-1/4 right-0 transform translate-x-1/2">
                  <div className="w-4 h-4 bg-red-600 transform rotate-45"></div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}