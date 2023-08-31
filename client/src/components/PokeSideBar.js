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
  const [submenuVisible, setSubmenuVisible] = useState(false);
  const [submenuVisible1, setSubmenuVisible1] = useState(false);
  const [submenuVisible2, setSubmenuVisible2] = useState(false);
  const [submenuVisible3, setSubmenuVisible3] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuVisible(!submenuVisible);
    setSubmenuVisible1(false);
    setSubmenuVisible2(false);
    setSubmenuVisible3(false);
  };

const closeAll = () => {
  setSubmenuVisible(false);
  setSubmenuVisible1(false);
  setSubmenuVisible2(false);
  setSubmenuVisible3(false);
}
useEffect( ()=> {
  // console.log("1psb state sidebar", state.user);
  if (state.user.pokeGoals.pokegoal1.pokemon === "x" || Object.keys(state.user.pokeGoals).length === 0) {
    // console.log("2psb sidebar after init pokegoals", state.user.pokeGoals);
    dispatch({type: "INIT_POKEGOALS"});
    // console.log("3psb sidebar after init pokegoals", state.user.pokeGoals);
    // console.log("4psb sidebar after init pokegoal1", state.user.pokeGoals.pokegoal1);
  }
}, [state.user.pokeGoals, dispatch]);
useEffect( ()=> {
    // console.log("5psb 2useEffect pokegoal1", state.user.pokeGoals.pokegoal1);
    // console.log("6psb 2useEffect", state.user.pokeGoals);
    setPoke(!poke);
}, [state.user.pokeGoals ]);
useEffect( ()=> {
    // console.log("7psb 2useEffect pokegoal1", state.user.pokeGoals.pokegoal1);
    // console.log("8psb 2useEffect", state.user.pokeGoals);
    console.log("9psb 2useEffect", state.user.pokeGoals.pokegoal1.pokemon);
}, [ poke ]);

