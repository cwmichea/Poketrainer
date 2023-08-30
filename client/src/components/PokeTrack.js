import React , { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const formatDay = (day) => {
  const date = new Date();
  date.setDate(day);
  const dayStr = date.getDate().toString().padStart(2, '0');
  const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
  return `${dayStr}/${monthStr}`;
};

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={14}>
        {payload.value}
      </text>
      <text x={0} y={16} dy={16} textAnchor="middle" fill="#999" fontSize={10}>
        {formatDay(payload.value)}
      </text>
    </g>
  );
};

const PokeTrack = () => {
    useEffect(() => {
        const rechartsWrapper = document.querySelector('.recharts-wrapper');
        if (rechartsWrapper) {
          rechartsWrapper.style.height = '450px';
        }
      }, []);
    
  const myJourney = {
    0: false,
    1: true,
    2: true,
    3: false,
    4: true,
    5: true,
    6: false,
    7: true,
    8: false,
    // ... rest of the days
  };
  
  const days = Object.keys(myJourney).map(Number);
  const redData = days.map((day) => (myJourney[day] ? day : null));
  const blueData = days.map((day) => {
    let level = 0;
    for (let i = 1; i <= day; i++) {
      if (myJourney[i]) {
        level += 1;
      }
    }
    return { day, level };
  });

  const pokegoal1 = {
    firstDay: new Date().toLocaleDateString(),
  };

//   const CustomTopXAxisTick = ({ x, y, payload }) => {
//     return (
//       <g transform={`translate(${x},${y})`}>
//         <text x={0} y={0} dy={-16} textAnchor="middle" fill="#666" fontSize={12}>
//           {formatDay(payload.value)}
//         </text>
//       </g>
//     );
//   };
  
//   const CustomBottomXAxisTick = ({ x, y, payload }) => {
//     return (
//       <g transform={`translate(${x},${y})`}>
//         <text x={0} y={0} dy={16} textAnchor="middle" fill="#666" fontSize={12}>
//           {payload.value}
//         </text>
//       </g>
//     );
//   };
  return (
    <div>
      <h2>PokeTrack</h2>
      <p>First Day: {pokegoal1.firstDay}</p>
      <LineChart width={600} height={300} data={blueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          label={{ value: 'DAYS', position: 'insideBottomRight', offset: -10 }}
        //   tick={{ fontSize: 10 }}
          tickFormatter={formatDay}
          tick={<CustomXAxisTick />}
        />
        {/* <XAxis
          dataKey="day"
          axisLine={false}
          tick={<CustomTopXAxisTick />}
        />
        <XAxis
          dataKey="day"
          axisLine={false}
          tick={<CustomBottomXAxisTick />}
          tickFormatter={formatDay}
        /> */}
        <YAxis label={{ value: 'LEVEL', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Legend align="center" verticalAlign="top" height={36}
        // verticalAlign="bottom" 
        // height={106} 
        />
        <Line type="monostone" dataKey="level" name="Your Journey" stroke="blue" strokeWidth={3} />
        <Line type="monotone" dataKey="day" name="Ideal scenario" stroke="red" strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </div>
  );
};

export default PokeTrack;
// import React from 'react';
// import { Line } from 'react-chartjs-2';

// const PokeTrack = () => {
//   const myJourney = {
//     1: true,
//     2: true,
//     3: false,
//     4: true,
//     5: true,
//     6: false,
//     7: true,
//     8: false,
//     // ... rest of the days
//   };
//   const days = Object.keys(myJourney).map(Number);
//   const redData = days.map((day) => (myJourney[day] ? day : 0));
//   const blueData = days.map((day) => {
//     let level = 0;
//     for (let i = 1; i <= day; i++) {
//       if (myJourney[i]) {
//         level += 1;
//       }
//     }
//     return level;
//   });

//   const pokegoal1 = {
//     firstDay: new Date().toLocaleDateString(),
//   };
//   const data = {
//     labels: days,
//     datasets: [
//       {
//         label: 'Red Line',
//         data: redData,
//         fill: false,
//         borderColor: 'red',
//         borderWidth: 1,
//         pointRadius: 0,
//       },
//       {
//         label: 'Blue Line',
//         data: blueData,
//         fill: false,
//         borderColor: 'blue',
//         borderWidth: 2,
//         pointRadius: 0,
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       xAxes: [
//         {
//           scaleLabel: {
//             display: true,
//             labelString: 'DAYS',
//           },
//         },
//       ],
//       yAxes: [
//         {
//           scaleLabel: {
//             display: true,
//             labelString: 'LEVEL',
//           },
//           ticks: {
//             beginAtZero: true,
//           },
//         },
//       ],
//     },
//   };

//   return (
//     <div>
//       <h2>PokeTrack</h2>
//       <p>First Day: {pokegoal1.firstDay}</p>
//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default PokeTrack;