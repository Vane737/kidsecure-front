import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { MyModal } from '../../components/utils/MyModal';
// import { useListDatas } from '../../hook';
import { ListRows } from '../../components/ListRows';
import { useState } from 'react';
import { useListDatas } from '../../hook';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';


export const Parents = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { listData, loading } = useListDatas(`/child/${id}/father`);
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [personalId, setPersonalId] = useState(null);
  const head = ['ID', 'NOMBRE', 'TELEFONO', 'CI', 'CORREO', 'DIRECCION'];

  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteUser(id);
      case 'vista':
        return navigate(`/personal/5`);
      case 'editar':
        return navigate(`/admin/user/edit/${id}`);
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

  // const handleOffsetChange = (numeroPag) => {
  //   setOffset(numeroPag);
  // }

  const handleClickCreate = ()=>{
    navigate(`/niños`);
  }

  return (
    <div className="w-full p-5 container">
      <div className="mt-3 w-full">
        <div className='flex justify-between px-5 py-5 items-center'>
        <h1 className="text-2xl font-semibold text-gray-400">Padres</h1>
        <button className='bg-customGreen rounded-md py-3 font-semibold pr-4 pl-4 text-white flex justify-between items-center'
            onClick={handleClickCreate}>
              <ArrowLeftIcon className="h-6 w-6" />
              Volver a niños
            </button>
        </div>
        {loading || listData.length < 1 ? (
          <p>Este niño no tiene padres asignados...</p>
        ) : (
          <div className='mt-16'>
            <ListRows head={head} body={listData} getId={handleClickOption} setEdit={true}/>
            {/* <Pagination  offset= {offset} regTotal ={ regTotal } onOffsetChange={handleOffsetChange} regXPage = {regXPage}/> */}
          </div>

        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
      <Outlet />
    </div>
  );
};





