import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Load_AreaData } from '../redux/action';
import { Link } from 'react-router-dom';
import database from '../component/firebase';
import AdminDashboard from '../Dashboard/AdminDashboard';
const AreaReport = () => {
  const { Loadarea } = useSelector(state => state.cartreducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(Load_AreaData());
  }, [dispatch])
  console.log("area table Data-----", Loadarea);

  const onDelete = (id) => {
    if (window.confirm("are you sure to delete the record")) {
      database.ref(`area_table/${id}`).remove((err) => {
        if (err) {
          alert("record is not deleted");
        }
        else {
          alert("record is deleted");
          dispatch(Load_AreaData());
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
                <th>StateID</th>
                <th>StateName</th>
                <th>CityId</th>
                <th>CityName</th>
                <th>AreaID</th>
                <th>AreaName</th>
                <th>AreaPinCode</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                Object.keys(Loadarea).map((id, index) => {
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>{Loadarea[id].state_id}</td>
                      <td>{Loadarea[id].state_name}</td>
                      <td>{Loadarea[id].city_id}</td>
                      <td>{Loadarea[id].city_name}</td>
                      <td>{Loadarea[id].area_id}</td>
                      <td>{Loadarea[id].area_name}</td>
                      <td>{Loadarea[id].pin_code}</td>
                      <td>
                        <Link to={`/areaupdate/${id}`}>
                          <button
                            className="btn btn-primary"
                          >
                            edit
                          </button>
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => onDelete(id)}
                        >
                          delete
                        </button>
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
export default AreaReport;