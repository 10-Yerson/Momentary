'use client'

import { useState, useEffect } from 'react';
import axios from '../../../../utils/axios';
import Createpublication from '../Modal/Createpublication';

export default function PostBox() {
 
  const [isModalOpen, setModalOpen] = useState(false);
  
    return (
      <div className="mt-4 bg-white rounded">
        <div className="flex items-center space-x-4">
          <img  onClick={() => setModalOpen(true)}
            alt="User profile picture"
            className="h-10 w-10  object-cover opacity-95"
            src="\img\icons\gallery.png"
          />
          <input onClick={() => setModalOpen(true)}
            className="w-full p-2 bg-gray-50 rounded-full"
            placeholder="Crea una publicación..."
            type="text"  readOnly 
          />
          <Createpublication isOpen={isModalOpen} onClose={() => setModalOpen(false)}/>
        </div>
      </div>
    );
  }
  