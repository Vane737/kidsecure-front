import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useListDatas } from '../../hook';
import ListRowsOutputChildren from '../../components/ListRowsOutputChildren';

const OutputControl = () => {
  const navigate = useNavigate();
  const { listData: childrenData, loading: childrenLoading } = useListDatas('/child');
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [dateFilter, setDateFilter] = useState(null);

  const handleClassroomChange = (classroomId) => {
    setSelectedClassroom(classroomId);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  useEffect(() => {
    // Obtener la lista de salas
    // Puedes ajustar la URL del endpoint según la estructura de tu API
    fetch('https://kidsecure-api-production.up.railway.app/api/classroom')
      .then((response) => response.json())
      .then((data) => setClassrooms(data))
      .catch((error) => console.error('Error fetching classrooms:', error));
  }, []);

  useEffect(() => {
    // Filtrar los niños según la sala seleccionada y la fecha
    if (selectedClassroom && dateFilter) {
      // Puedes ajustar la URL del endpoint según la estructura de tu API
      fetch(`https://kidsecure-api-production.up.railway.app/api/classroom/${selectedClassroom}`)
        .then((response) => response.json())
        .then((classroomData) => {
          const filteredChildren = classroomData.children.filter((child) => {
            // Filtrar niños por fecha, puedes ajustar según la estructura de tu API
            const childDate = new Date(child.birthdate);
            const filterDate = new Date(dateFilter);
            return childDate.getDate() === filterDate.getDate() &&
              childDate.getMonth() === filterDate.getMonth() &&
              childDate.getFullYear() === filterDate.getFullYear();
          });

          setFilteredChildren(filteredChildren);
        })
        .catch((error) => console.error('Error fetching children:', error));
    }
  }, [selectedClassroom, dateFilter]);

  const head = ['ID', 'NOMBRE', 'SALA', 'HORARIO DE SALIDA', ];

  const handleClickOption = ({ id, option }) => {
    // Agregar cualquier lógica adicional según las opciones necesarias
    switch (option) {
      case 'vista':
        return navigate(`/niños/${id}`);
      default:
        break;
    }
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
                {classrooms.map((classroom) => (
                    <option key={classroom.id} value={classroom.id} className='h-10 border shadow-md border-gray-400 rounded-sm'>
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
        {childrenLoading ? (
          <p>Cargando...</p>
        ) : (
          <div className='mt-6'>
            <ListRowsOutputChildren head={head} body={filteredChildren} getId={handleClickOption}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputControl;
