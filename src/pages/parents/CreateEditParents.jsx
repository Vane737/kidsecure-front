import { Link, useNavigate, useParams } from "react-router-dom";
// import api from "../../../API/axios";
import { useEffect, useState } from "react";

export const CreateEditParents = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorName, setAuthorName] = useState("");
  const [editorial, setEditorial] = useState("");
  const [image, setImage] = useState();


  useEffect(() => {
    // api
    //   .get(`/categoria`)
    //   .then((res) => {
    //     setCategorias(res.data.categorias);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  //handlers
  const handleBookSubmit = (e) => {
    // e.preventDefault();
    // const data = {
    //   titulo: title,
    //   precio: parseInt(price),
    //   fecha_publicacion: date,
    //   categoriaId: parseInt(categoriaId),
    //   editorial: editorial,
    //   autores: authors,
    //   img: image,
    // }
    // const token = localStorage.getItem('x-token');
    // console.log("data", data);
    // if (id) {
    //   //editar
    //   api
    //     .put(`PERSONAL/${id}`, data)
    //     .then((res) => {
    //       console.log(res);
    //       navigate("/admin/providers");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    //   //crear
    //   api
    //     .post("/PERSONAL", data,{
    //       headers: {
    //         "x-token": token,
    //       }
    //     })
    //     .then((res) => {
    //       console.log(res);
    //       navigate("/admin/book");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  };

  //Handle add author
  const handleAddAuthor = () => {
    setAuthors([...authors, authorName]);
    setAuthorName("");
  }

  const handleChangeImage = (e) => {
    const reader = new FileReader()

    reader.readAsDataURL(e.target.files[0])

    reader.onload = () => {
      // console.log('called: ', reader.result);
      setImage(reader.result);
    }
  };
  
  return (
    <div className="container mx-auto w-3/6">
      <h1 className="text-2xl font-bold text-center mb-4 w-full pt-5">
        {id ? "EDITAR PADRE/TUTOR" : "REGISTRAR PADRE/TUTOR"}
      </h1>
      <form onSubmit={handleBookSubmit}>
        <div className="mb-4">
          <label htmlFor="titulo" className="block mb-2 w-full">
            NOMBRE
          </label>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="precio" className="block mb-2">
            CELULAR
          </label>
          <input
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="fecha_publicacion" className="block mb-2">
            CI
          </label>
          <input
            type="text"
            onChange={(e) => setDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 w-full rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="img" className="block mb-2">
            IMAGEN
          </label>
          <input
            type="file"
            onChange={handleChangeImage}
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
            to="/padres"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
