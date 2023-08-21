import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react'
import pokeball from "../pics/pokeball.png";
import wpokeball from "../pics/whitepokeball.png";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";
import { NavLink } from "react-router-dom";

const PokeSignin = () => {
  const { dispatch, state } = useContext(PokeContext);
  const [poke, setPoke] = useState(false);
useEffect( ()=> {
  console.log("1psb state sidebar", state.user);
  if (state.user.pokeGoals.pokegoal1.pokemon === "x" || Object.keys(state.user.pokeGoals).length === 0) {
    console.log("2psb sidebar after init pokegoals", state.user.pokeGoals);
    dispatch({type: "INIT_POKEGOALS"});
    console.log("3psb sidebar after init pokegoals", state.user.pokeGoals);
    console.log("4psb sidebar after init pokegoal1", state.user.pokeGoals.pokegoal1);
  }
}, [state.user.pokeGoals, dispatch]);
useEffect( ()=> {
    console.log("5psb 2useEffect pokegoal1", state.user.pokeGoals.pokegoal1);
    console.log("6psb 2useEffect", state.user.pokeGoals);
    setPoke(!poke);
}, [state.user.pokeGoals ]);
useEffect( ()=> {
    console.log("7psb 2useEffect pokegoal1", state.user.pokeGoals.pokegoal1);
    console.log("8psb 2useEffect", state.user.pokeGoals);
}, [ poke ]);

state.user.pokeGoals.pokegoal1 && console.log("Xpsb 2useEffect pokegoal1", state.user.pokeGoals.pokegoal1);
  return (
    <Wrapper>
      <ul>
        <AHomelink to="/">
          <IconWrapper>
            <span><img src={wpokeball} alt="whitepokeball"/></span>           
          </IconWrapper>
          Home
        </AHomelink>
        <li> 
        <CenteredAlink to={`/${state.user.nickname}/${state.user.pokeId}`}>{state?.user.nickname}</CenteredAlink> </li>
        <li> 
          <Alink 
          to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}`}>
          <img src={pokeball} alt="pokeball"/>
          <p>set a goal</p>
          </Alink>
        </li>
        <li> 
          <Alink>
          <img src={pokeball} alt="pokeball"/>
          <p>check a daily task</p>
          </Alink>
        </li>
        <li> 
          <Alink>
          <img src={pokeball} alt="pokeball"/>
          <p>track progress</p>
          </Alink>
        </li>
        <li> 
          <Alink>
          <img src={pokeball} alt="pokeball"/>
          <p>set a state</p>
          </Alink>
        </li>

      <MyPokeUl>
        <li>
        <Alink>
        {state.user.pokeGoals.pokegoal1.pokeimg
          ?  <img src={state.user.pokeGoals.pokegoal1.pokeimg} alt="pokeball"/>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>

        <li>
        <Alink>
        {state.user.pokeGoals.pokegoal1.pokeimg
          ?  <img style={{"height": "100px"}} src={state.user.pokeGoals.pokegoal2.pokeimg} alt="pokeball"/>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>

        <li>
        <Alink>
        {state.user.pokeGoals.pokegoal1.pokeimg == "x"
          ?  <img src={state.user.pokeGoals.pokegoal3.pokeimg} alt="pokeball"/>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>
      </MyPokeUl>

      </ul>

    </Wrapper>
  )
}

const Alink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #1da1f2;
  font-size: 16px;
  margin-bottom: 14px;
  text-decoration: none;
  background-color: white;
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
const AHomelink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: #1da1f2;
  font-size: 18px;
  margin-bottom: 10px;
  text-decoration: none;
  justify-content: center;
  color: white;
  &.active {
    background-color: white;
    border-radius: 15px;
  }
`;
const CenteredAlink = styled(Alink)`
  display: flex;
  align-items: center;
  justify-content: center;
  // margin: 0;
  // padding: 0;
  // width: auto;
`;
const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  background-color: ${theme.colors.pokered};
  background-color: ${theme.colors.pokeblue};
  border-radius: 50%;
  height: 36px;
  width: 36px;
  // margin-right: 10px;
  width: auto; /* Let the width adjust to content */
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  margin: 0;
  width: 23%; //23% de la ventana sin importar cuan chico es
  // max-width: 150px; // este es tu maximo
  min-width: 148px; 
  height: 500px; //no menos q esto
  max-height: 60%; //puedes crecer todo lo q quieras
  
  background-color: ${theme.colors.pokeblue};
  border: 1px solid ${theme.colors.pokered};
ul{
  padding: 0;
  
  li{
    padding: 0;
    &:first-child {//pokemon
      display: flex;
      align-items: center;
      // background-color: red;
      justify-content: center
    }
  }
 
img {
    max-height: 31px; //reduce pokeball to the space
    padding: 0px 5px; /* Adjust the padding value to create spacing around the images */
}
span {
  color: white;
  display: flex;
  cursor: pointer;
  // padding: 0px;
  p{
    // font-family: ${theme.secondaryFontFamily };
    font-family: ${theme.pokeFontfamily };
    // font-family: ${theme.pokeFontfamily2 };
    // font-family: ${theme.pokeFontfamily3 };
    // font-family: ${theme.pokeFontfamily4 };
    // font-family: ${theme.pokeFontfamily5 };
    // font-family: ${theme.pokeFontfamily6 };
    // font-family: ${theme.pokeFontfamily7 };
    // align-self: right;
    // font-size: 19px;
    // padding: 10px;
  }
    &:first-child {
      // transform: scaleX(-1);
      &:hover {
        // opacity: 0.5; // Adjust the opacity value as needed
      }
    }
  }
`;

const MyPokeUl = styled.ul`
 display: flex;
 flex-direction: column;
 align-items: center;
 margin-top: 34px;
 
  li{
    display: flex;
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
      max-height: 35px;
      padding: 3px; /* Adjust the padding value to create spacing around the images */
    }
  }
`

export default PokeSignin
