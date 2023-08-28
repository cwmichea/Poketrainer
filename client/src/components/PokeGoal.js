import React from 'react'
import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";
import { FaDumbbell } from 'react-icons/fa';
import { FaBook } from 'react-icons/fa';
// import { FaWeightH } from 'react-icons/fa5';
import { MdFitnessCenter } from 'react-icons/md';
const PokeGoal = ({pokegoal, pokemon, toggleStep2, pokeId}) => {
 const [checkpointActive, setCheckpointActive] = useState(false);
 const [startDate, setStartDate] = useState("");
 const [bodyActive, setBodyActive] = useState(false);
 const [mindActive, setMindActive] = useState(false);
 const [training, setTraining] = useState("");
 const [measurementType, setMeasurementType] = useState("default"); // Added state for measurementType
 const [pressed1, setPressed1] = useState(false);
 const [pressed2, setPressed2] = useState(false);
 const [goalType, setGoalType] = useState(false);
 const [myAction, setMyAction] = useState("");
 const [bodyPart, setBodyPart] = useState("");
 const [keyAmount, setKeyAmount] = useState("");
 const [goalValue, setGoalValue] = useState("");
 const [dailyTask, setDailyTask] = useState("");
 const [prevDailyTask, setPrevDailyTask] = useState("");
 const [duration, setDuration] = useState("");
 const [firstState, setFirstState] = useState("");
 const [done, setDone] = useState(false);

 const { dispatch, state } = useContext(PokeContext);

  const handleMeasurementTypeChange = (event) => {
    setMeasurementType(event.target.value);
  };
  const handleGoalTypeChange = (event) => {
    let newType = event.target.value;
    let newGoalType = "";
    //MIND
    if (newType === "pages") {
      newGoalType = "read a book";
      console.log("new goal type function", newGoalType);}
    else if(newType === "words" || newType === "min" ) {
      newGoalType = "learn a language";
    } 
    //BODY
    else if (newType === "working out" ||
            newType === "jogging" || 
            newType === "playing a sport" || 
            newType === "physical activity" || 
            newType === "eating healthy" 
            ) 
      newGoalType = `${newType} to ${myAction} a few ${measurementType}`;
    setGoalType(newGoalType);
    };

  const handleDaylyTaskChange = (event) => {
    setPrevDailyTask(event.target.value);
    let myDuration = "";
    if (event.target.value === "eating healthy") {
      myDuration = "a day";
    }
    setDuration(myDuration);
  };
  const handleButtonClick = () => {// fetching!!
    // Call the callback function passed from the parent component
    setCheckpointActive(!checkpointActive);
    toggleStep2();
    let myGoalDets = {
      training: training,
      measurementType: measurementType,
      goalType: goalType,
      goalValue: goalValue,
      keyAmount: keyAmount,
      dailyTask: dailyTask,
      firstState: firstState,
    }
    console.log(myGoalDets);
    fetch(`setgoaldets/${pokegoal}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myGoalDets), // Replace and add fields
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
  };  
  const handleSetGoal = () => {
    console.log("set goal!");
    console.log("training type", training);
    console.log("measurement type", measurementType);
    console.log("goal type", goalType);
    console.log("key amount", keyAmount);
    let myDailyTask = "";

    switch (measurementType) {
    //mind
    case "pages":
      myDailyTask = `Read ${keyAmount} pages a day to complete my ${goalValue}-pages book`;
      // myGoalType = `Read a ${goalValue}-pages book`;
    break;
    case "min":
      myDailyTask = `Practice speaking ${keyAmount} min. a day`;
    break;
    case "words":
      myDailyTask = `Learn ${keyAmount} words a day`;
    break;
    //body
    case "cm":
      if(duration != "a day")
      myDailyTask =`${prevDailyTask} during ${duration} min a day in order to ${myAction} my ${bodyPart} in ${goalValue} cm`;
      else
      myDailyTask =`${prevDailyTask} during ${duration} in order to ${myAction} my ${bodyPart} in ${goalValue} cm`;
    break;
    case "kg":
      myDailyTask = `${prevDailyTask} during ${duration} min a day in order to ${myAction} my weight in ${goalValue} kg`;
    break;
    default:
    break;
    }
    // setGoalResume(myGoalResume);
    setDailyTask(myDailyTask);
    !firstState && setFirstState(0);
  }

    useEffect(()=> {
        const inputDate = state.user.pokeGoals[pokegoal].firstDay;
        const parsedDate = new Date(inputDate);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = parsedDate.toLocaleDateString('en-US', options);
        setStartDate(formattedDate);
    }, []);

useEffect(()=> {
//     console.log("training type", training);
//     console.log("measurement type", measurementType);
//     console.log("goal type", goalType);
console.log("dailyTask", dailyTask);
console.log("myAction", myAction);

// }, [goalType]);
}, [dailyTask]);
console.log("firstState", firstState);

  return (
  <>
    <Header>
    <div>2step: create your goal</div>
    <div style={{"display":"flex", "alignItems": "center"}}>
      <Checkpoint active={checkpointActive}
                  onClick={() => {setCheckpointActive(!checkpointActive);
                                  }}/>
                                          
        <div style={{"display":"grid"}}>
          <p style={{"margin":"3px"}}>
            {training && (
            <span>Training my&nbsp; 
              {training === "Body" 
              ? 'body '   
              : 'mind '  }
              {training === "Body" 
              ? <MdFitnessCenter />   
              : <FaBook />}
            </span>)}
          </p> 
          <p style={{"margin":"3px"}}>
            {dailyTask && (`${goalType}`)}
          </p>    
          
        </div>

    </div>
    </Header>
    {checkpointActive && (<>
    <GoalWrapper>
        <h1>Define goal:</h1>
        <h3>What are you going to train?</h3>
        <div style={{"margin-bottom": "12px"}}>
            <Button pressed={pressed1} onClick={()=> {setMindActive(mindActive => !mindActive);
                                                     setBodyActive(false);
                                                     setPressed1(!pressed1);
                                                     setPressed2(false);
                                                     setTraining("Mind");
                                                     setMeasurementType("default");
                                                     setGoalType("");
                                                     setGoalValue("");
                                                     setKeyAmount("");
                                                     setDailyTask("");
                                                     setFirstState("");
                                                     setMyAction("");//onlybody
                                                     setPrevDailyTask("");//onlybody
                                                     setDuration("");//only body
             }}>Mind  <FaBook /></Button>
            <Button pressed={pressed2} onClick={()=> {setBodyActive(bodyActive => !bodyActive);
                                                     setMindActive(false);
                                                     setPressed2(!pressed2);
                                                     setPressed1(false);
                                                     setTraining("Body");
                                                     setMeasurementType("default");
                                                     setGoalType("");
                                                     setGoalValue("");
                                                     setKeyAmount("");
                                                     setDailyTask("");
                                                     setFirstState("");
             }}>Body <FaDumbbell /></Button>
        </div>
        
        {/* mind  */}
        {mindActive && (<>
        <div>
        <h3>Let's begin! </h3>
        <p>What is your purpose? </p>
        <Select id="measurementType" 
                onChange={(e) => {handleMeasurementTypeChange(e);
                                  handleGoalTypeChange(e)}}>
            <option value="default">Select an option</option>
            <option value="pages">Read a book (pages)</option>
            <option value="words">Learn a new language (words)</option>
            <option value="min">Speak a new language (min)</option>
            <option value="words">Increase vocabulary (words)</option>
        </Select>
        {measurementType ==="pages" && (<><span> of </span> 
          <Input id="amount"  style={{"width":"40px",            
          "height": "33px",
            }}
          onInput={(e) => {
          e.target.value = e.target.value.replace(/[^\d.]/g, '');
          setGoalValue(e.target.value);
          }}/> 
          <span> pages</span> 
          <p>starting from: </p>
          <Input  id="intValue" 
                    type='text'
                    pattern="[0-9]*(\.[0-9]{0,1})?"
                    style={{"width": "30px", "height": "33px"}}
                    maxLength="3"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/[^\d.]/g, '');
                      setFirstState(Number(event.target.value));
                    }}/>
          <span> pages</span></>)}
        </div>
        {((measurementType != "default" && measurementType != "pages") || (measurementType === "pages" && goalValue)) 
        && ( 
        <div> 
          <h3>Set your daily task</h3>
          <p >How to measure your goal progress? </p>
          <Input id="amount"  style={{"width":"40px",            
                                  // "height": "33px",
                                    }}
                 onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^\d.]/g, '');
                  setKeyAmount(e.target.value);
              }}
          />
          {measurementType === "pages" 
            ? " pages read by day"
            : (measurementType === "min") 
                ? " min. practice speaking a day"
                : " new words learnt a day"}

        {/* mind fitness button */}
          {(goalType && keyAmount) && 
          <Button style={{"margin-top": "12px"}} 
          disabled={!keyAmount}
          onClick={handleSetGoal}>Set Goal </Button>}
        </div>)}
        </>)}

        {/* body fitness  */}
        {bodyActive && (<>
        <div>
        <h3>Let's begin! </h3>
        <p>How to measure your goal progress? </p>
        <Select id="measurementType" 
                onChange={handleMeasurementTypeChange}>
            <option value="default">Select an option</option>
            <option value="cm">By cm</option>
            <option value="kg">By kg</option>
        </Select>
        </div>
        {measurementType != "default" && (
        <div> 
            <p>What is your purpose? </p>
            {measurementType ==="cm" && <p style={{"font-size": "15px"}}>(measure 1 of these body parts: waist, chest, bicep, leg or calf)</p>}
            <Select onChange={(e) => {setMyAction(e.target.value);}}>
                <option default value="">Select what to do</option>
                <option value="Decrease">Decrease</option>
                <option value="Increase">Increase</option>
            </Select>   
            {measurementType === "cm" ? (<>
            <span> my </span>  
            <Select disabled={!myAction || myAction === ""} 
            onChange={(e) => {setBodyPart(e.target.value);}}>
                <option value="default">Select a body part</option>
                <option value="waist">Waist (bellybutton)</option>
                <option value="chest">Chest</option>
                <option value="bicep">Bicep</option>
                <option value="leg">Leg</option>
                <option value="calf">Calf</option>
            </Select>
            <span> in</span>  
            </>
            ): " "} 
            <Input  id="goalValue" 
                    type='text'
                    pattern="[0-9]*(\.[0-9]{0,1})?"
                    style={{"width": "28px", 
                            "height": "33px",
                            "margin-left": "7px"}}
                    maxLength="3"
                    onInput={(event) => {
                        event.target.value = event.target.value.replace(/[^\d.]/g, '');
                        setGoalValue(event.target.value);
                    }}/>
            <span>{measurementType === "cm" ? " cm" : " kg"}</span>
            <p>starting from: </p>
            <Input  id="intValue" 
                    type='text'
                    pattern="[0-9]*(\.[0-9]{0,1})?"
                    style={{"width": "30px", "height": "33px"}}
                    maxLength="3"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/[^\d.]/g, '');
                      setFirstState(Number(event.target.value));
                    }}/>
            <span> . </span>
            <Input  id="decimalValue" 
                    type='text'
                    pattern="[0-9]*(\.[0-9]{0,1})?"
                    style={{"width": "20px", "height": "33px"}}
                    maxLength="1"
                    onInput={(event) => {
                      event.target.value = event.target.value.replace(/[^\d.]/g, '');
                      setFirstState(firstState => (Number(event.target.value)*(0.1) + firstState));
                    }}/>
            <span>{measurementType === "cm" ? " cm" : " kg"}</span>
            <div>
             <h3>Set your daily task </h3>
             <Select onChange={e => {handleDaylyTaskChange(e);
                                    handleGoalTypeChange(e)}}>
                <option default value="default">Select an option</option>
                <option value="working out">working out</option>
                <option value="jogging">jogging</option>
                <option value="playing a sport">playing a sport</option>
                <option value="physical activity">physical activity</option>
                <option value="eating healthy">eating healthy</option>
            </Select>
            <span> during </span>
             {dailyTask != "eating healthy" ? (<><Input id="duration" 
                    type='text'
                    pattern="[0-9]*(\.[0-9]{0,1})?"
                    style={{"width": "28px", "height": "33px"}}
                    maxLength="3"
                    onInput={(event) => {
                        event.target.value = event.target.value.replace(/[^\d.]/g, '');
                        setDuration(event.target.value);
                    }}/> <span> min </span></>) : "a day" }
            </div>

            {dailyTask != "default" && 
            <Button style={{"margin-top": "12px"}} 
            onClick={handleSetGoal} 
            disabled={!duration 
            && !keyAmount}>Set Goal</Button>}
            {/* <Button style={{"margin-top": "12px"}}>Set Current State</Button> */}
        </div>
        )} 
        </>)}
        {/* body fitness */}
        {(dailyTask) && <>
        <MyTask>{dailyTask}</MyTask>
        <Button onClick={handleButtonClick} style={{"margin-bottom": "20px"}}>Save & Continue</Button>
        </>}
    </GoalWrapper>
    </>)}

 </>)
}

export default PokeGoal;

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
 
const GoalWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const Button = styled.button`
  // margin-top: 10px;
  margin: 0 10px ;
  padding: 10px 20px;
  font-size: 16px;
  background-color: ${theme.colors.pokeblue};
  border-radius: 12px;
  color: white;
  border: none;
  cursor: pointer;
  // &:active {
  //   background-color: ${theme.colors.pokeyellow};
  // }
  background-color: ${({ pressed }) =>
    pressed ? theme.colors.pokeyellow : theme.colors.pokeblue};
  &:hover {
    // background-color: #f5f5f5;
    background-color: ${theme.colors.pokeyellow};
  }
  &:disabled {
    background-color: gray; /* Change the color to gray */
  }
`;
const Input = styled.input`
  font-size: 16px;
  // background-color: ${theme.colors.pokeblue};
  border-radius: 5px;
  // color: white;
  border: none;
`
const Select = styled.select`
  padding: 10px;
  font-size: 15px;
  background-color: ${theme.colors.pokeblue};
  border: 0px;
  border-radius: 10px;
  color: white;
  &:disabled {
    background-color: gray; /* Change the color to gray */
  }
`;
const MyTask = styled.p`
  padding: 10px;
  // border: 2px dashed ${theme.colors.pokered};
  border: 2px dashed white;
  font-size: 20px;
`