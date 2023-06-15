import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Load_RegistrationData, Load_AreaData, Load_CityData, Load_StateData, Load_Owner, Load_Owner_image } from '../redux/action';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import database from './firebase';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AdminDashboard from '../Dashboard/AdminDashboard';
import MemberDashboard from '../Dashboard/MemberDashboard';
const initialData = {
    state_name: "",
    city_name: "",
    area_name: "",
    user_mobile: "",
    search: ""
}
let cityDataArray = [];
let areaDataArray = [];
let tempAppUsersArray = [];
let imgid;
const AppUser = () => {
    const [state, setState] = useState(initialData);
    const { Loadstate, Loadcity, Loadarea, Loadimage, Ownervar,loginUser } = useSelector(state => state.cartreducer);
    // console.log("Loadcity data,,,,,,,,,,,,,,,,,,",Loadcity);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(Load_CityData());
        dispatch(Load_AreaData());
        dispatch(Load_StateData());
    }, [dispatch]);
    // console.log("registration data......", Loadimage);
    // let loginData = LoginMemberData.Name;
        console.log("loginUser.............",loginUser.Name );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let stnm = state.state_name;
        let ctnm = state.city_name;
        let arnm = state.area_name;
        dispatch(Load_Owner(stnm, ctnm, arnm));
        dispatch(Load_Owner_image(stnm, ctnm, arnm));
    }
    cityDataArray = [];
