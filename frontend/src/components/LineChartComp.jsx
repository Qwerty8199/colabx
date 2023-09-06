import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

function LineChartComp({ data }) {
    if(data.length == 0){
        return(
            <div>
                No Data
            </div>
        )
    }
    return (
        <div style={{ margin: '20px' }}>
          <h2>Line Chart</h2>
          <LineChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis type="number" domain={[0, 3]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              name="Value"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5, fill: '#8884d8' }}
            />
          </LineChart>
        </div>
      );
    }
export default LineChartComp;