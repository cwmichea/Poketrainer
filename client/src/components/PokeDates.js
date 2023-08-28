import React from 'react'
import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";

const PokeDates = ({pokemon, pokegoal, step2, pokeId}) => {
  const [checkpointActive, setCheckpointActive] = useState(false);
  const [startDate, setStartDate] = useState(null); 
  const [dueDate, setDueDate] = useState(null); 
  const [day1, setDay1] = useState(""); 
  const [day0, setDay0] = useState(""); 
  const { dispatch, state } = useContext(PokeContext);
  const [myPokeGoal, setMyPokeGoal] = useState(state.user.pokeGoals[pokegoal]);

  const [selectedInterval, setSelectedInterval] = useState(null);
  const [daysInterval, setDaysInterval] = useState(null);
  useEffect( () => {
    setMyPokeGoal(state.user.pokeGoals[pokegoal]);
  }, []) 

  useEffect( () => {
    console.log(pokegoal);
    console.log(myPokeGoal);
    console.log(myPokeGoal.firstDay);
    const parsedDate = new Date(myPokeGoal.firstDay);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setStartDate(formattedDate);
    // setStartDate(myPokeGoal.firstDay);
  }, [myPokeGoal])

  useEffect(() => {
    if (selectedInterval) {
      const intervalInDays = parseInt(selectedInterval, 10);
      const calculatedDueDate = new Date(startDate);
      calculatedDueDate.setDate(calculatedDueDate.getDate() + intervalInDays);
      setDueDate(calculatedDueDate.toISOString().split('T')[0]);
    } 
    // else {
    //   setDueDate(null); // Reset dueDate if selectedInterval is null
    // }
  }, [selectedInterval, startDate]);

  const formattedStartDate = startDate ? new Date(startDate).toISOString().split('T')[0] : '';

  function calculateDaysDiff(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end - start);
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    // if (daysDiff != 15 || daysDiff != 30 || 
    //   daysDiff != 45 || daysDiff != 60 || daysDiff != 0) {    }
    return daysDiff;
  }

  const getDay = (dateString) => {
    const date = new Date(dateString);
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    console.log(dayOfWeek);
    return dayOfWeek;
  }

  const handleDates = () => {
    // const inputDate = '2023-08-25T03:01:36.654Z';
    // const parsedDate = new Date(inputDate);
    // const parsedDate = new Date(startDate);
    // const year = parsedDate.getFullYear();
    // const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    // const day = String(parsedDate.getDate()).padStart(2, '0');
    // const formattedDate = `${year}-${month}-${day}`;
    // setStartDate(formattedDate);
    console.log(daysInterval);
    let myGoalDates = {
      firstDay: startDate,
      lastDay: dueDate,
      daysInterval: daysInterval,
      day1: day1,
      day0: day0,
    }
    console.log(myGoalDates);
    fetch(`setgoaldates/${pokegoal}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myGoalDates), // Replace and add fields
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
        console.log("pokegoalUpdated",data.pokegoalUpdated);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch or processing
        console.error('Fetch error:', error);
      });
  }

  useEffect(() => {
    let daysDiff = calculateDaysDiff(startDate, dueDate);
    setDaysInterval(daysDiff);
    setDay1(getDay(startDate));
    setDay0(getDay(dueDate));
  }, [dueDate])

  return (<>
    <Header>
      <div>3step: set due date</div>
    <div style={{"display":"flex", "alignItems": "center"}}>
      <Checkpoint active={checkpointActive}
                  onClick={() => {setCheckpointActive(!checkpointActive);
                    console.log("goal type", "");
                                  }}/>
        <div style={{"display":"grid"}}>
        <p style={{"margin":"3px"}}>
          {startDate && (`StartDate: ${startDate}`)}
        </p> 
        <p style={{"margin":"3px"}}>
          {startDate && (`DueDate: ${dueDate}`)}
        </p>         
        <p style={{"margin":"3px"}}>
          {daysInterval && (`Keep your new habit for ${daysInterval} days`)}
        </p> 
        </div>
    </div>
    </Header>
    {checkpointActive && (<div>
      <div>
        <p>Enter your first day</p>
        <Input defaultValue={formattedStartDate}
        value={startDate || ''}
        type='date' onChange={e => setStartDate(e.target.value)}/>
      </div>
      <div>
        <p>Enter your last day</p>
        <Input type='date' 
        onChange={e => setDueDate(e.target.value)}
        min={formattedStartDate}
        value={dueDate || ''}/>
      </div>
      <div>
          {/* ... (other input fields) */}
          <div>
            <p>Select An Interval:</p>
            <IntervalRadioGroup>
              <IntervalRadio
                type="radio"
                id="interval15"
                name="interval"
                value="15"
                onChange={e => setSelectedInterval(e.target.value)}
              />
              <StyledLabel htmlFor="interval15"
              crossed={daysInterval != '15'}
              >15 days</StyledLabel>              
              <IntervalRadio
                type="radio"
                id="interval30"
                name="interval"
                value="30"
                onChange={e => setSelectedInterval(e.target.value)}
              />
              <StyledLabel htmlFor="interval30"
              crossed={daysInterval != '30'}
              >30 days</StyledLabel>              
              <IntervalRadio
                type="radio"
                id="interval45"
                name="interval"
                value="45"
                onChange={e => setSelectedInterval(e.target.value)}
              />
              <StyledLabel htmlFor="interval45"
              crossed={daysInterval != '45'}
              >45 days</StyledLabel>
              <IntervalRadio
                type="radio"
                id="interval60"
                name="interval"
                value="60"
                onChange={e => setSelectedInterval(e.target.value)}
              />
              <StyledLabel htmlFor="interval60"
              crossed={daysInterval != '60'}
              >60 days</StyledLabel>

              {/* ... (other radio inputs) */}
            </IntervalRadioGroup>
          </div>
          {(startDate && dueDate) && (
            <div>
              <p>From: {day1} {startDate}.</p>
              <p>To:   {day0} {dueDate}.</p>
              <h3>Number of days from Start Date: <MySpanInterval>{calculateDaysDiff(startDate, dueDate)}</MySpanInterval></h3>
            </div>
          )}
          <Button disabled={!dueDate}
          style={{"margin-top":"12px"}}
          onClick={handleDates}>Set Date</Button>
        </div>
      <div>
        <img src=''/>
      </div>
      </div>)}
    </>)
}

export default PokeDates

const Header = styled.div`
  background-color: ${theme.colors.pokeblue};
  color: white;
  padding: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%
`;
const Checkpoint = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${props => (props.active ? 'green' : 'white')};
  border-radius: 50%;
  margin: 0 7px;
`;
const Input = styled.input`
  font-size: 16px;
  // background-color: ${theme.colors.pokeblue};
  border-radius: 5px;
  // color: white;
  border: none;
`
 
const Button = styled.button`
// margin-top: 10px;
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
`;
const IntervalRadioGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const IntervalRadio = styled.input`
  // display: none; /* Hide the default radio input */
`;

const MySpanInterval = styled.span`
background-color: ${theme.colors.pokeyellow};
padding: 10px;
border-radius: 50%;
font-size: 22px;
`

const StyledLabel = styled.label`
  display: inline-block;
  padding: 5px 10px;
  background-color: ${props =>
    props.crossed ? theme.colors.pokewhite : theme.colors.pokeblue}; /* Change background color if crossed */
  color: ${props => (props.crossed ? 'gray' : 'white')}; /* Change text color if crossed */
  border-radius: 5px;
  cursor: pointer;
  text-decoration: ${props => (props.crossed ? 'line-through' : 'none')}; /* Add line-through if crossed */
`;
