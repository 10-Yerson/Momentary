import React from "react";

export default function Loading() {
    return (
        <>
            <div className="bg-white z-50 flex items-center justify-center w-full min-h-screen hidden md:flex">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-50 animate-ping"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="z-50 absolute inset-0 flex items-center justify-center w-full h-full flex md:hidden">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="relative w-20 h-20">
                            <div className="absolute inset-0 rounded-full border-4 border-blue-500 opacity-50 animate-ping"></div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
