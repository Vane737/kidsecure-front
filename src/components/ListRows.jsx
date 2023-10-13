import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

// import {
//   AiFillEye
// } from 'react-icons/ai'
// import {
//   BsTrashFill
// } from 'react-icons/bs'
// import {BiEdit} from 'react-icons/bi'
// eslint-disable-next-line react/prop-types
export const ListRows = ({
  head = [],
  body = [],
  getId,
  setVerify
}) => {
  //obtengo el id y la opcion que se selecciono (borrar,mostrar y editar)
  // const navigate = useNavigate();
  const onClickId = (b, option) => {
    getId({
      id: b.id,
      option,
    });
  };



  return (
    <table className="table-fixed w-full font-sans text-left shadow-md">
      <thead className="bg-gray-200 h-14 shadow-sm">
        <tr className="">
          {head.map((h, i) => (
            <th className="px-5 font-semibold" key={i}>
              {h}
            </th>
          ))}
          <th className="px-5 font-semibold">OPCIONES</th>
        </tr>
      </thead>
      <tbody>
        {body.map((b, i) => (
          <tr className="border-b border-gray-20 h-14 text-left" key={i}>
            {Object.keys(b).map((value, idx) => (
            (value !== "img_url" && value !== "face_id") && (
              <td className="font-normal pl-5" key={idx}>
                {b[value].nombre
                  ? b[value].nombre
                  : b[value]}
              </td>
            )
          ))}
            {
              setVerify ? (
              <td>
                <button
                  className="bg-primary rounded-md p-2 font-semibold pr-4 pl-4 text-white mr-3"
                  onClick={() => onClickId(b, "verificar")}
                >
                Verificar
              </button>
              </td>
            ) : (
              <span></span>
            )}
            <td>
              <div className="flex flex-wrap items-center justify-around">
                  <span></span>
                  <button
                    className="rounded-md p-2 text-customPink"
                    onClick={() => onClickId(b, "borrar")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    className="rounded-full bg-customGreen p-1 text-white"
                    onClick={() => onClickId(b, "editar")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                    </svg>
                  </button>
                  <button
                    className="rounded-md p-2"
                    onClick={() => onClickId(b, "vista")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ListRows.proptypes = {
  head: PropTypes.array.isRequired,
  body: PropTypes.array.isRequired,
  getId: PropTypes.func.isRequired,
};
