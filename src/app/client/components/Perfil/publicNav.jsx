'use client'

import { useState } from "react";
import { FaBookmark, FaImages, FaTag } from "react-icons/fa";
import SavePublication from "./guardado";
import EtiquetaPublication from "./etiqueta";
import PublicationGetting from "./publication";

export default function PublicNav() {
    const [activeTab, setActiveTab] = useState("posts");

    return (
        <div className="mt-4">
            <div className="flex border-b w-full justify-around">
                <button
                    className={`pb-2 flex items-center gap-2 ${activeTab === "posts" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab("posts")}
                >
                    <FaImages />
                    <span className="hidden sm:inline">Publicaciones</span>
                </button>
                <button
                    className={`pb-2 flex items-center gap-2 ${activeTab === "saved" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab("saved")}
                >
                    <FaBookmark />
                    <span className="hidden sm:inline">Guardado</span>
                </button>
                <button
                    className={`pb-2 flex items-center gap-2 ${activeTab === "tagged" ? "border-b-2 border-black text-black" : "text-gray-500"}`}
                    onClick={() => setActiveTab("tagged")}
                >
                    <FaTag />
                    <span className="hidden sm:inline">Etiquetas</span>
                </button>
            </div>
            <div>
                {activeTab === "posts" && <PublicationGetting />}
                {activeTab === "saved" && <SavePublication />}
                {activeTab === "tagged" && <EtiquetaPublication />}
            </div>
        </div>
    );
}
