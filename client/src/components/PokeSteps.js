import React from 'react'
import { GlobalStyle, theme } from "../GlobalStyles";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { PokeContext } from "./PokeContext";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import  PokeGoal  from './PokeGoal';
import  PokeDates  from './PokeDates';

const PokeSteps = () => {
  const { dispatch, state } = useContext(PokeContext);
  const navigate = useNavigate();

  const { pokeId, pokemon, pokegoal } = useParams();

  const [pokemons, setPokemons] = useState([]);
  const [pokemonsArray, setPokemons2] = useState([]);
  const [nextPokeApi, setNextPokeApi] = useState("");
  const [prevPokeApi, setPrevPokeApi] = useState("");
  const [step0, setStep0] = useState(true);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [goalNum, setGoalNum] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingNextPokemons, setLoadingNextPokemons] = useState(false);
  const [loadingPrevPokemons, setLoadingPrevPokemons] = useState(false);
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [myPokemonObject, setMyPokemonObject] = useState(null);
  const [checkpointActive, setCheckpointActive] = useState(false);

  useEffect( () => {//init
    setGoalNum(pokegoal);
    fetch(`/get-user/${pokeId}`)
    .then(res => res.json())
    .then(data => {
      console.log("state pokehome", state.user, "data" , data);     
      dispatch({type: "ASSIGN_USER", payload: data.data});
    })
    .catch(error => { console.error("Error fetching API data:", error);});
    
    fetch("https://pokeapi.co/api/v2/pokemon")//#1 ONLY AT FIRST first 20 pokemons
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log("next url", data.next);
        setNextPokeApi(data.next);
        setPrevPokeApi("https://pokeapi.co/api/v2/pokemon");
        setPokemons(data.results);
        setStep0(!step0);
      })
      .catch(error => { console.error("Error fetching API data:", error);});
  //
  async function fetchAllPokemonNames() {
    try {
      let allPokemon = [];
      let nextUrl = 'https://pokeapi.co/api/v2/pokemon-species/';

      while (nextUrl) {
        const response = await fetch(nextUrl);
        const data = await response.json();

        allPokemon = [...allPokemon, ...data.results];
        nextUrl = data.next; // Fetch the next page if available
      }

      setPokemonList(allPokemon);
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
    }
  }

  fetchAllPokemonNames();
  console.log("pokemon:", pokemon);

  pokemon != "x" && fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then(res => res.json())
        .then(data => {
          // Here, you can process the fetched data for the selected Pokémon
          console.log("Fetched Pokémon Data:", data);
          setMyPokemonObject(data);
          // You can dispatch or set the fetched data to a state if needed
          // dispatch({type: "INIT_POKEGOALS", 
          //           pokemonName: data.name, 
          //           pokemonImg: data.sprites.front_default, 
          //           goalNum:goalNum});
        })
        .catch(error => {
          console.error("Error fetching selected Pokémon data:", error);
        });

    // }, [pokemon]);  
  }, [pokeId, pokemon, pokegoal]); 

  useEffect( () => {//start over, fetch next 20
    fetch(nextPokeApi)//#1 first 20 pokemons
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        setNextPokeApi(data.next);
        setPokemons(data.results);
        let origin;
        if (data.previous === "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20") {
          origin ="https://pokeapi.co/api/v2/pokemon";
        } else {
          origin = data.previous;
        }
        setPrevPokeApi(origin);
        setStep0(!step0);
      })
      .catch(error => {
        console.error("Error fetching API data:", error);
      });
  }, [loadingNextPokemons])
  useEffect( () => {//start over, fetch prev 20
    fetch(prevPokeApi)//#1 first 20 pokemons
      .then(res => res.json())
      .then(data => {
        console.log("data", data);
        setNextPokeApi(data.next);
        setPokemons(data.results);
        let origin;
        if (data.previous === "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20") {
          origin ="https://pokeapi.co/api/v2/pokemon";
        } else {
          origin = data.previous;
        }
        setPrevPokeApi(origin);
        setStep0(!step0);
      })
      .catch(error => {
        console.error("Error fetching API data:", error);
      });
  }, [loadingPrevPokemons])
