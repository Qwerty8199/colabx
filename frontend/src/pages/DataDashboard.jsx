import { useState } from "react";
import axios from 'axios';
import LineChartComp from "../components/LineChartComp";
import { useUser } from "../hooks/UseUser";

const DataDashboard = () =>{

  const initialData = [];

  const { userState, updateUserData } = useUser();
  const { user, userId } = userState

  const [data, setData] = useState(initialData);
  const [selectedCategory, setSelectedCategory] = useState('O');

    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const jwt = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${jwt}`, // Assuming the token type is "Bearer"
        };
        // Here, you can send the formData to your server or perform any other action.
        let params = {
          ...formData,
          userId : 2
        }
        console.log('Form data submitted:', params);
        // console.log('Form data submitted:', dataToBeSent);
        axios.get(
          "http://localhost:8081/api/data/retrieve",{
            params: params,
            headers: headers
          })
          .then((response) => {
          console.log(response);
          let _data = response.data
          _data.sort((a, b) => new Date(a.date) - new Date(b.date));
          setData(_data)
          console.log(_data)
        });
      };

      const filteredData = data.filter((entry) => entry.category === selectedCategory);

      const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
      };

    return(
      <div>
        {user ? (
          <div>
            <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
              <form className="flex flex-wrap">
                <div className="w-1/2 pr-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                    Start Date
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    id="startDate"
                    type="date"
                    name="startDate"
                    placeholder="Select a date"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                    End Date
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    id="endDate"
                    type="date"
                    name="endDate"
                    placeholder="Select a date"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full mt-4">
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </form>
                <div>
                  <label>Select Category: </label>
                  <select value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="O">Overall</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Team Meeting">Team Meeting</option>
                    <option value="One - One Meeting">One - One Meeting</option>
                    {/* Add more category options as needed */}
                  </select>
                </div>
            </div>   
            <LineChartComp data={filteredData} /> 
          </div>
        ) : (
          <div>
          Authenticate Yourself!
          </div>
        )}
      </div>

    )
}

export default DataDashboard