import { useNavigate, useParams } from "react-router-dom";
// import DefaultImage from '../../assets/img/default.jpg'
import { useListDatas } from "../../hook";
import { format, parseISO } from 'date-fns';
import { ArrowLeftIcon  } from '@heroicons/react/24/solid';

export const ReadChildren = () => {
  const { id } = useParams();
  const { listData, loading } = useListDatas(`/child/${id}`);
  const navigate = useNavigate();
  const handleClassroom = () => {
    //   // Agrega lógica para redirigir a una ruta específica cuando se cancele
      navigate('/salas');
    }; 
    
    
    if (loading) {
        return <div>Cargando información del niño...</div>;
      }
    
      if (!listData) {
        return <div>No se encontraron datos</div>;
      }

      return (
        <div className="w-full p-5">
          <div className="flex justify-between">
            <div className="ml-24 mt-5 p-5 w-full h-screen">
                    <h1 className="text-2xl font-bold py-6">Informacion del niño</h1>
                    <p className="py-3"><strong>Id:</strong> {listData.id}</p>
                    <p className="py-3"><strong>Nombre:</strong> {listData.name}</p>
                    <p className="py-3"><strong>Fecha de nacimiento:</strong> {format(parseISO(listData.birthdate), 'dd/MM/yyyy')}</p>
                    <p className="py-3"><strong>Genero:</strong> {listData.gender == 'F' ? "Femenino" : "Masculino"}</p>
                    <p className="py-3"><strong>Alergias:</strong> {listData.allergies}</p>
                    <button
                      className="bg-primary  my-4 px-4 font-semibold text-white py-2 rounded hover:bg-gray-600 flex justify-between items-center"
                      onClick={handleClassroom}
                    >
                      <ArrowLeftIcon className="h-5 w-5 mr-2"></ArrowLeftIcon>
                      Volver a salas
                    </button>
            </div>
            {/* <div>
              
              <img className='h-28 w-84 h-84 mt-15' src={ listData.img? listData.img :DefaultImage } />
            </div> */}
          <div>

          </div>
          </div>
        </div>
    );
}
