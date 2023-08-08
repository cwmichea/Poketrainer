import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react'
import poketrainer from "../pics/poketrainer.png";
import pokeball from "../pics/pokeball.png";
import wpokeball from "../pics/whitepokeball.png";

const PokeSignin = () => {
  return (
    <Wrapper>
        <span> <img src={wpokeball} alt="whitepokeball"/> </span>
        <span> <img src={poketrainer} alt="poketrainer"/> </span>
        {/* <span> <img src={pokeball} alt="pokeballtrainer"/>  </span> */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  width: 100%;
  height: 35px;
  background-color: ${theme.colors.pokeblue};
img {
    max-height: 31px;
    padding: 0 7px; /* Adjust the padding value to create spacing around the images */
}
span {
    cursor: pointer;
    &:first-child {
      // transform: scaleX(-1);
    }
  }
`;
export default PokeSignin
