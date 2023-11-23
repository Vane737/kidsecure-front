import { Outlet, useNavigate } from 'react-router-dom';
import { MyModal } from '../../components/utils/MyModal';
import { useListDatas } from '../../hook';
import { useState } from 'react';
import { ListRowsChildren } from '../../components/ListRowsChildren';
// import api from '../../api/kidsecureApi';
// import Pagination from '../../components/utils/Pagination';

export const Children = () => {

  // const listData = {
  //   parents: [
  //       { id: 1, name: 'Maria', telefono: '88768736', ci: '9689554' },
  //       {  id: 2, name: 'Juan', telefono: '88768736', ci: '9689554' },
  //       { id: 3, name: 'Pedro', telefono: '88768736', ci: '9689554' }
  //   ]    
  // }  
  const navigate = useNavigate();
  // const regXPage = 6;
  // const [ offset, setOffset ] = useState(0);
  // const loading = false;
  const { listData, loading } = useListDatas(`/child`);
  const [isOpen, setIsOpen] = useState(false);
  const [isAccept, setIsAccept] = useState(false);
  const [personalId, setPersonalId] = useState(null);
  const head = ['ID', 'NOMBRE', 'FECHA NAC', 'GENERO', 'ALERGIAS'];

  const handleClickOption = ({ id, option }) => {
    switch (option) {
      case 'borrar':
        return handleDeleteUser(id);
      case 'vista':
        return navigate(`/niños/${id}`);
      case 'editar':
        return navigate(`/admin/user/edit/${id}`);
      case 'padre':
        return navigate(`/padres/create`);
      case 'persona':
        return navigate(`/personal/create`);
      default:
        break;
    }
  };

  const textBorrar = 'Estás seguro de eliminar a este niño ?';

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
  
  const handleClickCreate = ()=>{
    navigate('/niños/create');
  }

  return (
    <div className="w-full p-5 container">
      <div className="mt-3 w-full">
        <div className='flex justify-between px-5 py-5 items-center'>
            <h1 className="text-2xl font-semibold text-gray-400">GESTIONAR NIÑOS</h1>
            <button className='bg-customGreen rounded-md p-2 font-semibold pr-4 pl-4 text-white'
            onClick={handleClickCreate}>Añadir niño</button>
        </div>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <div className='mt-16'>
            <ListRowsChildren head={head} body={listData} getId={handleClickOption}/>
            {/* <Pagination  offset= {offset} regTotal ={ regTotal } onOffsetChange={handleOffsetChange} regXPage = {regXPage}/> */}
          </div>

        )}
        {isOpen && <MyModal Text={textBorrar} estados={closeModal} />}
      </div>
      {/* <Outlet /> */}
    </div>
  );
};





