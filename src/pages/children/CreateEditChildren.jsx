import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/kidsecureApi";
import { useState } from "react";

export const CreateEditChildren = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [gender, setGender] = useState("");
  const [allergies, setAllergies] = useState("");




  //handlers
  const handleBookSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      birthdate: birthdate,
      gender: gender,
      allergies: allergies,
    //  
    }
    // const token = localStorage.getItem('x-token');
    console.log("data", data);
    if (id) {
      //editar
      api
        .put(`child/${id}`, data)
        .then((res) => {
          console.log(res);
          navigate("/niños");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      //crear
      api
        .post("/child", data,null)
        .then((res) => {
          console.log(res);
          navigate("/niños");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  //Handle add author


  
  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        {id ? "EDITAR NIÑOS" : "REGISTRAR NIÑO"}
      </h1>
      <form onSubmit={handleBookSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 w-full">
            NOMBRE
          </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthdate" className="block mb-2">
            FECHA DE NACIMIENTO
          </label>
          <input
            type="date"
            onChange={(e) => setBirthdate(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">
            GENERO
          </label>
          <select
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          >
            <option value="">Seleccionar</option>
            <option value="F">Masculino</option>
            <option value="M">Femenino</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="allergies" className="block mb-2 w-full">
            ALERGIAS
          </label>
          <input
            type="text"
            onChange={(e) => setAllergies(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="bg-secondary rounded-md p-2 block w-full mb-4"
          >
            {id ? "Editar" : "Registrar"}
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
}
