import { useState } from "react";
import axios from 'axios';
import { useUser } from "../hooks/UseUser";

const RecordFrom = () => {

    const { userState, updateUserData } = useUser();
    
    const { user, userid } = userState
    console.log(user,userid, userState)

    const Categories = ['Overall', 'Presentation', 'Team Meeting','One - One Meeting'];
    const ListeningLevel = [1,2,3];


    const [formData, setFormData] = useState({
        date: '',
        category: 'Overall',
        value: '1',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(name,value)
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you can send the formData to your server or perform any other action.
        const jwt = localStorage.getItem('token');
        console.log("sending",jwt)
        const headers = {
          'Authorization': `Bearer ${jwt}`, // Assuming the token type is "Bearer"
          'Content-Type': 'application/json' // Adjust as needed for your API
        };
        let dataToBeSent = {
          ...formData,
          userId: userid
        }
        console.log('Form data submitted:', dataToBeSent);
        axios.post(
          "http://localhost:8081/api/data",
          dataToBeSent,
          { headers: headers }
        ).then((response) => {
          console.log(response);
        });
      };

    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-4">My Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
              Date
            </label>
            <input
            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            id="date"
            type="date"
            name="date"
            placeholder="Select a date"
            value={formData.date}
            onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            >
                {Categories.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
              Listening Level
            </label>
            <select
            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
            id="value"
            name="value"
            value={parseFloat(formData.value)}
            onChange={handleInputChange}
            >
                {ListeningLevel.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
                ))}
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  export default RecordFrom;

  
  
  