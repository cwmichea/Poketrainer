import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";

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
        This is the content when loading is false.
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