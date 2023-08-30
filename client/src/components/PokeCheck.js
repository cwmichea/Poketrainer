import React  from 'react'
import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";

const PokeCheck = () => {
  const { dispatch, state } = useContext(PokeContext);
  const { pokeId, pokemon, pokegoal } = useParams();
  const [myPokeGoal, setMyPokeGoal] = useState(state.user.pokeGoals[pokegoal]);
  const [dateArray, setDateArray] = useState([]);
  const [weekdays, setWeekdays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  const [daysObj, setDaysObj] = useState(state.user.pokeGoals[pokegoal].myJourney || {});
  const [afirstDay, setaFirstDay] = useState(state.user.pokeGoals[pokegoal].firstDay || "");
  const [alastDay, setaLastDay] = useState(state.user.pokeGoals[pokegoal].lastDay || "");
  const [fillOut, setFillOut] = useState(false);
  const [checkDays, setCheckDays] = useState(0);

  useEffect(() => {
    if (!state) {
      fetch(`/get-user/${pokeId}`)
        .then(res => res.json())
        .then(data => {
          dispatch({ type: 'ASSIGN_USER', payload: data.data });
        })
        .catch(error => {
          console.error('Error fetching API data:', error);
        });
    }

    const startDate = afirstDay ? new Date(myPokeGoal.firstDay.slice(0, 10))
                                : new Date(state.user.pokeGoals[pokegoal].firstDay);
    // const startDate = new Date('2023-08-24');
    // const startDate = new Date('2023-08-24'.slice(0, 10));
    // const startDate = new Date('2023-08-24T00:00:00Z');

    const endDate = alastDay ?  new Date(myPokeGoal.lastDay.slice(0, 10))
                             :  new Date(state.user.pokeGoals[pokegoal].lastDay);

    const realEndDate = new Date(endDate.setDate(endDate.getDate() + 1));
    // const endDate = new Date('2023-10-23');
    // const endDate = new Date('2023-10-23'.slice(0, 10));

    const currentDate = new Date(startDate.setDate(startDate.getDate() + 1));
    const newDateArray = [];
    let totalDays = 0;
    while (currentDate <= endDate) {//realEndDate
      newDateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      totalDays++;
    }
    console.log("totaldays", totalDays);
    console.log("startDate", startDate);
    console.log("endDate", endDate);
    console.log("state.user.pokeGoals[pokegoal]", state.user.pokeGoals[pokegoal] );
 

    setDaysObj(prevDaysObj => {
      const initialDaysObj = {};
      // for (let i = 1; i <= totalDays; i++) {
      //   initialDaysObj[i] = false;
      // }
      for (let i = 1; i <= totalDays; i++) {
        initialDaysObj[i] = prevDaysObj[i] || false;
      }
      return initialDaysObj;
    });

    // const initialDaysObjArray = Array.from({ length: totalDays }, () => false);
    // const initialDaysObj = initialDaysObjArray.reduce((obj, value, index) => {
    //   obj[index + 1] = value;
    //   return obj;
    // }, {});
    // setDaysObj(initialDaysObj);

    setDateArray(newDateArray);
    console.log("my pokegoal", myPokeGoal)
    setFillOut(true);
  }, [state]);

  // useEffect( () => {
  //   // console.log("daysobj", daysObj);
  //   if (daysObj) {
      
  //   }
  // }, [fillOut])

 useEffect( () => {
  let trueCount = 0;
  if (daysObj) {
    trueCount = Object.values(daysObj).reduce((count, value) => count + (value ? 1 : 0), 0);
    console.log("Number of true values:", trueCount);
  }
  setCheckDays(trueCount);
  }, [daysObj])

  const today = new Date();
  const todayIndex = dateArray.findIndex(
    date =>
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
  );

  // const firstDayIndex = (dateArray[0].getDay() + 6) % 7;
  const firstDayIndex = dateArray.length > 0 ? (dateArray[0].getDay() + 6) % 7 : 0;
  const monthAbbreviations = [
    'Ja', 'Fe', 'Mr', 'Ap', 'My', 'Jn', 'Jl', 'Au', 'Se', 'Oc', 'No', 'De'
  ];
  const handleCheckboxChange = (dayNumber) => {
    setDaysObj(prevDaysObj => ({
      ...prevDaysObj,
      [dayNumber]: !prevDaysObj[dayNumber] // Toggle the value
    }));
  };
  console.log("days",daysObj);

  const handleSetDays = () =>{
    console.log("update", daysObj);
    console.log("checkDays", checkDays);
    fetch(`setgoaldays`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({daysObj, checkDays}), // Replace and add fields
    })
      .then(res => {
        // if (!res.ok) {
        //   throw new Error('Network response was not ok');
        // }
        return res.json(); // Parse the JSON data 
      })
      .then(data => {
        // Work with the parsed data
        // dispatch({type: "ASSIGN_GOAL", payload: data.data});
        console.log("data",data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch or processing
        console.error('Fetch error:', error);
      });
  }

  return (<div style={{"display": "flex", "flex-direction":"column"}}>
<CalendarContainer>
      <WeekdaysRow>
        {weekdays.map(weekday => (
          <div key={weekday}>{weekday}</div>
        ))}
      </WeekdaysRow>
      <CalendarGrid>
        {Array.from({ length: firstDayIndex }).map((_, index) => (
          <DayBox key={`empty-${index}`} />
        ))}
        {dateArray && dateArray.map((date, index) => (
          <DayBox key={index} isCurrentDate={index === todayIndex}>
            <div>{date.getDate()}  {monthAbbreviations[date.getMonth()]}</div>
            <label>
              <input type="checkbox" 
               checked={daysObj[index + 1] || false}
              onChange={() => handleCheckboxChange(index + 1)}
              />
              Daily task
            </label>
            <div>{index + 1}</div>
          </DayBox>
        ))}
      </CalendarGrid>
    </CalendarContainer>
    <Button onClick={handleSetDays}>
    Update my Daily-Task Journey</Button>
    </div>
  )
}

export default PokeCheck
const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`;

const DayBox = styled.div`
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background-color: ${props =>
    props.isCurrentDate ? 'lightblue' : 'transparent'};
`;

const WeekdaysRow = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: bold;
  margin-bottom: 8px;
`;
const Button = styled.button`
  margin: 20px 10px ;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${theme.colors.pokeblue};
  border-radius: 12px;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    // background-color: #f5f5f5;
    background-color: ${theme.colors.pokeyellow};
  }
  &:disabled {
    background-color: gray; /* Change the color to gray */
  }
`;