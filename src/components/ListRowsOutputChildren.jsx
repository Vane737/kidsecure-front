import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { format, parseISO } from 'date-fns';

const ListRowsOutputChildren = ({ head = [], body = [], getId }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'dd/MM/yyyy');
  };

  const handleClickCreate = (b, isTutor) => {
    if (isTutor) {
      navigate(`/padres/create/${b}`);
    } else {
      navigate(`/personal/create/${b}`);
    }
  };

  const handleClickList = (b, isTutor) => {
    if (isTutor) {
      navigate(`/padres/${b}`);
    } else {
      navigate('/personal');
    }
  };

  return (
    <table className="table-fixed w-full font-sans text-left shadow-md px-9">
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
            <td className="font-normal pl-5">{b.name}</td>
            <td className="font-normal pl-5">{b.classroom.name}</td>
            <td className="font-normal pl-5">{formatDate(b.schedule)}</td>
            <td>
              <div className="flex flex-wrap items-center justify-around">
                <button
                  className="bg-primary rounded-md p-2 font-semibold pr-4 pl-4 text-white mr-3"
                  onClick={() => handleClickCreate(b.id, true)}
                >
                  <PlusIcon className="h-4 w-4" />
                </button>

                <button
                  className="bg-secondary rounded-md p-2 font-semibold pr-4 pl-4 text-white"
                  onClick={() => handleClickList(b.id, true)}
                >
                  <ClipboardDocumentListIcon className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ListRowsOutputChildren.propTypes = {
  head: PropTypes.array.isRequired,
  body: PropTypes.array.isRequired,
  getId: PropTypes.func.isRequired,
};

export default ListRowsOutputChildren;
