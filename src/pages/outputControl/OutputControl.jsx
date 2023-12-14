import { useState, useEffect } from 'react';
import { useListDatas } from '../../hook';
import { format, parseISO } from 'date-fns';

const OutputControl = () => {
  const { listData, loading } = useListDatas('/outpu-control');
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [filteredChildren, setFilteredChildren] = useState([]);

  const handleClassroomChange = (classroomId) => {
    setSelectedClassroom(classroomId);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  useEffect(() => {
    // Obtener la lista de salas
    // Ajusta la URL del endpoint según la estructura de tu API
    fetch('https://kidsecure-api-production.up.railway.app/api/classroom')
      .then((response) => response.json())
      .then((data) => setClassrooms(data))
      .catch((error) => console.error('Error fetching classrooms:', error));
  }, []);

  useEffect(() => {
    // Filtrar niños según la sala seleccionada y la fecha
    const filteredChildren = listData.filter((child) => {
      const childDate = new Date(child.date);
      const filterDate = new Date(dateFilter);
      return (
        (!selectedClassroom || child.classroomName === selectedClassroom) &&
        childDate.getDate() === filterDate.getDate() &&
        childDate.getMonth() === filterDate.getMonth() &&
        childDate.getFullYear() === filterDate.getFullYear()
      );
    });

    setFilteredChildren(filteredChildren);
  }, [selectedClassroom, dateFilter, listData]);

  const getHora = (fechaString) => {
    const fecha = new Date(fechaString);
    const options = { hour: '2-digit', minute: '2-digit' };
    return fecha.toLocaleTimeString('es-ES', options);
  };

  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'dd/MM/yyyy');
  };

  return (
    <div className="w-full p-5 container mx-5">
      <div className="mt-3 w-full">
        <div className='x-5 py-5 items-center'>
          <h1 className="text-2xl font-semibold text-gray-400">CONTROL DE SALIDA</h1>
          <div>
            <div className="flex space-x-4 mt-6">
              <div>
                <select
                  className="mt-1 px-2 block w-40 h-14 border shadow-md border-gray-300 rounded-md"
                  onChange={(e) => handleClassroomChange(e.target.value)}
                >
                  <option value="">Seleccionar Sala</option>
                  {classrooms.map((classroom, index) => (
                    <option key={index} value={classroom.name} className="h-10 shadow-md rounded-sm">
                      {classroom.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="date"
                className="px-2 mt-1 block w-40 h-14 border shadow-md border-gray-300 rounded-md"
                onChange={handleDateFilterChange}
              />
            </div>
          </div>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className='mt-6'>
            <table className='table-fixed w-full font-sans text-left shadow-md px-9'>
              <thead className='bg-gray-200 h-14 shadow-sm'>
                <tr className='font-semibold'>
                  <th className='px-5'>Niño</th>
                  <th className='px-5'>Hora</th>
                  <th className='px-5'>Fecha</th>
                  <th className='px-5'>Sala</th>
                  <th className='px-5'>Persona autorizada</th>
                </tr>
              </thead>
              <tbody>
                {filteredChildren.map((child, index) => (
                  <tr className='border-b border-gray-20 h-14 text-left' key={index}>
                    <td className='font-normal pl-5'>{child.childName}</td>
                    <td className='font-normal pl-5'>{getHora(child.date)}</td>
                    <td className='font-normal pl-5'>{formatDate(child.date)}</td>
                    <td className='font-normal pl-5'>{child.classroomName}</td>
                    <td className='font-normal pl-5'>{child.personName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputControl;
