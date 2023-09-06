import { useState } from "react";
import { useNavigate  } from 'react-router-dom'
import axios from 'axios';
import { useUser } from "../hooks/UseUser";

const Profile = () => {

    const { userState, updateUserData } = useUser();
    const { user, userid } = userState

    const navigate = useNavigate();

    console.log("user",user,userid)


    const logout = () => {
        let _user = {
            user : null,
            userid : null
        }
        updateUserData(_user)
        navigate('/login')
    }

    const deleteData = (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${jwt}`, // Assuming the token type is "Bearer"
        };
        // Here, you can send the formData to your server or perform any other action.
        let params = {
          userId : userid
        }
        console.log('Form data submitted:', params);
        // console.log('Form data submitted:', dataToBeSent);

        axios
            .delete("http://localhost:8081/api/data/del", {
                params: params,
                headers: headers
            })
            .then((response) => {
                console.log(response);
                if (response.status === 200) {
                alert("Data Deleted!!");
                } else {
                alert("Could not be deleted, Try again later..");
                }
            })
            .catch((error) => {
                console.error("An error occurred:", error);
                alert("An error occurred while deleting the data.");
            });
    }
    return(
        user ? 
        <div className="flex flex-col">
            UserName - {user}
            <button 
                onClick={deleteData}
                className="bg-white w-32 text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded-full" >
                Delete Data
            </button>

            <button 
                onClick={logout}
                className="bg-blue-700 w-32 text-white py-2 px-4 rounded-full" >
                LogOut
            </button>
        </div>
        :
        <div> Authenticate Yourself! </div>
    );
}

export default Profile;
