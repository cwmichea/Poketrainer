import  React , { useState, useEffect, useContext } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { PokeContext } from "./PokeContext";
import {  theme } from "../GlobalStyles";
import styled from "styled-components";

const PokeStats = () => {
    const { pokemon, pokegoal, pokeId } = useParams();
    const { dispatch, state } = useContext(PokeContext);
    const [myPokemonObject, setMyPokemonObject] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        // fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        // .then(res => res.json())
        // .then(data => {
        //   // Here, you can process the fetched data for the selected Pokémon
        //   console.log("Fetched Pokémon Data:", data);
        //   setMyPokemonObject(data);
        //   // You can dispatch or set the fetched data to a state if needed
        //   // dispatch({type: "INIT_POKEGOALS", 
        //   //           pokemonName: data.name, 
        //   //           pokemonImg: data.sprites.front_default, 
        //   //           goalNum:goalNum});
        // // setLoading(false);
        const timer = setTimeout(() => {
            setLoading(false);
          }, 700);
      
          // Clear the timer when the component unmounts or if loading changes before 2 seconds
          return () => clearTimeout(timer);
         
        // .catch(error => {
        //   console.error("Error fetching selected Pokémon data:", error);
        // });
    }, []);

  return (<>
  { loading 
  ? 
    <ALoadingdiv>
      <Ah1>Welcome !</Ah1>
      <Loader>
        <div className="spinner"></div>
        <div className="horizontal-line"></div>
        <div className="ball"></div>
      </Loader> 
    </ALoadingdiv>
  : <>{myPokemonObject && 
        <>
            <Pokediv >
                <p>PokeTrainer ({state.user.pokeId} user)</p> <h3>{state.user.nickname}</h3> 
                {/* <img style={{"width" : "330px", "height": "330px"}} src={myPokemonObject.sprites?.front_default}/> */}
            <img src={state.user.picture}/>
            </Pokediv>

        </>}
    </>
    }</>
  )
}

export default PokeStats
const Ah1 = styled.h1`
  font-family: ${theme.pokeFontfamily3};
  // text-align: center;
`
const ALoadingdiv = styled.div`
  font-family: ${theme.pokeFontfamily5};
  // border: blue solid 1px;
  width: 75%;
`
const Pokediv = styled.div`
  display: flex;
  flex-direction: column;
//   min-width: 250;
  width: 77%;
  margin:  0px 0px 0px 10px;
  border-radius: 15px;
  // width: 250px;
  justify-content: start;
  align-items: center;
//   border: 1px solid ${theme.colors.pokeblue};
//   background-color: ${theme.colors.secondary};
  background-color: ${theme.colors.pokeblue};
//   background-color: white;
//   height: 98%;
  height: 525px;
//   background-color: white;
  // text-align: center;
  // flex-direction: column;
  // align-items: center; /* Center horizontally */
  // justify-content: start; /* Center vertically */
  // flex: 1; /* Take up available vertical space */
  img{
  border-radius: 15px;
  opacity: 90%;
    }
    h3, p{ 
        margin:5px
    }
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
    top: 33.5%;
    right: calc(46% - 80px);
  }
  .ball {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    top: 33.5%;
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