const INIT_STATE = {
    Loadstate: [],
    Loadcity: [],
    Loadarea: [],
    Loadshope: [],
    Loadproduct: [],
    Loadmemberregis: [],
    LoginMemberData: [],
    Loadimage: [],
    Ownervar: [],
    adminData:[],
    loginUser:[]
};


export const cartreducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "Load_Product_Table":
            return { ...state, Loadproduct: action.payload };
        case "Load_State_Table":
            return { ...state, Loadstate: action.payload };
        case "Load_City_Table":
            return { ...state, Loadcity: action.payload };
        case "Load_Area_Table":
            return { ...state, Loadarea: action.payload };
        case "Load_Shope_Table":
            return { ...state, Loadshope: action.payload };
        case "Load_MemberRegis_Table":
            return { ...state, Loadmemberregis: action.payload };
        case "Load_Owner_Data":
            return { ...state, Ownervar: action.payload };
        case "Load_Regisimage_Table":
            return { ...state, Loadimage: action.payload };
        case "Admin_Data_Table":
            return { ...state, adminData: action.payload };
        case "Login_user_Data":
            return { ...state, loginUser: action.payload };
        default:
            return state;
    }
}