/* eslint-disable react/prop-types */
import Default from '../../assets/img/sadface.png';


const NotificationItem = ({ notification }) => {
  const recortarHoraMinutos = (fechaCompleta) => fechaCompleta.slice(0, 5);

  const handleNotificationClick = () => {
    // Redirigir a un enlace externo cuando se hace clic en la notificación
    if (notification.videoUrl) {
      window.open(notification.videoUrl, '_blank');
    } else {
      // Aquí puedes agregar lógica personalizada para redireccionar a otras páginas internas
      // Utilizando el objeto history de react-router-dom
      // history.push('/otra-ruta');
    }
  };

  return (
    <a href="#" onClick={handleNotificationClick} className="flex items-center p-4 border-b hover:bg-emerald-100 rounded-md text-customDark">
      {/* Icono de la notificación (puedes cambiarlo según tus necesidades) */}
      <div className="flex-shrink-0 mr-4">
        <img
          src={Default} // Reemplaza con la ruta a tu ícono
          alt="Notification Icon"
          className="h-10 w-15"
        />
      </div>

      {/* Contenido de la notificación */}
      <div className="flex-1">
        <div className='flex items-center justify-between'>
          <h6 className="font-semibold">{notification.type ? notification.type : "Se ha identificado un acto de violencia"}</h6>
          <p className='text-sm'> <small>{notification.time ? recortarHoraMinutos(notification.time) : '00:00'} </small> </p>
        </div>
        <p className="text-sm text-gray-500">{notification.description ? notification.description : "Visualiza y confirma que si es un acto de violencia"}</p>
        <p><small>{notification.date ? notification.date : ''}</small></p>
      </div>
    </a>
  );
};

export default NotificationItem;


// const NotificationItem = ({ notification }) => {

  

//   const recortarHoraMinutos = (fechaCompleta) => fechaCompleta.slice(0, 5);

//   return (
//     <div className="flex items-center p-4 border-b">
//       {/* Icono de la notificación (puedes cambiarlo según tus necesidades) */}
//       <div className="flex-shrink-0 mr-4">
//         <img
//           src={Default} // Reemplaza con la ruta a tu ícono
//           alt="Notification Icon"
//           className="h-10 w-15"
//         />
//       </div>

//       {/* Contenido de la notificación */}
//       <div className="flex-1">
//         <div className='flex items-center justify-between'>
//           <h6 className="font-semibold">{notification.type ? notification.type : "Se ha identificado un acto de violencia"}</h6>
//           <p className='text-sm'> <small>{notification.time ? recortarHoraMinutos(notification.time) : '12:00'} </small> </p>
//         </div>
//         <p className="text-sm text-gray-500">{notification.description ? notification.description : "Visualiza y confirma que si es un acto de violencia"}</p>
//         <p><small>{notification.date ? notification.date : ''}</small></p>
//       </div>

//       {/* Enlace para abrir una nueva pestaña */}
//       {/* onClick={handleNotificationClick} */}
//     </div>
//   );
// };

// export default NotificationItem;
