import React, { useState } from 'react';
import Line_Chart from './lineChart.js';
import jsonData from './analytic_data.json';
import Histogram from './histogram.js';
import './Dashboard.scss';

const months = Object.keys(jsonData.monthly_expenses);

export default function Dashboard() {
  const [selectedmonth, setselectedmonth] = useState(months[0]);
  const analyticsdata = jsonData;

  return (
    <div className='dashboard'>
      <h1 className='head1'>Expense Analytics</h1>

      <div className='analytics'>
        <div className='detail'>
          <pre>
            <span className='stat-label'>Total Users:</span> {analyticsdata.total_users}
          </pre>
        </div>
      </div>

      <div className='Graph'>
        <select onChange={(e) => setselectedmonth(e.target.value)} value={selectedmonth}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>

        <div className="chart-container">
          <Line_Chart month={selectedmonth} />
        </div>
        <div className="chart-container">
          <Histogram />
        </div>
      </div>
    </div>
  );
}
