import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/kidsecureApi";
import { useState } from "react";

export const CreateEditPersonnel = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [ci, setCi] = useState("");
  const [photo, setPhoto] = useState(null); // Cambio: Inicializa photo como null

  // Handlers
  const handlePersonSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(); // Crea un objeto FormData

    data.append("name", name);
    data.append("cellphone", cellphone);
    data.append("ci", ci);
    data.append("user_id", id); // Ya es un número, no necesitas parseInt
    data.append("photo", photo); // Agrega el archivo al objeto FormData

    api
      .post("/authorized-person/register", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Importante especificar el tipo de contenido como 'multipart/form-data'
        },
      })
      .then((res) => {
        console.log(res);
        navigate("/personal");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePhoto = (e) => {
    setPhoto(e.target.files[0]); // Cambio: Establece photo con el archivo seleccionado
  };

  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">REGISTRAR PERSONAL</h1>
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
          <label htmlFor="cellphone" className="block mb-2">CELULAR</label>
          <input
            type="text"
            onChange={(e) => setCellphone(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ci" className="block mb-2">CI</label>
          <input
            type="text"
            onChange={(e) => setCi(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photo" className="block mb-2">IMAGEN</label>
          <input
            type="file"
            onChange={handleChangePhoto}
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