import  React , { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { PokeContext } from "./PokeContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend 
  , PieChart, Pie,   Cell 
} from 'recharts';
import {  theme } from "../GlobalStyles";


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
      <text x={0} y={0} dy={9} textAnchor="middle" fill="#666" fontSize={15}>
        {payload.value}
      </text>
      <text x={0} y={16} dy={10} textAnchor="middle" fill="#999" fontSize={13}>
        {formatDay(payload.value)}
      </text>
    </g>
  );
};

const PokeTrack = () => {
  const { pokegoal, pokeId } = useParams();
  const { dispatch, state } = useContext(PokeContext);
  const nav = useNavigate();
  const [myJourney, setMyJourney] = useState({}); 
  const [myPokegoal, setMyPokegoal] = useState({}); 
  const [totalValue, setTotalValue] = useState(100);
  const [partialValue, setPartialValue] = useState(40);

    useEffect(() => {
        const rechartsWrapper = document.querySelector('.recharts-wrapper');
        if (rechartsWrapper) {
          rechartsWrapper.style.height = '450px';
        }
        setMyJourney(state.user.pokeGoals[pokegoal].myJourney)
        setMyPokegoal(state.user.pokeGoals[pokegoal]);
        setTotalValue(state.user.pokeGoals[pokegoal].daysInterval);
        setPartialValue(state.user.pokeGoals[pokegoal].checkDays);
      }, []);
    
      console.log("myJourneyValues", myPokegoal?.myJourneyValues);
  const days = Object.keys(myJourney).map(Number);



  const blueData = days.map((day) => {
    let level = 0;
    let value = 0;
    for (let i = 1; i <= day; i++) {
      // if (myJourney[i] !== 0) {
      if (myJourney[i]) {
        value = myPokegoal.myJourneyValues[day] && myPokegoal.myJourneyValues[day] ; 
        level += 1;
      }
    }
    return { day, level, value };
  });
  const greenData = days.map((day) => ({
    day,
    value: myPokegoal.myJourneyValues[day] || 0,
  }));
  // console.log("x", myPokegoal.myJourneyValues)
  const redData = days.map((day) => (myJourney[day] ? day : null));


  const remainingPercentage = 100 - ((partialValue / totalValue) * 100);

  const data = [
    { name: 'Your Performance', value: partialValue },
    { name: '.', value: totalValue - partialValue },
  ];
  const COLORS = [theme.colors.pokered, theme.colors.pokeblue];//, "white"
  return (<>
    {(myJourney && myPokegoal) && <div style={{"display": "flex",
     "flex-direction":"column", "align-items":"center",
     "width": "76%", "justify-content":"start"}}>
      <h3 style={{"margin": "0 0 0 32px" }}>PokeTrack</h3>
      <p style={{"margin": "10px 0 8px 32px"}}>First Day: <span style={{ textDecoration: 'underline' }}>{myPokegoal.firstDay}</span>  Last Day: <span style={{ textDecoration: 'underline' }}>{myPokegoal.lastDay}</span>  Your performance: <span style={{ textDecoration: 'underline' }}>{(100*myPokegoal.myPerformance).toFixed(1)}</span>%.</p>
      <LineChart width={700} height={500} data={blueData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          label={{ value: ' ', position: 'insideBottomRight', offset: -10 }}
        //   tick={{ fontSize: 10 }}
          tickFormatter={formatDay}
          // dy={-12}
          tick={<CustomXAxisTick />}
        />
 
        <YAxis label={{ value: 'LEVEL', angle: 0, position: 'top' }} dy={8} />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: 'PROGRESS', angle: 0, position: 'top', style: { fill: 'green' } }}
          dy={8}
          // labelOffset={-10}
        />
        <Tooltip />
        <Legend align="center" verticalAlign="top" height={36}
        />
        <Line type="monotone" dataKey="level" name="Your Journey" stroke="blue" strokeWidth={3} />
        <Line type="monotone" dataKey="day" name="Ideal scenario" stroke="red" strokeWidth={2} strokeDasharray="5 5" />
        <Line
              type="monotone"
              dataKey="value"
              name="Accumulative Progress"
              stroke="green"
              strokeWidth={2}
              yAxisId="right"
              connectNulls={true}
            />
      </LineChart>
      <h3 style={{"margin": "60px 32px 7px" }}>Performance</h3>
      <PieChart width={250} height={250}>
      <Pie
        dataKey="value"
        data={data}
        cx={120}
        cy={122}
        outerRadius={100}
        fill="#8884d8"
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
 
    </div>}</>
  );
};

export default PokeTrack;
