import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react';
import  { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import pokeball from "../pics/pokeball.png";
import wpokeball from "../pics/whitepokeball.png";
import { FaTicketAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa'; // Import the trash icon

const PokeHome = () => {
  const { nick, pokeId } = useParams();
  const { dispatch, state } = useContext(PokeContext);
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [pokegoal, setPokegoal] = useState(null);
  const [myPokegoal, setMyPokegoal] = useState(null);
  const [oldPokeGoals, setOldPokeGoals] = useState(state.user.oldPokeGoals || "");
  // Now you can use the values of nick and pokeId in your component logic
  // For example, you can fetch data based on these parameters or render content accordingly
  const [loading, setLoading] = useState(true);
  useEffect( ()=> {
    console.log("user", state.user);
    fetch(`/get-user/${pokeId}`)
    .then(res => res.json())
    .then(data => {
      console.log("state pokehome", state.user, "data" , data);     
      dispatch({type: "ASSIGN_USER", payload: data.data});
      setLoading(false);
    })
  },[]);
  useEffect( ()=> {
    console.log("user", state.user);
    console.log("this pokemon", pokegoal);
    console.log("it will update in 2 sec");

    fetch(`/delete-pokegoal/${pokegoal}/${pokeId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(myPokegoal), 
    })
      .then(res => {
        return res.json(); // Parse the JSON data 
      })
      .then(data => {
        console.log("data",data);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });

    fetch(`/get-user/${pokeId}`)
    .then(res => res.json())
    .then(data => {
      console.log("state pokehome", state.user, "data" , data);     
      dispatch({type: "ASSIGN_USER", payload: data.data});
      setLoading(false);
    })
    setVisibleModal(true);
    setTimeout(() => {
      if(visibleModal){
          setVisibleModal(false);
          window.location.reload();
          navigate(`/user/${nick}/${pokeId}`);}
    }, 3500);

  },[pokegoal]);
 
  return (<>{ loading ? 
      <ALoadingdiv>
        <Ah1>Welcome to PokeHome!</Ah1>
        <p>hello {nick} ({pokeId})</p> 
        <Loader>
          <div className="spinner"></div>
          <div className="horizontal-line"></div>
          <div className="ball"></div>
        </Loader> 
      </ALoadingdiv>
    : <>
      {pokegoal && <ModalContainer visible={visibleModal}>
        <ModalContent>
        <ModalImage src={wpokeball} alt="whitepokeball" />
          <CloseButton onClick={() => setVisibleModal(false)}>X</CloseButton>
          <h3>You just discard {pokegoal} </h3>
          <p>Changes have been made, now it is in the old pokegoals</p>
          </ModalContent>
      </ModalContainer>}
      <Pokediv>
        {/* This is the content when loading is false. */}
        <MyPokeUl>
        <li>
        {state.user.pokeGoals.pokegoal1?.daysInterval && <DeleteButton 
        onClick={() => {setPokegoal("pokegoal1");
                       setMyPokegoal(state.user.pokeGoals.pokegoal1)}} >
                    <FaTrash />
        </DeleteButton> }
        <Alink to={ `/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}/${Object.keys(state.user.pokeGoals)[0]}` }>
        {!(state.user.pokeGoals.pokegoal1.pokeimg === "x" ||
        state.user.pokeGoals.pokegoal1.pokeimg === "y")
          ?  <PokeDiv>
                <img style={{"height": "130px"}} src={state.user.pokeGoals.pokegoal1.pokeimg} alt="pokeball"/>
                <div  >
                  <h2 style={{"margin": "12px 0"}}>{state.user.pokeGoals.pokegoal1?.pokemon} <span style={{"font-size": "11px"}}>lv. {state.user.pokeGoals.pokegoal1?.checkDays} </span></h2>
                  <h3 style={{"margin": "10px 0"}}>{state.user.pokeGoals.pokegoal1?.checkDays} < FaCheck style={{"font-size": "12px"}} /> / {state.user.pokeGoals.pokegoal1?.daysInterval} days <FaTicketAlt style={{"font-size": "15px"}} />
                  </h3>
                  <p>Pokegoal1: {state.user.pokeGoals.pokegoal1?.dailyTask}</p>
                </div>

            </PokeDiv>
          :  <>
                <img style={{"height": "100px"}} src={pokeball}    alt="pokeball"/>
                <h2 style={{"margin-left": "22px"}}> No pokegoal1 set yet </h2>
            </>}
        </Alink>
        </li>

        <li>
        {state.user.pokeGoals.pokegoal2?.daysInterval && <DeleteButton 
        onClick={() => {setPokegoal("pokegoal2");
                       setMyPokegoal(state.user.pokeGoals.pokegoal2)}} >
                    <FaTrash />
        </DeleteButton> }
        <Alink  to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal2.pokemon}/${Object.keys(state.user.pokeGoals)[1]}`}>
        {!(state.user.pokeGoals.pokegoal2.pokeimg === "x" ||
        state.user.pokeGoals.pokegoal3.pokeimg === "y")
        ?  <PokeDiv>
              <img style={{"height": "150px"}} src={state.user.pokeGoals.pokegoal2.pokeimg} alt="pokeball"/>
              <div  >
                <h2 style={{"margin": "12px 0"}}>{state.user.pokeGoals.pokegoal2?.pokemon} <span style={{"font-size": "11px"}}>lv. {state.user.pokeGoals.pokegoal2?.checkDays} </span></h2>
                <h3 style={{"margin": "10px 0"}}>{state.user.pokeGoals.pokegoal2?.checkDays} < FaCheck style={{"font-size": "12px"}} /> / {state.user.pokeGoals.pokegoal2?.daysInterval} days <FaTicketAlt style={{"font-size": "15px"}} />
                </h3>
                <p>Pokegoal2: {state.user.pokeGoals.pokegoal2?.dailyTask}</p>
              </div>
          </PokeDiv>
          :  <>
                <img style={{"height": "100px"}} src={pokeball}    alt="pokeball"/>
                <h2 style={{"margin-left": "22px"}}> No pokegoal2 set yet </h2>
             </>}
        </Alink>
        </li>

        <li>
        {state.user.pokeGoals.pokegoal3?.daysInterval && <DeleteButton   >
                    <FaTrash />
        </DeleteButton> }
        <Alink  to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal3.pokemon}/${Object.keys(state.user.pokeGoals)[2]}`}>
        {!(state.user.pokeGoals.pokegoal3.pokeimg === "x" || 
        state.user.pokeGoals.pokegoal3.pokeimg === "y")
        ?  <PokeDiv>
              <img style={{"height": "150px"}} src={state.user.pokeGoals.pokegoal3.pokeimg} alt="pokeball"/>
              <div  >
                <h2 style={{"margin": "12px 0"}}>{state.user.pokeGoals.pokegoal3?.pokemon} <span style={{"font-size": "11px"}}>lv. {state.user.pokeGoals.pokegoal3?.checkDays} </span></h2>
                <h3 style={{"margin": "10px 0"}}>{state.user.pokeGoals.pokegoal3?.checkDays} < FaCheck style={{"font-size": "12px"}} /> / {state.user.pokeGoals.pokegoal3?.daysInterval} days <FaTicketAlt style={{"font-size": "15px"}} />
                </h3>
                <p>Pokegoal3: {state.user.pokeGoals.pokegoal3?.dailyTask}</p>
              </div>
          </PokeDiv>
          :  <>
              <img style={{"height": "100px"}} src={pokeball}    alt="pokeball"/>
              <h2 style={{"margin-left": "22px"}}> No pokegoal3 set yet </h2>
            </>}
        </Alink>
        </li>

        {state.user.oldPokegoals &&
          <OldGoalsButton onClick={() => setVisible(!visible)}>Take a look to the Old PokeGoals</OldGoalsButton>
          } 
          
        {visible && <>
 
        {/* { */}
         {Object.values(state.user.oldPokegoals).map(pokegoal => {
          return <PokeDiv style={{"opacity": "60%"}}>
                          <img style={{"height": "150px"}} src={pokegoal.pokeimg} alt="pokeball"/>
              <div  >
                <h2 style={{"margin": "12px 0"}}>{pokegoal?.pokemon} <span style={{"font-size": "11px"}}>lv. {pokegoal?.checkDays} </span></h2>
                <h3 style={{"margin": "10px 0"}}>{pokegoal?.checkDays} < FaCheck style={{"font-size": "12px"}} /> / {pokegoal?.daysInterval} days <FaTicketAlt style={{"font-size": "15px"}} />
                </h3>
                <p>Pokegoal: {pokegoal?.dailyTask}</p>
              </div>
          </PokeDiv>
        })} 
        </>}
        {/* {state.user.oldPokeGoals &&
         Object.value(state.user.oldPokeGoals)} */}

      </MyPokeUl>
 
      </Pokediv>
      </>}</>);
  
};

export default PokeHome;

const Ah1 = styled.h1`
  font-family: ${theme.pokeFontfamily3};
  // text-align: center;
`
const ALoadingdiv = styled.div`
  font-family: ${theme.pokeFontfamily5};
  border: blue solid 1px;
  width: 75%;
`
const Pokediv = styled.div`
  display: flex;
  min-width: 250;
  width: 75%;
  // width: 250px;
  // flex-direction: column;
  justify-content: start;
  align-items: start;
  border: 1px solid ${theme.colors.pokered};
  height: 95%;
  background-color: white;
  // text-align: center;
  // flex-direction: column;
  // align-items: center; /* Center horizontally */
  // justify-content: start; /* Center vertically */
  // flex: 1; /* Take up available vertical space */
`
const Loader = styled.div`
  display: flex;
  // align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  margin-top: 110px;

  .spinner {
    position: absolute;
    right: calc(46% - 80px);
    border: 3px solid rgba(0, 0, 0, 0.3);
    // border-top: 3px solid ${theme.colors.highlight};
    border-top: 3px solid ${theme.colors.pokered};
    border-right: 3px solid ${theme.colors.pokered};
    border-radius: 50%; // from square to circle
    width: 155px;
    height: 155px;
    animation: spin 1s linear infinite;
  }
  .horizontal-line {
    transform: rotate(45deg)
    animation: spin 1s linear infinite;
    position: absolute;
    width: 157px;
    height: 2px;
    background-color: white;
    background-color: ${theme.colors.pokered};
    top: 38%;
    right: calc(46% - 80px);
  }
  .ball {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    top: 38%;
    right: calc(46% - 18px);
    transform: translate(-50%, -50%);
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const Alink = styled(NavLink)`
  display: flex;
  align-items: center;
  // color: #1da1f2;
  color: white;
  font-size: 16px;
  margin: 0px 25px 0px 4px;
  text-decoration: none;
  // background-color: white;
  border: 3px solid ${theme.colors.pokeyellow};
  padding : 5px ;
  // margin: 0px
  // justify-content: center;
  &.active {
    border-radius: 15px;
    p {
    }
  }
  p{
    padding: 0px;
    margin: 2px
  }
  img{
    padding: 0px;
    // margin: 0px:
  }
`;
const MyPokeUl = styled.ul`
 display: flex;
 flex-direction: column;
  // align-items: center;
 border: 3px solid ${theme.colors.pokeyellow};
 width: 100%;
//  margin-top: 340x;
 background-color: ${theme.colors.pokeblue};
 
  li{
    // display: flex;
    flex-direction: column;
    align-items: center;
    // align-items: space-around;
    justify-content: end;
    background-color: ${theme.colors.pokeblue};
    border-radius: 50%;
    // height: 36px;
    // width: 40px;
    // margin-right: 10px;
    margin: 10px;
    
    img {
      max-height: 120px;
      padding: 3px; /* Adjust the padding value to create spacing around the images */
    }
  }
`
const PokeDiv = styled.div`
  display: flex;
  // flex-direction: column;
  // align-items: space-between;
  width: 100%;
  pagging: 15px;
  // margin: 14px;
`
const OldGoalsButton = styled.button`
  background-color: ${theme.colors.pokered};
  margin: 10px;
  opacity: 80%;
  color: white;
  border-radius: 5px;
  border: none;
  outline: none;
`
const DeleteButton = styled.button`
  position: relative;
  top: 22px;
  right: 2px;
  height: 33px;
  background-color: ${theme.colors.pokered};
  color: white;
  border: none;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
  outline: none;
  // align-self: flex-end;
  transition: background-color 0.2s ease; /* Add smooth transition */

  &:hover {
    background-color: darkred;
  }

  /* Tooltip text */
  &::before {
    content: "Discard this goal";
    position: absolute;
    top: -33px; /* Adjust top position for tooltip */
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 5px 10px; /* Add some horizontal padding */
    border-radius: 5px;
    font-size: 15px;
    white-space: nowrap; /* Prevent text from wrapping */
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }


  &:hover::before {
    opacity: 1;
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