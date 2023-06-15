export const Load_State_Table = 'Load_State_Table';
export const Load_City_Table = 'Load_City_Table';
export const Load_Area_Table = 'Load_Area_Table';
export const Load_Shope_Table = 'Load_Shope_Table';
export const Load_Product_Table = 'Load_Product_Table';
export const Load_MemberRegis_Table = 'Load_MemberRegis_Table';
export const Login_Member_Data = 'Login_Member_Data';
export const Load_Regisimage_Table = 'Load_Regisimage_Table';
export const Load_MemberRegistration_Table = 'Load_MemberRegistration_Table';
export const Load_Owner_Data = 'Load_Owner_Data';
export const Admin_Data_Table = "Admin_Data_Table";
export const Login_user_Data = 'Login_user_Data';

const loadData = 'https://beejbhandar-c3990-default-rtdb.firebaseio.com';

export const Load_StateData = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/state_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const state_data = await result.json();
            // console.log("Load_StateData---------", state_data);
            if (state_data) {

                dispatch({
                    type: Load_State_Table,
                    payload: state_data
                })
            }
            else {
                console.log("state data not data fetch");
            }
        }

        catch (error) {
            console.log("err in state try section");
        }
    }
}

export const Load_MemberRegisData = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/memberregis_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const memberregis_data = await result.json();
            console.log("Load_MemberRegisData---------", memberregis_data);
            if (memberregis_data) {

                dispatch({
                    type: Load_MemberRegis_Table,
                    payload: memberregis_data
                })
            }
            else {
                console.log("member regis data not data fetch");
            }
        }

        catch (error) {
            console.log("err in memberregis try section");
        }
    }
}

export const Load_ProductData = (mob) => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/product_table/${mob}.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const product_data = await result.json();
            console.log("Load_ProductData---------", product_data);
            if (product_data) {

                dispatch({
                    type: Load_Product_Table,
                    payload: product_data
                })
            }
            else {
                console.log("product data not data fetch");
            }
        }

        catch (error) {
            console.log("err in product try section");
        }
    }
}


export const Load_CityData = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/city_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const city_data = await result.json();
            // console.log("Load_CityData---------", city_data);
            if (city_data) {

                dispatch({
                    type: Load_City_Table,
                    payload: city_data
                })
            }
            else {
                console.log("city data not data fetch");
            }
        }

        catch (error) {
            console.log("err in city try section");
        }
    }
}
export const Load_AreaData = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/area_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const area_data = await result.json();
            // console.log("Load_AreaData ---------", area_data);
            if (area_data) {

                dispatch({
                    type: Load_Area_Table,
                    payload: area_data
                })
            }
            else {
                console.log("area data not data fetch");
            }
        }

        catch (error) {
            console.log("err in area try section");
        }
    }
}

export const Load_ShopeData = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/shope_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const shope_data = await result.json();
            // console.log("Load_ShopeData---------", shope_data);
            if (shope_data) {

                dispatch({
                    type: Load_Shope_Table,
                    payload: shope_data
                })
            }
            else {
                console.log("shope data not fetch");
            }
        }

        catch (error) {
            console.log("err in shope try section");
        }
    }
}


export const Loginadmin = (loginUser) => {
    return dispatch => {
        dispatch({
            type: Login_user_Data,
            payload: loginUser

        })

    }
}


export const Load_Owner = (stnm,ctnm,arnm) => {
    return async dispatch => {
          try {
            const result = await fetch(`${loadData}/registration_user/${stnm}/${ctnm}/${arnm}/user_reg.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            const report_data = await result.json();
            // console.log("data is ===",report_data)
            if (report_data) {

                dispatch({
                    type: Load_Owner_Data,
                    payload: report_data
                })
            }
            else {
                // console.log("owner data not data fetch");
            }
        }

        catch (error) {
            // console.log("err in owner try section");
        }
    }
}

export const Load_Owner_image = (stnm, ctnm, arnm) => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/registration_user/${stnm}/${ctnm}/${arnm}/user_regis_img.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const image_data = await result.json();
            console.log("img", image_data)
            if (image_data) {

                dispatch({
                    type: Load_Regisimage_Table,
                    payload: image_data
                })
            }
            else {
                console.log("registration image data not data fetch");
            }
        }

        catch (error) {
            console.log("err in image try section");
        }
    }
}
export const Admin_Details = () => {
    return async dispatch => {
        try {
            const result = await fetch(`${loadData}/admin_table.json`,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            const admin_data = await result.json();
            console.log("Admin_Data_Table........", admin_data)
            if (admin_data) {

                dispatch({
                    type: Admin_Data_Table,
                    payload: admin_data
                })
            }
            else {
                console.log("admin_data");
            }
        }

        catch (error) {
            console.log("err in admin_data try section");
        }
    }
}