import {  theme } from "../GlobalStyles";
import styled from "styled-components";
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect, useContext } from "react";
// import { useHistory } from 'react-router-dom';
import { PokeContext } from "./PokeContext";
import { useNavigate } from "react-router-dom";

const PokeSignin = () => {
const { loginWithRedirect, loginWithPopup, user, isAuthenticated, logout } = useAuth0();
const { dispatch, state } = useContext(PokeContext);
const [isAnonymUser, setAnonymUser] = useState(true);
const navigate = useNavigate();
// const history = useHistory();

// const { logout } = useAuth0();
// useEffect(() => {
//   const logoutAndRedirect = async () => {
//     await logout({ returnTo: window.location.origin });
//   };
//   logoutAndRedirect();
// }, [logout]);
// useEffect(() => {
//   loginWithRedirect({
//     prompt: 'login', // Forces the user to log in again
//   });
// }, [loginWithRedirect]);

// Redirect the user to another route after initiating the login flow
useEffect(() => {
  // history.push('/'); // Replace with the desired route
  console.log("savedUser?", state.user);
  let storedTempUser =JSON.parse(localStorage.getItem("savedUser"));
  console.log("storedUser?", storedTempUser);
  if (!state.user) {
    state.user = JSON.parse(localStorage.getItem("savedUser")) ;
    console.log("savedUser gotten from browser", state.user.nickname);
  }
  state.user.nickname && navigate(`/user/${state.user.nickname}/${state.user.pokeId}`);
}, []);

useEffect( () => {
  (isAuthenticated && user) 
  ? console.log("user", user, user.email) 
  : console.log("error");

  if (user) {
    fetch("/create-get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Replace with the user data you want to send
    })
      .then(res => {
        // if (!res.ok) {
        //   throw new Error('Network response was not ok');
        // }
        return res.json(); // Parse the JSON data 
      })
      .then(data => {
        // Work with the parsed data
        dispatch({type: "ASSIGN_USER", payload: data.data});
        setAnonymUser(false);
        console.log("data",data);
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch or processing
        console.error('Fetch error:', error);
      });
  }
  state && console.log("EFFECTstate", state.user);
  state && localStorage.setItem("savedUser", JSON.stringify(state.user));

}, [user]);

useEffect( () => {
  state.user && console.log("state user", state.user);
  state.user && console.log("state pokeId", state.user.pokeId);
  state.user && console.log("state nickname", state.user.nickname);
  if (state.user.nickname && !isAnonymUser) {
    console.log("timer is running");
    const timerId = setTimeout(() => {
      navigate(`/user/${state.user.nickname}/${state.user.pokeId}`);
    }, 5000); // Change the delay time as needed (in milliseconds)
    // Clean up the timer when the component unmounts or aUser changes
    return () => clearTimeout(timerId);
  }
}, [ isAnonymUser]);



  // const handleSignIn = () => {
  //   // loginWithRedirect(); // Redirect to Auth0 login page for authentication
  //     loginWithRedirect({
  //     screen_hint: 'signup', // Directs the user to the sign-up part of Auth0
  //   });
  // };

  // const handleLogIn = () => {
  //   loginWithRedirect(); // Redirect to Auth0 login page for authentication
  // };
  const handleSignIn = async () => {
    try {
      await loginWithRedirect({
            screen_hint: 'signup', // Directs the user to the sign-up part of Auth0
            scope: 'openid email profile', // Include the email scope
            prompt: 'login', // Forces the user to log in again
          }); // Opens Auth0 in a modal for sign-in
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  const handleLogIn = async () => {
    try {
      await loginWithPopup({
        scope: 'openid email profile', // Include the email scope
        prompt: 'login', // Forces the user to log in again
    }); // Opens Auth0 in a modal for log-in
    } catch (error) {
      console.error('Error during log-in:', error);
    }
  }

  return (
    <Wrapper>
      <div><p>Hello, poketrainer!</p></div>
      <Abutton onClick={handleSignIn}>Sign Up</Abutton>
      <Abutton onClick={handleLogIn}>Log In</Abutton>
    </Wrapper>
  )
}
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // self-align: center;
  // self-justify: center;
  margin: 0;
  width: 50%;
  // height: 35px;
  padding: 30px;
  background-color: ${theme.colors.pokeblue};
  // background-color: ${theme.colors.pokered};
  font-size: 20px;
`;
const Abutton = styled.button`
  background-color: ${theme.colors.pokeyellow};
  color: white;
  width: 40%;
  border: px solid white; 
  // ${theme.colors.pokered};
  margin: 20px;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
`

export default PokeSignin
