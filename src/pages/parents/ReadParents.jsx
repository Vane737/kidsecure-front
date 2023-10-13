import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultImage from '../../assets/img/default.jpg'

// import api from "../../../API/axios";

export const ReadParents = () => {
  const { id } = useParams();
  const loading = true;
  // const [person, setPerson] = useState(null);
  // const [loading, setLoading] = useState(true);
  const person = false;

//   useEffect(() => {
//       const fetchPersonnel = async () => {
//       try {
//           const response = await api.get(`/person/${id}`);
//           // console.log(response);
//           setPersonnel(response.data.person);
//           setLoading(false);
//       } catch (error) {
//           // console.error(error);
//           setLoading(false);
//       }
//       };
//       fetchPersonnel();
//   }, [id]);


    
    
    
    if (loading) {
        return <div>Cargando persona unica...</div>;
      }
    
      if (!person) {
        return <div>No se encontró el person</div>;
      }
    //   const nombresAutores = person.autores.map((autor) => autor.nombre).join(', ');
    //   console.log(nombresAutores);
      
      return (
        <div className="w-full p-5">
          <div className="w-80 flex justify-between">
            <div className="ml-24 mt-5 p-5 w-full h-screen">
                    <h1 className="text-2xl font-bold py-6">Personal</h1>
                    {/* <p className="py-3"><strong>Id:</strong> {person.id}</p> */}
                    {/* <p className="py-3"><strong>Autores:</strong> {nombresAutores}</p> */}
                    <p className="py-3"><strong>Categoria:</strong> {person.nombre}</p>
                    <p className="py-3"><strong>Editorial:</strong> {person.celular}</p>
                    <p className="py-3"><strong>Fecha de publicación:</strong> {person.ci}</p>
                    <p className="py-3"><strong>Precio:</strong> {person.precio}</p>
                    {/* <p className="py-3"><strong>Mínimo de stock:</strong> {person.direccion}</p>
                    <p className="py-3"><strong>Maximo de stock:</strong> {person.direccion}</p> */}
            </div>
            <div>
              
              <img className='h-28 w-84 h-84 mt-15' src={ person.img? person.img :DefaultImage } alt={person.titulo} />
            </div>
          <div>

          </div>
          </div>
        </div>
    );
}
