import React, { createContext, useState, useReducer, useEffect } from "react";
const PokeContext = createContext();
// const { dispatch } = useContext(PokeContext);

const handleCreateUser = async (userData) => {
  try {
    const response = await fetch("/create-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData), // Replace with the user data you want to send
    });
  } catch (error) {
    console.error("Error creating user:", error);
  }
};
// Create a reducer function, at the moment just some basic functions for testing
const myReducer = (state, action) => {
  switch (action.type) {
    case "ASSIGN_USER":
        // handleCreateUser(action.payload);
        return {
          // assign user
          ...state,
          user: action.payload,
        };
      
    default:
      return state;
    }
};

// Create a provider component
const PokeContextProvider = ({ children }) => {
  const initialState = {
    // user: JSON.parse(localStorage.getItem("savedUser")) || {},
    user: {},
  };

  const [state, dispatch] = useReducer(myReducer, initialState);
//   const [aUser, setUser] = useState(initialState);

  // Fetch cart data and set it in the state when the context is initialized
  useEffect(() => {
    // fetch(`/cart`)
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error();
    //     } else {
    //       return res.json();
    //     }
    //   })
    //   .then((data) => {
    //     dispatch({ type: "SET_CART", cartItems: data.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  const contextValue = {
    // aUser,
    // setUser,
    state,
    dispatch,
  };

  // Render the context provider with the shared states
  return (
    <PokeContext.Provider value={contextValue}>
        {children}
    </PokeContext.Provider>
  );
};

export {PokeContext, PokeContextProvider };
