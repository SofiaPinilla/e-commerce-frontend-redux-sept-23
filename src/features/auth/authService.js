import axios from "axios";

const API_URL = "http://localhost:8080/users";

const register = async (formData) => {
  const res = await axios.post(API_URL, formData);
  return res.data;
};

const login = async(formData)=>{
    const res = await axios.post(API_URL+"/login",formData)
    if(res.data){
        localStorage.setItem("token",JSON.stringify(res.data.token))
        localStorage.setItem("user",JSON.stringify(res.data.user))
    }
    return res.data //action.payload
}

const logout =async()=>{
    const token = JSON.parse(localStorage.getItem("token"))
    const res = await axios.delete(API_URL +"/logout",{
        headers:{
            Authorization:token
        }
    })
    if(res.data){
        localStorage.clear()
    }
    return res.data
}
const authService = {
  register,
  login,
  logout
};

export default authService;
