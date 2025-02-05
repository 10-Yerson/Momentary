'use client'

import { useState } from "react";
import { FaTh, FaBookmark, FaUserTag } from "react-icons/fa";
import SavePublication from "./guardado";
import EtiquetaPublication from "./etiqueta";
import PublicationGetting from "./publication";

export default function PublicNav() {

    const [activeTab, setActiveTab] = useState("posts");
    return (
        <div className="border-t border-gray-300 mt-4">
            <div className="flex justify-center items-center gap-8 py-3 relative bg-white rounded-t-lg">
                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${activeTab === "posts" ? "bg-gray-100 text-black font-semibold" : "text-gray-500 hover:bg-gray-200"
                        }`}
                    onClick={() => setActiveTab("posts")}
                >
                    <FaTh className="text-lg" /> <span className="hidden md:inline">Publicaciones</span>
                </button>

                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${activeTab === "saved" ? "bg-gray-100 text-black font-semibold" : "text-gray-500 hover:bg-gray-200"
                        }`}
                    onClick={() => setActiveTab("saved")}
                >
                    <FaBookmark className="text-lg" /> <span className="hidden md:inline">Guardados</span>
                </button>

                <button
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${activeTab === "tagged" ? "bg-gray-100 text-black font-semibold" : "text-gray-500 hover:bg-gray-200"
                        }`}
                    onClick={() => setActiveTab("tagged")}
                >
                    <FaUserTag className="text-lg" /> <span className="hidden md:inline">Etiquetados</span>
                </button>
            </div>

            <div>
                {activeTab === "posts" && <PublicationGetting />}
                {activeTab === "saved" && <SavePublication/>}
                {activeTab === "tagged" && <EtiquetaPublication/>}
            </div>
        </div>
    )
}
