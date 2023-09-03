import React  from 'react'
import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";
import wpokeball from "../pics/whitepokeball.png";
const getInitialVisibility = (values) => {
  const initialVisibility = {};
  for (const index in values) {
    initialVisibility[index] = true; // Set to true if the index exists in values
  }
  return initialVisibility;
};

const PokeCheck = () => {
  const nav  = useNavigate();
  const { dispatch, state } = useContext(PokeContext);
  const { pokeId, pokemon, pokegoal } = useParams();
  const [myPokeGoal, setMyPokeGoal] = useState(state.user.pokeGoals[pokegoal]);
  const [dateArray, setDateArray] = useState([]);
  const [weekdays, setWeekdays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']);
  const [daysObj, setDaysObj] = useState(state.user.pokeGoals[pokegoal].myJourney || {});
  const [afirstDay, setaFirstDay] = useState(state.user.pokeGoals[pokegoal].firstDay || "");
  const [alastDay, setaLastDay] = useState(state.user.pokeGoals[pokegoal].lastDay || "");
  const [fillOut, setFillOut] = useState(false);
  const [checkDays, setCheckDays] = useState(state.user.pokeGoals[pokegoal].checkDays || 0);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(state.user.pokeGoals[pokegoal].myJourneyValues || "");
  const [inputVisibility, setInputVisibility] = useState(getInitialVisibility(values)  || {});
  useEffect(() => {
    // setCheckDays(0);
    let myGoalDays = state.user.pokeGoals[pokegoal].myJourney;
    if(state.user.pokeGoals[pokegoal]?.checkDays == 0){
      myGoalDays = {};
      let myDaysObj = Object.keys(daysObj)
      myDaysObj.forEach((key) => {
        myGoalDays[key] = false;
      });}
      setDaysObj(myGoalDays);

  }, [])
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
    // setValues(state.user.pokeGoals[pokegoal].myJourneyValues);
    const startDate = afirstDay ? new Date(myPokeGoal.firstDay.slice(0, 10))
                                : new Date(state.user.pokeGoals[pokegoal].firstDay);

    const endDate = alastDay ?  new Date(myPokeGoal.lastDay.slice(0, 10))
                             :  new Date(state.user.pokeGoals[pokegoal].lastDay);

    const realEndDate = new Date(endDate.setDate(endDate.getDate() + 1));

    const currentDate = new Date(startDate.setDate(startDate.getDate() + 1));
    const newDateArray = [];
    let totalDays = 0;
    while (currentDate <= endDate) {//realEndDate
      newDateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
      totalDays++;
    }
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


    const newDataObject = {};
    if(inputValues)
    for (const [index, value] of Object.entries(inputValues)) {
      // Convert the index and value to numbers
      const numericIndex = parseInt(index);
      const numericValue = parseFloat(value);
  
      // Check if the value is not NaN and not undefined (empty input)
      if (!isNaN(numericIndex) && !isNaN(numericValue)) {
        newDataObject[numericIndex] = numericValue;
      }
    }
  
    console.log('Inpu values:', inputValues);
    // console.log('New data object:', newDataObject);
    console.log('days obj:', daysObj);
    console.log('checkdays:', checkDays);

    fetch(`setgoaldays`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({daysObj, checkDays, inputValues}), // Replace and add fields
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
        console.log("data",data.pokegoalUpdated);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch or processing
        console.error('Fetch error:', error);
      });
      setVisible(true);
      setTimeout(() => {
        // if(visible){
            setVisible(false);
            nav(`/user/${state.user.nickname}/${pokeId}`);
          // }
      }, 3500);
  
    }

    const handleCircleButtonClick = (index) => {
      setInputVisibility((prevVisibility) => ({
        ...prevVisibility,
        [index]: !prevVisibility[index], // Toggle the visibility
      }));
    };
    const [inputValues, setInputValues] = useState({});

    const handleInputChange = (event) => {
      const { name, value } = event.target;
  
      // Regular expression to validate input: allows digits and a dot
      const validInput = /^[\d.]*$/;
  
      if (validInput.test(value)) {
        // Convert the value to a number if it's not empty
        const numericValue = value === '' ? '' : parseFloat(value);
  
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [name]: numericValue,
        }));
      }
    };
  return (<div style={{"display": "flex", "flex-direction":"column", "width": "76%"}}>
      {visible && <ModalContainer visible={visible }>
        <ModalContent>
          <ModalImage src={wpokeball} alt="whitepokeball" />
          <CloseButton onClick={() => setVisible(false)}>X</CloseButton>
          <h3>You just modify {pokegoal} </h3>
          <p>Changes have been successfully made</p>
          </ModalContent>
        </ModalContainer>}

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
            <div style={{"font-weight": "bold"}}>{date.getDate()}  {monthAbbreviations[date.getMonth()]}</div>
            <label style={{"font-size": "12px"}}>
              <input type="checkbox" style={{"border": "none"}}
               checked={daysObj[index + 1] || false}
              onChange={() => handleCheckboxChange(index + 1)}
              />
              Daily task
            </label>
            <CircleButton onClick={() => handleCircleButtonClick(index)}
               isRed={inputVisibility[index]}>
                    {inputVisibility[index] ? '-' : '+'}
            </CircleButton>
            {inputVisibility[index] && 
              <Input type='text' 
              name={`${index}`} 
              defaultValue={values[index] || ''}
              // defaultValue={`${index}`} 
              onChange={handleInputChange} />}
            <div style={{"font-size": "15px"}}>
              {index + 1}<span style={{"font-size": "10px"}}>{(index+1)===1 
            ? "st" 
            : (index+1)===2 
            ? "nd" : (index+1)=== 3 ?"rd" : "th"}</span> day</div>
          </DayBox>
        ))}
      </CalendarGrid>
    </CalendarContainer>
    <div style={{"display" : "absolute"}}><CircleButton style={{"position" : "absolute", "margin": "-5px 7px"}}>
          +
    </CircleButton> <label style={{"margin": "15px 40px"}}>Add accumulative progress </label></div>
    <Button onClick={handleSetDays}>
    Update my Daily-Task Journey</Button>
    </div>
  )
}

export default PokeCheck
const CalendarContainer = styled.div`
  font-family: Arial, sans-serif;
  // border: 1px solid ${theme.colors.pokered};
`;

const CalendarGrid = styled.div`
  display: grid;
  // grid-template-columns: repeat(7, 1fr);
  grid-template-columns: repeat(7, minmax(100px, 1fr));
  gap: 8px;
  margin: 12px 0px;

`;

const DayBox = styled.div`
  // border: 1px solid #ccc;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  padding: 8px;
  background-color: ${props =>
    props.isCurrentDate ? 'lightblue' : 'rgba(0, 0, 0, 0.5)'};
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
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => (props.visible ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  background-color: ${theme.colors.pokered};
  opacity: 80%;
  padding: 40px;
  border-radius: 5px;
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: ${theme.colors.pokered};
  border-radius: 50%;
  cursor: pointer;
  font-size: 25px;
  padding: 12px;
`;

const ModalImage = styled.img`
  width: 100px;
  height: auto;
`;

const Input = styled.input`
  width: 59px;
  background: transparent;
  border-radius: 5px;
  border: 2px solid #ccc;
  color: white;
`
const CircleButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${({ isRed }) => (isRed ? 'red' : 'blue')};
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-top: 7px;
  align-items: center;
  font-size: 17px;
  outline: none;
`;