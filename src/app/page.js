"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      title: "Mensajes en Tiempo Real",
      description: "Chatea con tus amigos al instante. Sin esperas, sin retrasos. Conexión directa y fluida.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Comparte Momentos",
      description: "Publica fotos, videos y pensamientos. Captura cada instante y compártelo con el mundo.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Sigue a Creadores",
      description: "Descubre nuevas personas, sigue a tus creadores favoritos y construye tu comunidad.",
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      title: "Contenido Multimedia",
      description: "Comparte videos, historias y transmisiones en vivo. Tu creatividad sin límites.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Usuarios activos" },
    { number: "500K+", label: "Momentos compartidos" },
    { number: "1M+", label: "Mensajes enviados" },
    { number: "99.9%", label: "Uptime garantizado" },
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Fotógrafa",
      text: "Momentary Connect cambió la forma en que comparto mis fotos. La interfaz es hermosa y mis seguidores pueden interactuar de forma única.",
      avatar: "MG",
    },
    {
      name: "Carlos Ruiz",
      role: "Streamer",
      text: "Los mensajes en tiempo real son increíbles. Puedo conectar con mi comunidad de una manera que ninguna otra plataforma me ofrece.",
      avatar: "CR",
    },
    {
      name: "Ana Martínez",
      role: "Artista Digital",
      text: "La mejor red social que he usado. El diseño es elegante y las funciones son exactamente lo que necesitaba para mi portafolio.",
      avatar: "AM",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 md:px-10 py-4 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
            <img
              src="https://res.cloudinary.com/dbgj8dqup/image/upload/v1742924929/uploads/zlcd4yniy0jjuco86crr.png"
              alt="Momentary Connect"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="hidden sm:block text-xl font-bold tracking-tight">
            Momentary<span className="text-red-600">.</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Características
          </a>
          <a href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Testimonios
          </a>
          <a href="#about" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
            Sobre Nosotros
          </a>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/auth/sign-in"
            className="hidden sm:block text-sm font-medium px-4 py-2 hover:text-red-600 transition-colors"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/auth/sign-up"
            className="hidden sm:block bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-red-600 transition-colors duration-300"
          >
            Registrarse
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-black p-2"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <rect y="4" width="24" height="2" fill="currentColor" />
                  <rect y="11" width="24" height="2" fill="currentColor" />
                  <rect y="18" width="24" height="2" fill="currentColor" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">
              Características
            </a>
            <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">
              Testimonios
            </a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-2xl font-semibold">
              Sobre Nosotros
            </a>
            <hr className="border-gray-200" />
            <Link href="/auth/sign-in" className="text-xl font-medium">
              Iniciar Sesión
            </Link>
            <Link
              href="/auth/sign-up"
              className="bg-black text-white text-center text-lg font-medium px-6 py-4 rounded-full"
            >
              Registrarse
            </Link>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative min-h-screen flex flex-col justify-center px-5 md:px-10 pt-24">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="relative flex flex-col md:flex-row items-center justify-around gap-8">
          <div className="w-full md:w-2/5 justify-center">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></span>
              <span className="text-xs font-medium text-red-600">Nueva versión disponible</span>
            </div>

            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Momentary <br />
                <span className="text-red-600">Connect</span>
              </h1>
            </div>

            <p className="text-base md:text-lg text-gray-600 max-w-md mb-8 leading-relaxed">
              Cada momento cuenta. Comparte el tuyo con el mundo, conecta con personas increíbles y
              construye tu comunidad antes de que se pierda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/sign-up">
                <button className="w-full sm:w-auto bg-black text-white rounded-full px-8 py-4 text-base font-medium hover:bg-red-600 transition-colors duration-300 shadow-lg shadow-black/10">
                  Comenzar gratis
                </button>
              </Link>
              <Link href="/auth/sign-in">
                <button className="w-full sm:w-auto border-2 border-gray-200 rounded-full px-8 py-4 text-base font-medium hover:border-black transition-colors duration-300">
                  Explorar ahora
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {["A", "B", "C", "D"].map((letter, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-black">10,000+</span> personas ya se unieron
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="w-full md:w-1/2 relative">
            <div className="relative w-full h-[400px] md:h-[550px]">
              {/* Decorative circles */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-gray-100 flex items-center justify-center">
                  <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-gray-100 flex items-center justify-center">
                    <div className="w-[240px] h-[240px] md:w-[300px] md:h-[300px] rounded-full border border-gray-100"></div>
                  </div>
                </div>
              </div>

              {/* Main image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/img/mv.png"
                  alt="Skateboarder"
                  className="object-contain w-[320px] h-[320px] md:w-[450px] md:h-[450px] drop-shadow-2xl"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute top-8 left-0 md:left-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Nuevos likes</p>
                  <p className="text-sm font-bold">+1,234</p>
                </div>
              </div>

              <div className="absolute bottom-16 right-0 md:right-4 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Mensajes</p>
                  <p className="text-sm font-bold">+567 hoy</p>
                </div>
              </div>

              {/* Red diamonds */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-red-600 transform rotate-45"></div>
              </div>
              <div className="absolute bottom-1/4 right-0 transform translate-x-1/2">
                <div className="w-4 h-4 bg-red-600 transform rotate-45"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs text-gray-400">Scroll</span>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </main>

      {/* Stats Section */}
      <section className="py-16 md:py-20 px-5 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl md:text-5xl font-bold text-black mb-2">{stat.number}</p>
              <p className="text-sm md:text-base text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Características</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              Todo lo que necesitas <br className="hidden md:block" />
              en un solo lugar
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Diseñado para conectar personas de forma auténtica. Descubre todo lo que Momentary
              Connect tiene para ofrecerte.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white border border-gray-100 rounded-3xl p-8 hover:border-red-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-5 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 md:py-28 px-5 md:px-10 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">Testimonios</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-3 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Miles de personas ya están creando momentos inolvidables en nuestra plataforma.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="about" className="py-20 md:py-28 px-5 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-black rounded-[2.5rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600 rounded-full blur-3xl opacity-20"></div>

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                ¿Listo para empezar?
              </h2>
              <p className="text-gray-300 mb-10 max-w-xl mx-auto text-lg">
                Únete a miles de personas que ya están compartiendo sus momentos. Es gratis y solo
                toma un minuto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/sign-up">
                  <button className="w-full sm:w-auto bg-red-600 text-white rounded-full px-10 py-4 text-base font-medium hover:bg-red-700 transition-colors duration-300">
                    Crear cuenta gratis
                  </button>
                </Link>
                <Link href="/auth/sign-in">
                  <button className="w-full sm:w-auto border-2 border-white/20 text-white rounded-full px-10 py-4 text-base font-medium hover:bg-white/10 transition-colors duration-300">
                    Iniciar sesión
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="https://res.cloudinary.com/dbgj8dqup/image/upload/v1742924929/uploads/zlcd4yniy0jjuco86crr.png"
                alt="Momentary Connect"
                className="w-10 h-10 object-cover"
              />
              <span className="font-bold">
                Momentary<span className="text-red-600">.</span>
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              <a href="#" className="hover:text-black transition-colors">Privacidad</a>
              <a href="#" className="hover:text-black transition-colors">Términos</a>
              <a href="#" className="hover:text-black transition-colors">Contacto</a>
              <a href="#" className="hover:text-black transition-colors">Ayuda</a>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Momentary Connect
            </p>
          </div>
        </div>
      </footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 4s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}