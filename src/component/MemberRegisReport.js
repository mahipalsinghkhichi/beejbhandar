import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Load_MemberRegisData } from '../redux/action';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import database from './firebase';
import AdminDashboard from '../Dashboard/AdminDashboard';

const MemberRegisReport = () => {
    const {Loadmemberregis} = useSelector(state=> state.cartreducer);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Load_MemberRegisData());
    },[dispatch])
    console.log("member regis table Data-----",Loadmemberregis);
 
   
    const onDelete = (id) => {
      if (window.confirm("are you sure to delete the record")) {
        database.ref(`memberregis_table/${id}`).remove((err) => {
          if (err) {
            alert("record is not deleted");
          }
          else {
            alert("record is deleted");
            dispatch(Load_MemberRegisData());
          }
        }) 
      }
    }


    return (
    <><AdminDashboard/>
    <div className='container mt-5'>
      <div className='table-responsive-md'>
    <table className='table table-striped table-bordered table-hover'> 
      <thead className='bg-dark text-white'>     
            <tr>
                 <th>sno</th>
                 <th>ID</th>
                 <th>Name</th>
                 <th>FatherName</th>
                 <th>Address</th>
                 <th>Mobile no</th>
                 <th>Password</th>
                 <th>Action</th>
            </tr>
      </thead>   
          <tbody>
                  {
                    Object.keys(Loadmemberregis).map((id,index)=>{
                        return(
                            <tr key={id}>
                                <td>{index+1}</td>
                                <td>{Loadmemberregis[id].member_id}</td>
                                <td>{Loadmemberregis[id].Name}</td>
                                <td>{Loadmemberregis[id].Father_name}</td>
                                <td>{Loadmemberregis[id].Address}</td>
                                <td>{Loadmemberregis[id].mobile_no}</td>
                                <td>{Loadmemberregis[id].password}</td>
                                <td className='text-center'>                     
                                <Link to={`/MemberUpdate/${id}`}>
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
export default MemberRegisReport;