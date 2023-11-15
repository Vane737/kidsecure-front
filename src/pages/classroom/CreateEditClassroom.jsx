import { Link, useNavigate } from "react-router-dom";
import api from "../../api/kidsecureApi";
import { useState } from "react";

export const CreateEditClassroom = () => {
  // let { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Handlers
  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(); // Crea un objeto FormData

    data.append("name", name);
    data.append("descripcion", description);
// Agrega el archivo al objeto FormData

    api
      .post("/classroom/register", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante especificar el tipo de contenido como 'multipart/form-data'
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/salas");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">REGISTRAR SALA</h1>
      <form onSubmit={handlePersonSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 w-full">NOMBRE</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="descripcion" className="block mb-2">DESCRIPCION</label>
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="bg-secondary rounded-md p-2 block w-full mb-4"
          >
            Registrar
          </button>

          <Link
            type="button"
            className="bg-customPink rounded-md text-center p-2 block w-full"
            to="/niños"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};