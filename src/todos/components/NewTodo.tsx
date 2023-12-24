'use client';

import { FormEvent, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import * as todoApi from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';

export const NewTodo = () => {
  const router = useRouter();
  const [description, setDescription] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (description.trim().length === 0) {
      return;
    }

    await todoApi.createTodo(description);
    setTimeout(() => {
      setDescription('');
    }, 100);
    router.refresh();
  };

  const deleteCompleted = async () => {
    await todoApi.deleteCompleted();
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="p-6 bg-gray-100 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-grow">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 bg-white border-0 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Nueva tarea..."
          />
        </div>
        <button type="submit" className="px-6 py-2 bg-gradient-to-r from-sky-600 to-cyan-400  text-white rounded-md shadow-sm">
          Agregar
        </button>
        <button
          type="button"
          onClick={deleteCompleted}
          className="flex items-center gap-2 p-2 bg-gradient-to-r from-red-600 to-red-400 rounded-md text-white  shadow-sm"
        >
          <IoTrashOutline size={24} />
          <span>Eliminar completados</span>
        </button>
      </div>
    </form>
  );
};
