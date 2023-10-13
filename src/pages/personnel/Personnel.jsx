import { Outlet, useNavigate } from 'react-router-dom';
import { MyModal } from '../../components/utils/MyModal';
// import { useListDatas } from '../../hook';
import { ListRows } from '../../components/ListRows';
import { useState, useEffect } from 'react';
import { useListDatas } from '../../hook';
// import api from '../../API/axios';
// import Pagination from '../../components/utils/Pagination';

export const Personnel = () => {


  const navigate = useNavigate();
  // const regXPage = 6;
  // const [ offset, setOffset ] = useState(0);
  const { listData, loading } = useListDatas(`/authorized-person`);
  // const loading = false;
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [personalId, setPersonalId] = useState(null);
  const head = ['ID', 'NOMBRE', 'TELEFONO', 'CI', 'VERIFICAR'];

  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteUser(id);
      case 'vista':
        return navigate(`/personal/5`);
      case 'editar':
        return navigate(`/personal/edit/${id}`);
      case 'verificar':
        return navigate(`/personal/verificar/${id}`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar a esta persona?';

  const handleDeleteUser = (id) => {
    setPersonalId(id);
    setIsOpen(true);
  };

  const closeModal = ({ open, accept }) => {
    setIsOpen(open);

    if (accept) {
      setIsAccept(true);
    } else {
      setIsAccept(false);
      setPersonalId(null);
    }
  };

//   useEffect(() => {
//     const deleteUser = async () => {
//       if (isAccept && personalId) {
//         const { data, status } = await api.delete(`/usuario/${personalId}`, {
//           headers: {
//             'x-token': localStorage.getItem('x-token'),
//           }
//         });
//         if (status >= 400) return;
//         console.log(data);
//         window.location.reload();
//       }
//     };

//     deleteUser();
//   }, [isAccept, personalId]);

  // const handleOffsetChange = (numeroPag) => {
  //   setOffset(numeroPag);
  // }

  const handleClickCreate = ()=>{
    navigate('/personal/create');
  }

  return (
    <div className="w-full p-5 container">
      <div className="mt-3 w-full">
        <div className='flex justify-between px-5 py-5 items-center'>
            <h1 className="text-2xl font-semibold text-gray-400">PERSONAL AUTORIZADO</h1>
            <button className='bg-customGreen rounded-md p-2 font-semibold pr-4 pl-4 text-white'
            onClick={handleClickCreate}>Añadir persona</button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className='mt-16'>
            <ListRows head={head} body={listData} getId={handleClickOption} setVerify={true}/>
            {/* <Pagination  offset= {offset} regTotal ={ regTotal } onOffsetChange={handleOffsetChange} regXPage = {regXPage}/> */}
          </div>
        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
      <Outlet />
    </div>
  );
};





