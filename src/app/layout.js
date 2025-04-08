import { Inter } from "next/font/google";
import "./globals.css";
import { MyProvider } from '../context/MyProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Momentary - Red social para compartir fotos y mensajes",
  description: "Conecta con amigos, comparte tus momentos especiales, envía mensajes y sigue a personas interesantes en Momentary, la nueva red social que estabas esperando.",
  keywords: "Momentary, red social, compartir fotos, mensajería, publicaciones, momentos, aplicación social",
  robots: "index, follow",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Momentary - Comparte tus momentos especiales",
    description: "Conecta con amigos, comparte fotos y mensajes en Momentary, la red social para momentos especiales",
    type: "website",
    locale: "es_ES",
    url: "https://momentary-indol.vercel.app/",
    siteName: "Momentary",
    images: [
      {
        url: "/og-image.png", // Reemplaza con la ruta real de tu imagen
        width: 1200,
        height: 630,
        alt: "Momentary Red Social",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momentary - Red social para compartir momentos",
    description: "Mensajería, fotos y conexiones sociales en una sola aplicación",
    images: ["/twitter-image.jpg"], // Reemplaza con la ruta real de tu imagen
  },
  alternates: {
    canonical: "https://momentary-indol.vercel.app/",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <MyProvider>
        <body className={inter.className}>{children}</body>
      </MyProvider>
    </html>
  );
}