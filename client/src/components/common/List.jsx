import { FaTrash, FaEdit } from 'react-icons/fa'

const List = ({ columns, rows, fields, onEdit, onDelete }) => {

  

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {
              columns.map((col, idx) => {
                return <th key={idx} className='font-semibold'>{col}</th>
              })
            }
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {
            rows.length===0 ? <p>No data found.</p> : rows.map((row, index) => {
              return <tr key={row._id} className="hover:bg-base-200">
                <th>{index + 1}</th>
                {fields.map((field, i) => (
                  <td key={i}>{row[field]}</td>
                ))}
                <td className='flex gap-3 items-center'>
                  <FaTrash size={18} className='text-red-600 cursor-pointer' onClick={()=>onDelete(row._id)} />
                  <FaEdit size={21} className='text-primary cursor-pointer' onClick={() => onEdit(row)} />
                </td>

              </tr>
            })
          }

        </tbody>
      </table>
    </div>
  )
}

export default List
