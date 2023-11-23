import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useListDatas } from '../../hook';
import { differenceInYears } from 'date-fns';  // Importa las funciones necesarias
import { ArrowLeftIcon  } from '@heroicons/react/24/solid';


export const ReadClassroom = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    // const { data, charge } = useListDatas(`/child`);
    const { listData, loading } = useListDatas(`/classroom/${id}`);
    const [children, setChildren] = useState([]);
    const [filteredChildren, setFilteredChildren] = useState([]);
    const [selectedAge, setSelectedAge] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
    

  const handleAgeFilterChange = (e) => {
    const selectedAge = e.target.value;
    setSelectedAge(selectedAge);

    if (selectedAge === '') {
      setFilteredChildren(children);
    } else {
      const filtered = children.filter((child) => child.age.toString() === selectedAge);
      setFilteredChildren(filtered);
    }
  };

  const handleViewChild = (childId) => {
    // Obtén el niño que se va a eliminar
    navigate(`/niños/${childId}`);
  };

  const handleSearch = () => {
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = children.filter((child) => child.name.toLowerCase().includes(searchTermLower));
    setFilteredChildren(filtered);
  };

  const handleCancel = () => {
  //   // Agrega lógica para redirigir a una ruta específica cuando se cancele
    navigate('/salas');
  };

  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    return differenceInYears(today, birthDate);
  };
  return (
    <div className="w-full p-5 container">
      <div className="mt-3 w-full">
        <div className="flex justify-between px-5 py-5 items-center">
          <h1 className="text-2xl font-semibold text-gray-400">{listData.name}</h1>
        </div>
        { loading ? (
          <p>Cargando informacion de salas...</p>
        ) : (
          <>
            <div className="flex justify-between px-5 py-5 items-center">
              <div className="mr-4">
                <label className="mr-2">Seleccionar edad:</label>
                <select
                  className="border p-2 rounded"
                  onChange={handleAgeFilterChange}
                  value={selectedAge}
                >
                  <option value="">Todos</option>
                  <option value="4">4 años</option>
                  <option value="5">5 años</option>
                  <option value="6">6 años</option>
                  {/* ...más opciones de edad */}
                </select>
              </div>
              <div>
                <input
                  type="text"
                  className="border p-2 rounded"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Escribir nombre..."
                />
                <button
                  className="ml-2 bg-customGreen text-white px-4 py-1 rounded hover:bg-emerald-500"
                  onClick={handleSearch}
                >
                  Buscar
                </button>
              </div>
            </div>
            <hr />
           
            <div className="px-5 mt-4">
              <h2 className="text-lg text-gray-400 font-semibold mb-2">Niños en sala</h2>
              <ul>
                {listData.children.map((child) => (
                  <li key={child.id} className="flex justify-between items-center border-b py-2">
                    <span>{child.name} - {calculateAge(child.birthdate)} años</span>
                    <button
                      className="bg-secondary font-semibold px-4 py-1 rounded hover:bg-yellow-400"
                      onClick={() => handleViewChild(child.id)}
                    >
                      Ver niño
                    </button>
                  </li>
                ))}
              </ul>
            </div>
    
            <div className="flex justify-end mt-4">
              <button
                className="bg-primary px-4 font-semibold text-white py-3 rounded hover:bg-gray-600 flex justify-between items-center"
                onClick={handleCancel}
              >
                <ArrowLeftIcon className="h-5 w-5 mr-2"></ArrowLeftIcon>
                Volver a salas
              </button>
            </div>
            
            </>
        )}

        </div>
      </div>
  );

};