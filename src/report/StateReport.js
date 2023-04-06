import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Load_StateData } from '../redux/action';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import database from '../component/firebase';
import AdminDashboard from '../Dashboard/AdminDashboard';


const StateReport = () => {
  const { Loadstate } = useSelector(state => state.cartreducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Load_StateData());
  }, [dispatch])
  console.log("state table Data-----", Loadstate);


  const onDelete = (id) => {
    if (window.confirm("are you sure to delete the record")) {
      database.ref(`state_table/${id}`).remove((err) => {
        if (err) {
          alert("record is not deleted");
        }
        else {
          alert("record is deleted");
          dispatch(Load_StateData());
        }
      })
    }
  }

  return (
    <>
     <AdminDashboard/>
      <div className='container mt-5'>
        <div className='table-responsive-md'>
          <table className='table table-striped table-bordered table-hover'>
            <thead className='bg-dark text-white'>
              <tr>
                <th>sno</th>
                <th>ID</th>
                <th>StateName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(Loadstate).map((id, index) => {
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{Loadstate[id].state_id}</td>
                      <td>{Loadstate[id].state_name}</td>
                      <td className='text-center'>
                        <Link to={`/update/${id}`}>
                          <button
                            className="btn btn-primary"
                          >
                            edit
                          </button>
                        </Link>

                        <Link to={`/stateDelete/${id}`}>
                          <button
                            className="btn btn-danger"
                            onClick={() => onDelete(id)}
                          >
                            delete
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
export default StateReport;