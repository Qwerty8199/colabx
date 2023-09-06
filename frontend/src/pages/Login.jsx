import { useNavigate  } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../hooks/UseUser';

const Login = () => {

    const navigate = useNavigate();
    const { userState, updateUserData } = useUser();
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const goHome = () =>{
        navigate('/home')
    }

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        // Here, you can send the formData to your server or perform any other action.
        console.log('Form data submitted:', formData);

        try {
                const response = await axios.post("http://localhost:8081/auth/login", 
                formData);
                console.log(response)
            if (response.status === 200) {
                // Assuming your response contains user details and token
                const { user , jwt } = response.data;
                let username = user.username;
                let userid = user.userId
                console.log("resdetails",username,userid, jwt)
                let state = {
                    user: username,
                    userid : userid
                }
                console.log("setting now",state)
                updateUserData(state)
                console.log("userloaded",userState);
                // Store the token in local storage or a state management system like Redux
                localStorage.setItem('token', jwt);
                goHome()
                // Redirect to the authenticated section of your app
                // You can use React Router for navigation
                // Example: history.push('/dashboard');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        }catch (err) {
        setError('An error occurred while logging in. Please try again later.');
        }
    };

    const handleRegisterFormSubmit = async (e) => {
        e.preventDefault();
        // Here, you can send the formData to your server or perform any other action.
        console.log('Form data submitted:', formData);
        try {
            const response = await axios.post("http://localhost:8081/auth/register", 
            formData);
            console.log(response)
        if (response.status === 200) {
            setError('Registeration Successful.');
        } else {
            setError('Registeration failed. Please Try again.');
        }
    }catch (err) {
    setError('An error occurred while logging in. Please try again later.');
    }
};

    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-lg py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 🔐
                </h1>

                <form >
                    <div>
                        <label htmlFor='username'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='username'
                            placeholder='Your Email'
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button 
                            onClick={handleLoginFormSubmit}
                            className={`bg-green-400 py-2 px-4 text-sm text-white rounded border-1 border-green-600 focus:outline-none focus:border-green-900`}
                        >
                            Login
                        </button>
                        <button 
                            onClick={handleRegisterFormSubmit}
                            className={`bg-green-400 py-2 px-4 text-sm text-white rounded border-1 border-green-600 focus:outline-none focus:border-green-900`}
                        >
                            Register
                        </button>
                    </div>
                    <div>
                        {
                            error 
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;