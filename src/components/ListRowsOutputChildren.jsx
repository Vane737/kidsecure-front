import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const ListRowsOutputChildren = ({ head = [], body = [], getId }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'dd/MM/yyyy');
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
            <td className="font-normal pl-5">{b.childName}</td>
            <td className="font-normal pl-5">{formatDate(b.date)}</td>
            <td className="font-normal pl-5">{b.personName}</td>
            <td className="font-normal pl-5">{b.classroomName}</td>
            <td>
              <div className="flex flex-wrap items-center justify-around">
                {/* Puedes agregar opciones según tu lógica */}
                <button
                  className="bg-primary rounded-md p-2 font-semibold pr-4 pl-4 text-white mr-3"
                  onClick={() => getId({ id: i, option: 'vista' })}
                >
                  Ver Detalles
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