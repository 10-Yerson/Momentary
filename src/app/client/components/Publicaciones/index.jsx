import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios'; // Ajusta la ruta según la ubicación del archivo de configuración de Axios

export default function SeguidoresPublication() {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const response = await axios.get('api/publication/following');
                setPublications(response.data);
                console.log('Data Publication', response.data);
            } catch (err) {
                setError('Error fetching publications');
                console.error('Error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
      
            <div className="lg:w-[50%] md-[80%] w-[95%] flex justify-center flex-col">
                {publications.map((publication) => (
                    <div
                        key={publication._id}
                        className="bg-white border border-gray-300 rounded-lg shadow-md mb-6"
                    >
                        {/* User info */}
                        <div className="flex items-center p-4">
                            <img
                                src={publication.user.profilePicture}
                                alt={publication.user.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <div className="ml-3">
                                <h2 className="font-semibold text-sm">{publication.user.name}</h2>
                                <span className="text-xs text-gray-500">
                                    {new Date(publication.createdAt).toLocaleString()}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="px-4 pb-2">
                            <p className="mt-2 text-sm">
                                <span className="font-semibold mr-2">{publication.user.name}</span>
                                {publication.description}
                            </p>
                        </div>

                        {/* Image */}
                        <div className="w-full">
                            <img src={publication.image} alt="Publication" className="w-full object-cover" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between px-4 py-2">
                            <div className="flex space-x-4">
                                <button className="focus:outline-none">
                                    <img src="/icons/like-icon.svg" alt="Like" className="w-6 h-6" />
                                </button>
                                <button className="focus:outline-none">
                                    <img src="/icons/comment-icon.svg" alt="Comment" className="w-6 h-6" />
                                </button>
                                <button className="focus:outline-none">
                                    <img src="/icons/share-icon.svg" alt="Share" className="w-6 h-6" />
                                </button>
                            </div>
                            <button className="focus:outline-none">
                                <img src="/icons/save-icon.svg" alt="Save" className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Likes and Timestamp */}
                        <div className="px-4 pb-2">
                            <p className="text-sm font-semibold mb-1">{publication.likes.toLocaleString()} Me gusta</p>
                            <span className="text-xs text-gray-500">
                                {new Date(publication.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
    );
}
