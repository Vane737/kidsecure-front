import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useListDatas } from '../../hook';
import api from '../../api/kidsecureApi';
import { format, differenceInYears } from 'date-fns';  // Importa las funciones necesarias


export const ChildrenList = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const { listData, loading } = useListDatas(`/classroom/${id}`);
  // const { data, charge } = useListDatas(`/child`);
  const [children, setChildren] = useState([]);
  const [filteredChildren, setFilteredChildren] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);
  const [selectedAge, setSelectedAge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {

    // Simular la obtención de datos de niños
    const fetchData = async () => {
        api
          .get(`/child`)
          .then((res) => {
            setChildren(res.data);
            setFilteredChildren(res.data);
            // navigate("/admin/providers");
          })
          .catch((err) => {
            console.log(err);
          });

        };
    fetchData();
    
    // console.log(data);
    // setChildren(data);
    console.log(children);
    // console.log(listData);
  }, []);

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

  const handleAddChild = (childId) => {
    const isAlreadySelected = selectedChildren.some((child) => child.id === childId);

    if (!isAlreadySelected) {
      const childToAdd = children.find((child) => child.id === childId);
      setSelectedChildren([...selectedChildren, childToAdd]);
      setFilteredChildren(filteredChildren.filter((child) => child.id !== childId));
    }
  };

  const handleRemoveChild = (childId) => {
    setSelectedChildren(selectedChildren.filter((child) => child.id !== childId));
    setFilteredChildren([...filteredChildren, selectedChildren.find((child) => child.id === childId)]);
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

  const handleSave = () => {
  //   // Lógica para guardar y enviar los datos
    const selectedChildrenIds = selectedChildren.map((child) => child.id);

    api
      .patch(`classroom/${id}/children`, {"children": selectedChildrenIds})
      .then((res) => {
        console.log(res);
        navigate("/salas");
      })
      .catch((err) => {
        console.log(err);
      });
  //   // Simulación de una llamada API exitosa
    console.log("Enviando IDs de niños seleccionados:", selectedChildrenIds);

  //   // Reiniciar la lista de niños seleccionados si la llamada es exitosa
    setSelectedChildren([]);

  //   // Agrega lógica adicional según tus necesidades
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
        <div className="px-5 my-4">
          <h2 className="text-lg text-gray-400 font-semibold mb-2">Seleccionar niños</h2>
          <ul>
            {filteredChildren.map((child) => (
                <li key={child.id} className="flex justify-between items-center border-b py-2">
                  <span>{child.name} - {calculateAge(child.birthdate)} años</span>
                  <button
                    className="bg-primary text-white px-4 py-1 rounded hover:bg-cyan-500"
                    onClick={() => handleAddChild(child.id)}
                    disabled={selectedChildren.some((selectedChild) => selectedChild.id === child.id)}
                  >
                    Añadir
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div className="px-5 mt-4">
          <h2 className="text-lg text-gray-400 font-semibold mb-2">Niños en sala</h2>
          <ul>
            {selectedChildren.map((child) => (
              <li key={child.id} className="flex justify-between items-center border-b py-2">
                <span>{child.name} - {calculateAge(child.birthdate)} años</span>
                <button
                  className="bg-customPink text-white px-4 py-1 rounded hover:bg-pink-500"
                  onClick={() => handleRemoveChild(child.id)}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-secondary px-4 py-1 rounded hover:bg-emerald-500 mr-2"
            onClick={handleSave}
          >
            Guardar
          </button>
          <button
            className="bg-customPink px-4 py-1 rounded hover:bg-gray-600"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        </div>

        </div>
      </div>
  );

};