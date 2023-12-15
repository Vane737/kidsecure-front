import React from 'react';
import { UserIcon, BellAlertIcon, ArrowRightCircleIcon, IdentificationIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, subtitle, icon, color, route }) => {
  const navigation = useNavigate();

  const handleCardClick = () => {
    navigation(route); // Redirige a la ruta proporcionada
  };

  return (
    <div className={`bg-${color} rounded-md mb-10 shadow-md text-white cursor-pointer`} onClick={handleCardClick}>
      <div className="flex justify-between items-center m-10">
        <div>
          <p className="text-lg font-semibold text-gray-700">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{subtitle}</p>
        </div>
        <div className={`bg-${color}-300 mt-5 text-${color}-700 px-3 rounded-full mr-4`}>
          {icon}
        </div>
      </div>
      <div className={`bg-${color}-500 w-full h-10 text-center rounded-b-md flex justify-center items-center`}>
        <ArrowRightCircleIcon className='w-6 h-6' />
        &nbsp;
        Ver más..
      </div>
    </div>
  );
};

export const Dashboard = () => {
  return (
    <div className="w-full p-10 container h-60 grid grid-cols-3 gap-6">
      <Card title="Administrar niños" subtitle="57 inscritos" icon={<UserIcon className="w-10 h-10" />} color="customGreen" route="/niños" />
      <Card title="Identificación de actos de violencia" subtitle="Verificar contenido" icon={<BellAlertIcon className="w-10 h-10" />} color="customPink" route="/deteccion/realtime" />
      <Card title="Administra tus contactos" subtitle="" icon={<IdentificationIcon className="w-10 h-10" />} color="secondary" route="/contacto" />
    </div>
  );
};
