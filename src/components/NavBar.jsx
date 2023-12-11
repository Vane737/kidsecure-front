import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserCircleIcon, BellIcon } from '@heroicons/react/24/solid';
import { usePopper } from 'react-popper';
import NotificationItem from './utils/NotificationItem'; // Asegúrate de importar correctamente el componente NotificationItem

const NavBar = () => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const openNotification = () => {
    setNotificationOpen(!isNotificationOpen);
  };

  const notifications = [
    {
      id: 1,
      title: "Se ha identificado un acto de violencia",
      description: "Visualiza y confirma que sí es un acto de violencia"
    },
    {
      id: 2,
      title: "Nueva notificación",
      description: "Descripción de la nueva notificación"
    },
    // Agrega más notificaciones según sea necesario
  ];

  // Método simulado que devuelve la cantidad de notificaciones
  const getNotificationCount = () => {
    // Aquí deberías llamar a tu método real que devuelve la cantidad de notificaciones
    // Este es solo un ejemplo simulado
    return notifications.length; // Cambia esto con la lógica real
  };

  // Actualizar el conteo de notificaciones cuando el componente se monta
  useState(() => {
    setNotificationCount(getNotificationCount());
  }, []);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 10], // Ajusta el desplazamiento según tus necesidades
        },
      },
    ],
  });

  return (
    <nav className="bg-primary py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          Tu Logo
        </Link>

        <div className="flex items-center space-x-2">
          {/* Icono de campana con conteo de notificaciones */}
          <div
            ref={setReferenceElement}
            onClick={openNotification}
            className="cursor-pointer relative"
          >
            <BellIcon className="h-12 w-8 text-secondary" />
            {notificationCount > 0 && (
              <div className="absolute bottom-7 right-0 text-xs font-semibold pt-0.5 bg-customPink text-white rounded-full w-4 h-5 text-center">
                {notificationCount}
              </div>
            )}
          </div>

          {/* Información del usuario */}
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-300" />
            <span className="text-white">Usuario</span>
          </div>
        </div>
          {isNotificationOpen && (
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="fixed bg-cyan-50 p-4 rounded-md shadow-md"
            >
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          )}
      </div>

      {/* Popover de Notificaciones */}
    </nav>
  );
};

export default NavBar;
