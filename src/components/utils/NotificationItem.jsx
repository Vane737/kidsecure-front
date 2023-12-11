/* eslint-disable react/prop-types */
// import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { InformationCircleIcon } from '@heroicons/react/24/solid';
import Default from '../../assets/img/default.jpg';

// import PropTypes from "prop-types";

const NotificationItem = ({ notification }) => {
  const { id: currentId } = useParams();

  const handleNotificationClick = () => {
    // Pasa el ID de la notificación al hacer clic
    console.log('Abrir notificación con ID:', currentId);
    // Añade la lógica para abrir la nueva pestaña con el ID de la notificación
  };

  return (
    <div className="flex items-center p-4 border-b">
      {/* Icono de la notificación (puedes cambiarlo según tus necesidades) */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={Default} // Reemplaza con la ruta a tu ícono
          alt="Notification Icon"
          className="h-8 w-8"
        />
      </div>

      {/* Contenido de la notificación */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{notification.title ? notification.title : "Se ha identificado un acto de violencia"}</h3>
        <p className="text-sm text-gray-500">{notification.description ? notification.description : "Visualiza y confirma que si es un acto de violencia"}</p>
      </div>

      {/* Enlace para abrir una nueva pestaña */}
      <button
        onClick={handleNotificationClick}
        className="ml-4 text-blue-500 hover:underline focus:outline-none"
      >
        <InformationCircleIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NotificationItem;

// NotificationItem.proptypes = {
    // notification: PropTypes.object.isRequired,
    // description: PropTypes.string.isRequired,
//   };
  