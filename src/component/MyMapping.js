import React from "react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../Dashboard/AdminDashboard";
import SignIN from "../login/SignIn";
import SignUp from "../login/SignUp";
import StateRegis from "../location/StateRegis";
import StateReport from "../report/StateReport";
import CityReport from "../report/CityReport";
import CityRegis from "../location/CityRegis";
import AreaReport from "../report/AreaReport";
import AreaRegis from "../location/AreaRegis";
import ProductReport from "../report/ProductReport";
import Registration from "./Registration";
import ShopeType from "./ShopeType";
import ShopeTypeReport from "../report/ShopeTypeReport";
import OwnerDashboard from "../Dashboard/ShopekeeperDashboard";
import MemberDashboard from "../Dashboard/MemberDashboard";
import ProductName from "./ProductName";
import OwnerReport from "./OwnerReport";
import Signin from "./Signin";
import MemberLogin from "./MemberLogin";
import AppUser from "./AppUser";
import Home from "./Home";
import MemberRegisReport from "./MemberRegisReport";

const MyMapping = () => {

    return (

        <div>

            <MemoryRouter>
                {/* <Dashboard /> */}
                {/* <OwnerDashboard/> */}
                {/* <MemberDashboard/> */}
                {/* <Signin/> */}
                <Routes>
                    <Route path='/' element={<Signin />} />
                    <Route path='/signUp' element={< SignUp />} />
                    {/* <Route path='SignIn' element={<SignIm />} /> */}
                    <Route path='/Home' element={<Home />} />
                    <Route path='/Signout' element={< SignUp />} />
                    <Route path="/update/:id" element={<StateRegis />} />
                    <Route path="/cityupdate/:id" element={<CityRegis />} />
                    <Route path="/areaupdate/:id" element={<AreaRegis />} />
                    <Route path="/productupdate/:id" element={<ProductName />} />
                    <Route path="/ownerupdate/:id/:imgid" element={<Registration />} />
                    <Route path='/state' element={< StateRegis />} />
                    <Route path='/city' element={< CityRegis />} />
                    <Route path='/area' element={< AreaRegis />} />
                    <Route path='/shopeType' element={< ShopeType />} />
                    <Route path='/productname' element={<ProductName/>} />
                    <Route path='/registration' element={< Registration />} />
                    <Route path='/statereport' element={< StateReport />} />
                    <Route path='/cityreport' element={< CityReport />} />
                    <Route path='/areareport' element={< AreaReport />} />
                    <Route path='/productreport' element={< ProductReport />} />
                    <Route path='/ShopeTypeReport' element={< ShopeTypeReport />} />
                    <Route path='/OwnerReport' element={<OwnerReport/>} />
                    <Route path='/MemberLogin' element={<MemberLogin/>} />
                    <Route path='/AppUser' element={<AppUser/>} />
                    <Route path='/MemberRegisReport' element={<MemberRegisReport/>}/>
                
                </Routes>
            </MemoryRouter>

        </div>
    );

}
export default MyMapping;