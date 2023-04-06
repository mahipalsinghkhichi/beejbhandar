import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Load_CityData } from '../redux/action';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import database from '../component/firebase';
import AdminDashboard from '../Dashboard/AdminDashboard';


const CityReport = () => {
    const {Loadcity} = useSelector(state=> state.cartreducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Load_CityData());
    },[dispatch])
    console.log("city table Data-----",Loadcity);

    const onDelete = (id) => {
      if (window.confirm("are you sure to delete the record")) {
        database.ref(`city_table/${id}`).remove((err) => {
          if (err) {
            alert("record is not deleted");
          }
          else {
            alert("record is deleted");
            dispatch(Load_CityData());
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
      <thead className='bg-warning text-white'>     
            <tr>
                 <th>sno</th>
                 <th>StateID</th>
                 <th>StateName</th>
                 <th>CityId</th>
                 <th>CityName</th>
                 <th>Action</th>
            </tr>
      </thead>   
          <tbody>
                  {
                    Object.keys(Loadcity).map((id,index)=>{
                        return(
                            <tr key={id}>
                                <td>{index+1}</td>
                                <td>{Loadcity[id].state_id}</td>
                                <td>{Loadcity[id].state_name}</td>
                                <td>{Loadcity[id].city_id}</td>
                                <td>{Loadcity[id].city_name}</td>
                                <td className='text-center'>                     
                                <Link to={`/cityupdate/${id}`}>
                                <button
                                 style={{backgroundColor:"aqua"}}
                                  className="btn"
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
export default CityReport;