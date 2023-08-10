import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react';
import { useParams } from 'react-router-dom';

const PokeHome = () => {
  const { nick, pokeId } = useParams();

  // Now you can use the values of nick and pokeId in your component logic
  // For example, you can fetch data based on these parameters or render content accordingly

  return (
    <div>
      <Ah1>Welcome to PokeHome!</Ah1>
      <p>Nickname: {nick}</p>
      <p>Poke ID: {pokeId}</p>
      {/* Other component content */}
    </div>
  );
};

export default PokeHome;

const Ah1 = styled.h1`
  font-family: ${theme.secondaryFontFamily};
`