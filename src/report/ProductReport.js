import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Load_ProductData } from '../redux/action';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import database from '../component/firebase';
import OwnerDashboard from '../Dashboard/ShopekeeperDashboard';


const ProductReport = () => {
  
  const {Loadproduct, loginUser} = useSelector(state=> state.cartreducer);

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(Load_ProductData(loginUser.user_mobile));
    },[dispatch,loginUser]);
    

    console.log("Product table Data-----",Loadproduct);
  
    const onDelete = (id) => {
      if (window.confirm("are you sure to delete the record")) {
        database.ref(`product_table/${loginUser.user_mobile}/${id}`).remove((err) => {
          if (err) {
            alert("record is not deleted");
          }
          else {
            alert("record is deleted");
            dispatch(Load_ProductData());
          }
        }) 
      }
    }


    return (
   <>
   <OwnerDashboard/>
   <div className='container mt-5'>
      <div className='table-responsive-md'>
    <table className='table table-striped table-bordered table-hover'
    > 
      <thead className='bg-dark text-white'>     
            <tr>
                 <th>sno</th>
                 <th>name</th>
                 <th>product_id</th>
                 <th>product_Detail</th>
                 <th>price</th>
                 <th>photo</th>
                 <th>Action</th>
            </tr>
      </thead>   
          <tbody>
                  {
                    Object.keys(Loadproduct).map((id,index)=>{
                        return(
                            <tr key={id}>
                                <td>{index+1}</td>
                                <td>{Loadproduct[id].name}</td>
                                <td>{Loadproduct[id].product_id}</td>
                                <td>{Loadproduct[id].product_Detail}</td>
                                <td>{Loadproduct[id].price}</td>
                                <td>
                                  <img src = {Loadproduct[id].photo}height="60px" width="60px"/>
                                </td>  
                                <td>                     
                                <Link to={`/productupdate/${id}`}>
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

export default ProductReport;