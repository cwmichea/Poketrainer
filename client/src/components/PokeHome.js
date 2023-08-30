import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";
import { NavLink } from "react-router-dom";
import pokeball from "../pics/pokeball.png";
import wpokeball from "../pics/whitepokeball.png";

const PokeHome = () => {
  const { nick, pokeId } = useParams();
  const { dispatch, state } = useContext(PokeContext);
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
    : 
      <Pokediv>
        {/* This is the content when loading is false. */}
        <MyPokeUl>
        <li>
        <Alink to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}/${Object.keys(state.user.pokeGoals)[0]}`}>
        {!(state.user.pokeGoals.pokegoal1.pokeimg === "x" ||
        state.user.pokeGoals.pokegoal1.pokeimg === "y")
          ?  <PokeDiv>
                <img style={{"height": "250px"}} src={state.user.pokeGoals.pokegoal1.pokeimg} alt="pokeball"/>
                <div  >
                  <h2>{state.user.pokeGoals.pokegoal1.pokemon}</h2>
                  <p>{state.user.pokeGoals.pokegoal1?.dailyTask}</p>
                </div>
                <h3>{state.user.pokeGoals.pokegoal1?.checkDays}/{state.user.pokeGoals.pokegoal1?.daysInterval}</h3>
            </PokeDiv>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>

        <li>
        <Alink  to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal2.pokemon}/${Object.keys(state.user.pokeGoals)[1]}`}>
        {!(state.user.pokeGoals.pokegoal2.pokeimg === "x" ||
        state.user.pokeGoals.pokegoal3.pokeimg === "y")
          ?  <img style={{"height": "100px"}} src={state.user.pokeGoals.pokegoal2.pokeimg} alt="pokeball"/>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>

        <li>
        <Alink  to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal3.pokemon}/${Object.keys(state.user.pokeGoals)[2]}`}>
        {!(state.user.pokeGoals.pokegoal3.pokeimg === "x" || 
        state.user.pokeGoals.pokegoal3.pokeimg === "y")
          ?  <img style={{"height": "100px"}} src={state.user.pokeGoals.pokegoal3.pokeimg} alt="pokeball"/>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>
      </MyPokeUl>
      </Pokediv>
    }</>);
  
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
  margin-bottom: 14px;
  text-decoration: none;
  background-color: white;
  border: 3px solid ${theme.colors.pokeyellow};
  padding: 0px;
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
 margin-top: 340x;
 background-color: ${theme.colors.pokeblue};
 
  li{
    // display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    background-color: ${theme.colors.pokered};
    background-color: ${theme.colors.pokeblue};
    border-radius: 50%;
    // height: 36px;
    width: 36px;
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
  // align-items: space-around;
  width: 100%;
  pagging: 14px;
  // margin: 14px;
`