Object.key(Loadcity).map((id,index)=>{
    if(state.state_name===Loadcity[id].state_name){
        cityDataArray.push(Loadcity[id].city_name)
    }
})
    console.log("cityDataArray...........",cityDataArray);
    areaDataArray = [];
    Object.keys(Loadarea).map((id, index) => {
        if (state.city_name === Loadarea[id].city_name) {
            areaDataArray.push(Loadarea[id].area_name)
        }
    })

    tempAppUsersArray = [];
    Object.keys(Ownervar).map(key => {
        console.log("compherison...........",loginUser.Name, '===',Ownervar[key].registrationBy);
            if(loginUser.Name===Ownervar[key].registrationBy){
            tempAppUsersArray.push({ key, value: (Ownervar[key]) });
        }
    })
    
    if (state.search) {
        tempAppUsersArray = tempAppUsersArray.filter(name => (name.value.shop_name).match(new RegExp(state.search, "i")) ||
            (name.value.registrationBy).match(new RegExp(state.search, "i")))
    }
    const onDelete = (id) => {
        let stnm = state.state_name;
        let ctnm = state.city_name;
        let arnm = state.area_name;
        if (window.confirm("are you sure want to delete the record")) {
            database.ref(`registration_user/${stnm}/${ctnm}/${arnm}/user_reg/${id}`).remove((err) => {
                if (err) {
                    alert("record is not deleted");
                }
                else {
                    Object.keys(Loadimage).map((id1, index) => {
                        let mob = Ownervar[id].user_mobile;
                        if (Ownervar[id].user_mobile === id1) {
                            Object.keys(Loadimage[id1]).map((id2, index) => {
                                database.ref(`registration_user/${stnm}/${ctnm}/${arnm}/user_regis_img/${mob}/${imgid}`).remove();
                                alert("data is deleted");
                                dispatch(Load_Owner(stnm, ctnm, arnm));
                                dispatch(Load_Owner_image(stnm, ctnm, arnm));
                            });
                        }
                    });
                }
            });
        }
    };
    return (
        <>
            <MemberDashboard />
            <div className="  " style={{ backgroundColor: "#0B0B45" }}>
                <div className=" container-fluid py-2"
                    style={{ backgroundColor: "red" }}>
                    <h2 className=" text-center  text-light">App User Data</h2>
                </div>
                <form className="container border border-dark" onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={3}>
                            <h6 className="text-warning form-group">State Name</h6>
                            <select
                                name="state_name"
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option>select state name</option>
                                {Object.keys(Loadstate).map((id, index) => {
                                    return (
                                        <option>{Loadstate[id].state_name}</option>
                                    );
                                })}
                            </select>
                        </Col>
                        <Col xs={3}>
                            <h6 className="text-warning form-group">City Name</h6>
                            <select
                                name="city_name"
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option>select city name</option>
                                {Object.keys(cityDataArray).map((id, index) => {
                                    return <option>{cityDataArray[id]}</option>;
                                })}
                            </select>
                        </Col>
                        <Col xs={3}>
                            <h6 className="text-warning form-group">Area Name</h6>
                            <select
                                name="area_name"
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option> select area name</option>
                                {Object.keys(areaDataArray).map((id, index) => {
                                    return <option>{areaDataArray[id]}</option>;
                                })}
                            </select>
                        </Col>
                        <Col xs={3}>
                            <br></br>
                            <Button type="submit" className="btn btn-warning btn ">
                                Search
                            </Button>
                        </Col>
                    </Row>
                </form>
            </div>
            <div className="container mt-1 d-flex justify-content-end "
            >
                <Col xs={2}>
                    <input type="search"
                        name="search"
                        className=" form-control "
                        style={{ border: "2px dashed yellow" }}
                        onChange={handleChange}
                        placeholder="search here"
                    />
                </Col>
            </div>
            <>
                <div className='container-fluid mt-3'>
                    <div className='table-responsive-md'>
                        <table className='table table-striped table-bordered table-hover'>
                            <thead className='bg-warning text-white'>
                                <tr>
                                    <th>Sno</th>
                                    <th>registrationBy</th>
                                    <th>Registration_id</th>
                                    <th>shopareapincode</th>
                                    <th>shopaddress</th>
                                    <th>city_name</th>
                                    <th>area_name</th>
                                    <th>state_name</th>
                                    <th>shop_name</th>
                                    <th>shope_type</th>
                                    <th>user_mobile</th>
                                    <th>image</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Object.keys(tempAppUsersArray).map((id, index) => {
                                        // console.log("key  is ",tempAppUsersArray[id].key);
                                        return (
                                            <tr key={id}>
                                                <td>{index + 1}</td>
                                                <td>{tempAppUsersArray[id].value.registrationBy}</td>
                                                <td>{tempAppUsersArray[id].value.Registration_id}</td>
                                                <td>{tempAppUsersArray[id].value.shopareapincode}</td>
                                                <td>{tempAppUsersArray[id].value.shopaddress}</td>
                                                <td>{tempAppUsersArray[id].value.city_name}</td>
                                                <td>{tempAppUsersArray[id].value.area_name}</td>
                                                <td>{tempAppUsersArray[id].value.state_name}</td>
                                                <td>{tempAppUsersArray[id].value.shop_name}</td>
                                                <td>{tempAppUsersArray[id].value.shope_type}</td>
                                                <td>{tempAppUsersArray[id].value.user_mobile}</td>
                                                <td>{
                                                    Object.keys(Loadimage).map((id1, index) => {
                                                        if (tempAppUsersArray[id].value.user_mobile === id1) {
                                                            // console.log("global.loadimg-----------", global.loadimg)
                                                            Object.keys(Loadimage[id1]).map((id2, index) => {
                                                                imgid = id2;
                                                                global.loadimg = (Loadimage[id1])[id2].imgdata;
                                                            })
                                                            return (
                                                                <>
                                                                    <img src={global.loadimg} height="40" width="40" />
                                                                </>
                                                            )
                                                        }
                                                    })
                                                } </td>
                                                <td className='text-center'>
                                                    <Link to={`/ownerupdate/${tempAppUsersArray[id].key}/${imgid}`}>
                                                        <button
                                                            className='btn'
                                                            style={{ backgroundColor: "aqua" }}
                                                        >
                                                            edit
                                                        </button>
                                                    </Link>
                                                    <button
                                                        className="btn btn-danger"
                                                        onClick={() => onDelete(tempAppUsersArray[id].key)(imgid)}
                                                    >
                                                        delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        </>
    );
}
export default AppUser;