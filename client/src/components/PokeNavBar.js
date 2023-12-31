import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react'
import poketrainer from "../pics/poketrainer.png";
import pokeball from "../pics/pokeball.png";
import wpokeball from "../pics/whitepokeball.png";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";

const PokeSignin = () => {
  const { dispatch, state } = useContext(PokeContext);

useEffect( ()=> {
  console.log("state navbar", state.user.nickname);
},[]);

  return (
    <Wrapper>
        <span> <img src={wpokeball} alt="whitepokeball"/> 
        <p>{state?.user.nickname}</p> </span>
        <span> <img src={poketrainer} alt="poketrainer"/> </span>
        {/* <span> <img src={pokeball} alt="pokeballtrainer"/>  </span> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  // align-items: center;
  margin: 0;
  width: 100%;
  height: 35px;
  background-color: ${theme.colors.pokeblue};
img {
    max-height: 31px;
    padding: 0 7px; /* Adjust the padding value to create spacing around the images */
}
span {
  color: white;
  display: flex;
  cursor: pointer;
  p{
    // font-family: ${theme.secondaryFontFamily };
    font-family: ${theme.pokeFontfamily };
    // font-family: ${theme.pokeFontfamily2 };
    // font-family: ${theme.pokeFontfamily3 };
    // font-family: ${theme.pokeFontfamily4 };
    // font-family: ${theme.pokeFontfamily5 };
    // font-family: ${theme.pokeFontfamily6 };
    // font-family: ${theme.pokeFontfamily7 };
    align-self: center;
    font-size: 19px;
  }
    &:first-child {
      // transform: scaleX(-1);
      &:hover {
        opacity: 0.5; // Adjust the opacity value as needed
      }
    }
  }
`;
export default PokeSignin
