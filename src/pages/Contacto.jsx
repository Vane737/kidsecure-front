
import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useListDatas } from '../hook';
import React from 'react';
import icon from '../assets/img/whatsapp-icon.png'
import { ArrowRightCircleIcon, UserIcon } from '@heroicons/react/24/solid';


export const Contacto = () => {
    const { listData, loading } = useListDatas(`/child/parents/contact`);

    const [classrooms, setClassrooms] = useState([]);
    const [selectedClassroom, setSelectedClassroom] = useState(null);
    const [dateFilter, setDateFilter] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
  

  
    const handleClassroomChange = (value) => {
      setSelectedClassroom(value);
    };
  
    useEffect(() => {
      // Actualizar la lista de salas cuando se obtienen los datos
      if (!loading && listData.length > 0) {
        const uniqueClassrooms = [...new Set(listData.map((item) => item.classroom))];
        setClassrooms(uniqueClassrooms);
      }
    }, [listData, loading]);
  
    useEffect(() => {
      // Filtrar la lista de datos por sala seleccionada
      if (selectedClassroom) {
        const filteredData = listData.filter((item) => item.classroom === selectedClassroom);
        setFilteredData(filteredData);
      } else {
        // Si no hay sala seleccionada, mostrar todos los datos
        setFilteredData(listData);
      }
    }, [selectedClassroom, listData]);
  
    useEffect(() => {
      // Filtrar los niños según la sala seleccionada y la fecha
      if (selectedClassroom && dateFilter) {
        // Puedes ajustar la URL del endpoint según la estructura de tu API
        fetch(`https://kidsecure-api-production.up.railway.app/api/classroom/${selectedClassroom}`)
          .then((response) => response.json())

          .catch((error) => console.error('Error fetching children:', error));
      }
    }, [selectedClassroom, dateFilter]);
  
    const handlerClickSendMessage = (cellphone) => {
      let message = "*Guarderia el principito* \n\n";
      if (cellphone !== "") {
        let link = `https://wa.me/591${cellphone}?text=` + encodeURIComponent(message);
        window.open(link);
      }
    };
  
    return (
      <div className="p-5 my-5 container flex justify-center">
        <div className="w-4/5 p-5 my-5 container border border-gray-300 rounded-lg shadow-md">
          <div className="flex justify-between px-5 py-5 items-center">
            <h1 className="text-2xl font-semibold text-gray-400 flex items-center">Contactos {  } <UserIcon className='w-6 h-6' /> </h1>
            <select
              className="mt-1 px-2 block w-40 h-14 border shadow-md border-gray-300 rounded-md"
              onChange={(e) => handleClassroomChange(e.target.value)}
            >
              <option value="">Seleccionar Sala</option>
              {classrooms.map((classroom, index) => (
                <option key={index} value={classroom} className="h-10  shadow-md  rounded-sm">
                  {classroom}
                </option>
              ))}
            </select>
          </div>
  
          {loading ? (
            <p>Este niño no tiene padres asignados...</p>
          ) : (
            <div className="mt-6">
              <table className="table-fixed w-full font-sans text-left border rounded-lg shadow-md px-9">
                <thead className="bg-gray-200 h-14 shadow-sm rounded-lg">
                  <tr className="font-semibold rounded-lg">
                    <th className="px-5">Niño</th>
                    <th className="px-5">Padre</th>
                    <th className="px-5">Sala</th>
                    <th className="px-5">Numero</th>
                    <th className="px-5">Opción</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b border-gray-20 h-14 text-left rounded-lg">
                        <td className="font-normal pl-5">{item.nameChild}</td>
                        <td className="font-normal pl-5">{/* Deja este campo vacío para manejar múltiples padres */}</td>
                        <td className="font-normal pl-5">{item.classroom}</td>
                        <td className="font-normal pl-5">{/* Deja este campo vacío para manejar múltiples padres */}</td>
                        <td className="font-normal pl-5">{/* Puedes agregar opciones específicas para el niño si es necesario */}</td>
                      </tr>
                      {item.fathers.map((father, fatherIndex) => (
                        <tr className="border-b border-gray-20 h-14 " key={`${index}-${fatherIndex}`}>
                          <td className="pl-5 flex justify-startr">
                            <ArrowRightCircleIcon className=" mt-3 h-8 w-8 text-customDark" />
                          </td>
                          <td className="font-normal pl-5">{father.name}</td>
                          <td className="font-normal pl-5">{item.classroom}</td>
                          <td className="font-normal pl-5">{father.cellphone}</td>
                          <td className="font-normal pl-5">
                            <button
                              onClick={() => handlerClickSendMessage(father.cellphone)}
                              className="bg-slate-50 border border-gray-300 rounded-md p-1 font-semibold hover:bg-slate-100 text-white flex justify-between items-center"
                            >
                              <img className="w-10 h-10" src={icon} alt="Icono de WhatsApp" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <Outlet />
      </div>
    );
  };
