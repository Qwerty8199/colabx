import { useEffect, useState } from "react";
import axios from 'axios';
import Navbar from "../components/HomeBar";
import RecordFrom from "../components/RecordForm";
import { useUser } from "../hooks/UseUser";
import LineChartComp from "../components/LineChartComp";

const Home = () => {

    const { userState, updateUserData } = useUser();
    const { user, userId } = userState

    const [filterOption, setFilterOption] = useState('O');
    const Categories = ['Presentation', 'Team Meeting','One - One Meeting'];
    const DeterminedInferedText = ['Stagnant','Need Improvement', 'Almost at the top']

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inferedText, setInferedText] = useState(null);

    const today = new Date();
    const sevenDaysAgo = new Date(today);


    useEffect(() => {

        if(!user){
            return;
        }
        console.log("running useeffect");
        sevenDaysAgo.setDate(today.getDate() - 7);
        const todayString = formatDate(today);
        const sevenDaysAgoString = formatDate(sevenDaysAgo);
        

        let params = {
            startDate: sevenDaysAgoString,
            endDate: todayString,
            userId: 2
          }
        const jwt = localStorage.getItem('token');
        const headers = {
        Authorization: `Bearer ${jwt}`, // Assuming the token type is "Bearer"
        // 'Content-Type': 'application/json', // Adjust as needed for your API
        };
        // console.log("params",params)
        const apiUrl = 'http://localhost:8081/api/data/retrieve'; // Replace with your API endpoint URL
        axios
        .get(apiUrl,{
            params: params,
            headers: headers
          })
        .then((response) => {
            let _data =response.data; // Update state with the received data
            _data.sort((a, b) => new Date(a.date) - new Date(b.date));
            setData(_data)
            setLoading(false); // Set loading to false
        })
        .catch((error) => {
            setError(error); // Handle any errors
            setLoading(false); // Set loading to false
        });
    }, []); 

    const handleFilterChange = (event) => {
        const selectedOption = event.target.value;
        setFilterOption(selectedOption);
        
        // console.log("filtered",filteredData);
        let arr = []
        filteredData.forEach(element => {
            arr.push(element.value)
        });
        let avg = AnalyzeTrend(arr)
        setInferedText(avg)
      };


      const filteredData = data.filter((entry) => entry.category === filterOption);

    return (
         user ? 
            <div className="flex ">
                    <div >
                        Last 7 days Data
                        <LineChartComp data={filteredData} />
                        <select
                            className="w-full px-3 py-2 leading-tight border rounded-lg shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300"
                            id="category"
                            name="category"
                            value={filterOption}
                            onChange={handleFilterChange}
                            >
                            <option value="O">Overall</option>
                            {Categories.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                        { filterOption }
                        { DeterminedInferedText[inferedText] }
                    </div>
                <RecordFrom /> 
            </div>
            :
            <div> Authenticate Yourself! </div>

    );
};


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

const AnalyzeTrend = (arr) => {
    console.log("arr",arr)
    let dailyChange = []
    let dailyChangeSum = 0
    for(let i=1; i<arr.length; i++){
        let temp = arr[i-1]-arr[i]
        dailyChangeSum += temp
        dailyChange.push(temp)
    }
    let avgDailyChange = dailyChangeSum/dailyChange.length
    console.log(dailyChangeSum, avgDailyChange)
    if(avgDailyChange > 0){
        return 2
    }else if (avgDailyChange < 0){
        return 1
    }else{
        return 0
    }
}

export default Home;