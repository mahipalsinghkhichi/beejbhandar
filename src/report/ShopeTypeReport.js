import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Load_ShopeData } from '../redux/action';
import { Link } from 'react-router-dom';
import database from '../component/firebase';
import AdminDashboard from '../Dashboard/AdminDashboard';
const ShopeTypeReport = () => {
    const {Loadshope} = useSelector(state=> state.cartreducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Load_ShopeData());
    },[dispatch])
    console.log("shope table Data-----",Loadshope);

    const onDelete = (id) => {
      if (window.confirm("are you sure to delete the record")) {
        database.ref(`shope_table/${id}`).remove((err) => {
          if (err) {
            alert("record is not deleted");
          }
          else {
            alert("record is deleted");
            dispatch(Load_ShopeData());
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
                 <th>Shope Id</th>
                 <th>Shopename</th>
                 <th>Action</th>
            </tr>
      </thead>   
          <tbody>
                  {
                    Object.keys(Loadshope).map((id,index)=>{
                        return(
                            <tr key={id}>
                                <td>{index+1}</td>
                                <td>{Loadshope[id].shope_id}</td>
                                <td>{Loadshope[id].shope_type}</td>                                
                                <td className='text-center'>                     
                                <Link to={`/shopeupdate/${id}`}>
                                <button
                                  className="btn"
                                  style={{backgroundColor:"aqua"}}
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
export default ShopeTypeReport;