// state.user.pokeGoals.pokegoal1 && console.log("Xpsb 2useEffect pokegoal1", state.user.pokeGoals.pokegoal1);
  return (
    <Wrapper>
      <ul>
        <AHomelink to="/" onClick={closeAll}>
          <IconWrapper>
            <span><img src={wpokeball} alt="whitepokeball"/></span>           
          </IconWrapper>
          Home
        </AHomelink>
        <li> 
        <CenteredAlink to={`/${state.user.nickname}/${state.user.pokeId}`}>{state?.user.nickname}</CenteredAlink> </li>


        <li> 
        {/* <Button onClick={toggleSubmenu}>Set a Goal</Button> */}
        <Alink 
          // to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}`} 
          onClick={toggleSubmenu}>
          <img src={pokeball} alt="pokeball"/>
          <p>set a goal</p>
        </Alink>
          {submenuVisible && (
            <Submenu>
              <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}/${Object.keys(state.user.pokeGoals)[0]}`} >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 1</p>
                </Alink>
              </SubmenuItem>
              <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal2.pokemon}/${Object.keys(state.user.pokeGoals)[1]}`} >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 2</p>
                </Alink>
              </SubmenuItem>
              <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal3.pokemon}/${Object.keys(state.user.pokeGoals)[2]}`}  >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 3</p>
                </Alink>
              </SubmenuItem>
            </Submenu>
          )}
        </li>
        <li> 
          <Alink onClick={() => {setSubmenuVisible1(!submenuVisible1);
                                setSubmenuVisible(false);
                                setSubmenuVisible2(false);
                                setSubmenuVisible3(false);}}>
          <img src={pokeball} alt="pokeball"/>
          <p>check a daily task</p>
          </Alink>
          {submenuVisible1 && (
            <Submenu>
              {state.user.pokeGoals.pokegoal1?.lastDay && <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}/${Object.keys(state.user.pokeGoals)[0]}/check`}  >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 1</p>
                </Alink>
              </SubmenuItem>}
              {state.user.pokeGoals.pokegoal2?.lastDay && <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal2.pokemon}/${Object.keys(state.user.pokeGoals)[1]}/check`}  >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 2</p>
                </Alink>
              </SubmenuItem>}
              {state.user.pokeGoals.pokegoal3?.lastDay && <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal3.pokemon}/${Object.keys(state.user.pokeGoals)[2]}/check`} >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 3</p>
                </Alink>
              </SubmenuItem>}
            </Submenu>)}
        </li>
        <li> 
          <Alink onClick={() => {setSubmenuVisible2(!submenuVisible2)
                                          setSubmenuVisible(false);
                                          setSubmenuVisible(false);
                                          setSubmenuVisible3(false);}}>
          <img src={pokeball} alt="pokeball"/>
          <p>track progress</p>
          </Alink>
          {submenuVisible2 && (
            <Submenu>
              {state.user.pokeGoals.pokegoal1?.lastDay && <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}/${Object.keys(state.user.pokeGoals)[0]}/track`}  >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 1</p>
                </Alink>
              </SubmenuItem>}
              {state.user.pokeGoals.pokegoal2?.lastDay && <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal2.pokemon}/${Object.keys(state.user.pokeGoals)[1]}/track`} >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 2</p>
                </Alink>
              </SubmenuItem>}
              {state.user.pokeGoals.pokegoal3?.lastDay && <SubmenuItem>
                <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal3.pokemon}/${Object.keys(state.user.pokeGoals)[2]}/track`}  >
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 3</p>
                </Alink>
              </SubmenuItem>}
            </Submenu>)}
        </li>
        <li> 
          <Alink onClick={() => {setSubmenuVisible3(!submenuVisible3)
                                                    setSubmenuVisible(false);
                                                    setSubmenuVisible(false);
                                                    setSubmenuVisible(false);}}>
          <img src={pokeball} alt="pokeball"/>
          <p>set a state</p>
          </Alink>
          {submenuVisible3 && (
            <Submenu>
               {state.user.pokeGoals.pokegoal1?.lastDay && <SubmenuItem>
                <Alink to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}/${Object.keys(state.user.pokeGoals)[0]}/check`} onClick={closeAll}>
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 1</p>
                </Alink>
              </SubmenuItem>}
              {state.user.pokeGoals.pokegoal2?.lastDay && <SubmenuItem>
                <Alink to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal2.pokemon}/${Object.keys(state.user.pokeGoals)[1]}/check`} onClick={closeAll}>
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 2</p>
                </Alink>
              </SubmenuItem>}
              {state.user.pokeGoals.pokegoal3?.lastDay && <SubmenuItem>
                <Alink to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal3.pokemon}/${Object.keys(state.user.pokeGoals)[2]}/check`} onClick={closeAll}>
                  <img src={pokeball} alt="pokeball" />
                  <p>Goal 3</p>
                </Alink>
              </SubmenuItem>}
            </Submenu>)}
        </li>
        

      <MyPokeUl>
        <li>
        <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal1.pokemon}/${Object.keys(state.user.pokeGoals)[0]}`}>
        {!(state.user.pokeGoals.pokegoal1.pokeimg === "x" ||
        state.user.pokeGoals.pokegoal1.pokeimg === "y")
          ?  <img style={{"height": "100px"}} src={state.user.pokeGoals.pokegoal1.pokeimg} alt="pokeball"/>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>

        <li>
        <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal2.pokemon}/${Object.keys(state.user.pokeGoals)[1]}`}>
        {!(state.user.pokeGoals.pokegoal2.pokeimg === "x" ||
        state.user.pokeGoals.pokegoal3.pokeimg === "y")
          ?  <img style={{"height": "100px"}} src={state.user.pokeGoals.pokegoal2.pokeimg} alt="pokeball"/>
          :  <img src={pokeball} alt="pokeball"/>}
        </Alink>
        </li>

        <li>
        <Alink onClick={closeAll} to={`/${state.user.pokeId}/${state.user.pokeGoals.pokegoal3.pokemon}/${Object.keys(state.user.pokeGoals)[2]}`}>
        {!(state.user.pokeGoals.pokegoal3.pokeimg === "x" || 
        state.user.pokeGoals.pokegoal3.pokeimg === "y")
          ?  <img style={{"height": "100px"}} src={state.user.pokeGoals.pokegoal3.pokeimg} alt="pokeball"/>
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
const Button = styled.button`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 14px;
  background-color: white;
  padding: 0px;
  color: #1da1f2;
  border: none;
  cursor: pointer;
`;
const Submenu = styled.ul`
  position: absolute;
  // top: 100%;
  left: 16px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Ensure the submenu is above other content */
  list-style: none;
  margin: 0;
  padding: 0;
  width: 22%;
  min-width:147px;
`;
const SubmenuItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: #1da1f2;
  font-size: 16px;
  text-decoration: none;

  img {
    max-height: 31px;
    padding: 0px 5px;
  }

  &:hover {
    background-color: #f5f5f5;
    cursor: pointer;
  }
`;
// const Submenu = styled.ul`
//   display: flex;
//   flex-direction: row;
//   list-style: none;
//   margin: 0;
//   padding: 0;
// `;

// const SubmenuItem = styled.li`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   background-color: white;
//   margin: 0;
//   padding: 0 10px;
//   color: #1da1f2;
//   font-size: 16px;
//   text-decoration: none;

//   img {
//     max-height: 31px;
//     padding: 0px 5px;
//   }
// `;
export default PokeSignin