/////
  useEffect( () => {
    console.log("myPokemonObject", myPokemonObject);
    fetch(nextPokeApi.toString())//#2 second 20 pokemons
    .then(res => res.json())
    .then(data => {
      console.log("SECOND FETCHING", data);
      setNextPokeApi(data.next);
      let prev20Pokemons = pokemons;
      let next20Pokemons = data.results;
      const new20Pokemons = {}; 

      next20Pokemons.forEach((aPokemon, index) => {
        // Assuming the index should start from 20
        const newIndex = index + 20;

        new20Pokemons[newIndex] = { ...aPokemon }; // Copy the data from the fetched result
      });

      setPokemons(prev20Pokemons => ({
        ...prev20Pokemons,
        ...new20Pokemons, // Merge the new data with the existing data
      }));
      // setPokemons({ ...first20Pokemons,
      //   ...data.results});
      setStep1(!step1);
    })
    .catch(error => {
      console.error("Error fetching API data:", error);
    });
  }, [step0])

  useEffect( () => {
    let pokemonsPromises = Object.values(pokemons).map( p => {
      return fetch(p.url)
        .then(res => res.json())
        .then(data => {
          const aPokemon = { ...p,
            ...data
         }
          return aPokemon;
        })
    })    
    Promise.all(pokemonsPromises)
    .then((combinedPokemons) => {
      setLoading(false);
      setPokemons2(combinedPokemons);
    })
    .catch((error) => {
      console.error("Error fetching Pokemon data:", error);
      setLoading(false);
    });

  },[step1])  

  useEffect( () => {
    console.log("LDINGpokemons", pokemonsArray);
    console.log("LDINGpokemons", pokemons);
  },[loading, pokemonsArray]);

  useEffect(() => {
    if (selectedPokemon) {
      // Fetch data for the selected Pokémon using its name
      fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then(res => res.json())
        .then(data => {
          // Here, you can process the fetched data for the selected Pokémon
          console.log("Fetched Pokémon Data:", data);
          setMyPokemonObject(data);
          // You can dispatch or set the fetched data to a state if needed
          dispatch({type: "INIT_POKEGOALS", 
                    pokemonName: data.name, 
                    pokemonImg: data.sprites.front_default, 
                    pokegoal});
        })
        .catch(error => {
          console.error("Error fetching selected Pokémon data:", error);
        });
    }
  }, [selectedPokemon]);

  useEffect(() => {
    if (myPokemonObject) {
          console.log("USER:", state.user.pokeGoals);
          if (state.user.pokeGoals) {
            fetch("/assign-goal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(state.user ), // Replace with the user data you want to send
            })
              .then(res => {
                // if (!res.ok) {
                //   throw new Error('Network response was not ok');
                // }
                return res.json(); // Parse the JSON data 
              })
              .then(data => {
                // Work with the parsed data
                console.log("user has been updated",data);
              })
              .catch(error => {
                // Handle any errors that occurred during the fetch or processing
                console.error('Fetch error:', error);
              });
          }
    }
    // navigate(`/${state.user.pokeId}/${selectedPokemon}`)
  }, [myPokemonObject]);

  const handlePokemonSelection = event => {
    setSelectedPokemon(event.target.value);
    setCheckpointActive(true);
  };
  const handleContinue = () => {
    setCheckpointActive(false);
    navigate(`/${state.user.pokeId}/${pokemon}/${pokegoal}`);
  };
  const handleDeselect = () => {
    setSelectedPokemon(null);
    setMyPokemonObject(null);
    // You can dispatch or set the fetched data to a state if needed
    dispatch({type: "INIT_POKEGOALS", 
              pokemonName: "x", 
              pokemonImg: "x", 
              pokegoal});
  };
  const toggleStep2 = () => {
    setStep2(true);
    console.log("step2", step2);
  };
  return (<>
  <Wrapper>
{/* 1step */}
    <Header>
        <div>1step: choose your pokemon</div>
        <div style={{"display":"flex", "alignItems": "center"}}>
          <Checkpoint active={checkpointActive}
                      onClick={() => {setCheckpointActive(!checkpointActive);
                                      setSelectedPokemon(pokemon);
                                      console.log("Check pokemon", pokemon);
                                      }}/>
          <div>{selectedPokemon}</div> 
          {state.user.pokeGoals[pokegoal].front_default 
          ? <img src={state.user.pokeGoals[pokegoal].front_default} style={{"height":"72px"}} />
          : (myPokemonObject) && <img src={myPokemonObject.sprites.front_default} style={{"height":"72px"}} />}
        </div>
    </Header>
    {checkpointActive && (<>
    <h1 style={{"margin": "10px 0"}}>Select a Pokémon:</h1>
    <Mydiv>
    {prevPokeApi && (
    <Button onClick={() => setLoadingPrevPokemons(!loadingPrevPokemons) }
    disabled={!prevPokeApi} >
      <FaArrowLeft /> Prev.  
    </Button>
    )} 
    <Button onClick={() => setLoadingNextPokemons(!loadingNextPokemons)} 
    disabled={!nextPokeApi }>
    Next   <FaArrowRight />
  </Button>
  </Mydiv>
  <Mydiv>
    <Select onChange={handlePokemonSelection}>
        <option>Select a Pokémon</option>
        {pokemonList.map(pokemon => (
          <option key={pokemon.name} value={pokemon.name}>
            {pokemon.name} {/* {pokemon.url}  */}
          </option>
        ))}
    </Select>
    {/* {selectedPokemon && ( */}
        {selectedPokemon && 
        <Button onClick={handleContinue}>Continue</Button>}
        {(selectedPokemon || myPokemonObject) &&
        <Button onClick={handleDeselect}>Deselect</Button>}
      {/* )} */}
  </Mydiv>
      {!loading && pokemonsArray.map((p)=> {
        return <PokemonCard key={p.id} >
          <input    type='radio'
                    name='selectedPokemon'
                    value={p.name}
                    id={p.id}
                    onChange={(event) => setSelectedPokemon(event.target.value)}
                    />
          <p>#{p.id} {p.name}</p>
          <img src={p.sprites.front_default} alt={p.name}/>
          {/* <p>{p.height}</p> */}
          </PokemonCard>
      })}  
    </>)}
{/* 2step */}
      {/* {step2 &&  */}
      <PokeGoal pokegoal={pokegoal} 
      pokemon={pokemon}
      toggleStep2={toggleStep2}
      pokeId={pokeId}/>
      {/* } */}
      {step2 && <PokeDates pokemon={pokemon}
                           pokegoal={pokegoal}
                           step2={step2}
                           pokeId={pokeId} />}
    </Wrapper></>
  )
}

export default PokeSteps;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: space-between;
  align-items: start;
  align-content: start;
  border: 1px solid red;
  padding: 0px 12px;
  width: 100%;
`;
const PokemonCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 120px;
  max-height: 160px;
  img {
    max-width: 100px;
    max-height: 100px;
    margin-bottom: 0px;
  }
  p{
    margin:5px;
  }
  input{
    margin:7px;
  }
`;
const Mydiv = styled.div`
width:90%;
display: flex;
justify-content: space-around;

`
const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

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

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  background-color: ${theme.colors.pokeblue};
  border: 0px;
  border-radius: 10px;
  color: white;
`;

const Button = styled.button`
  // margin-top: 10px;
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
`;