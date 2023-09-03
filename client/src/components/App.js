import { GlobalStyle, theme } from "../GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled from "styled-components";
import PokeNavBar from "./PokeNavBar";
import PokeSignin from "./PokeSignin";
import PokeSideBar from "./PokeSideBar";
import PokeHome from "./PokeHome";
import {  useContext } from "react";
import { PokeContext } from "./PokeContext";
// import { PokeProcess } from "./PokeProcess";
// import PokeSteps from "./PokeSteps";
import PokeSteps from "./PokeSteps";
import PokeCheck from "./PokeCheck";
import PokeTrack from "./PokeTrack";
import PokeStats from "./PokeStats";
import 'chart.js';
function App() {
  const {   state } = useContext(PokeContext);

  return (
    <Router>
      <GlobalStyle />
      <PokeNavBar />

      <Structurediv state={state.user.nickname}>
        { state.user.sub && <PokeSideBar />}
        <Routes>
          <Route path="/" element={<PokeSignin />} />
          <Route path="/user/:nick/:pokeId" element={<PokeHome />} />
          <Route path="/:pokeId/:pokemon/:pokegoal" element={<PokeSteps />} />
          <Route path="/:pokeId/:pokemon/:pokegoal/check" element={<PokeCheck />} />
          <Route path="/:pokeId/:pokemon/:pokegoal/track" element={<PokeTrack />} />
          <Route path="/:nick/:pokeId" element={<PokeStats />} />
          {/* <Route path="/error" element={<PokError />} /> */}
        </Routes>
        {/* <PokeFooter/> */}
      </Structurediv>
    </Router>
  );
}

const Structurediv = styled.div`
  display: flex;
  // flex-direction: column;
  margin: 0;
  font-family: ${theme.primaryFontFamily};
  color: ${theme.textColors.primary};
  background-color: ${theme.colors.primary};
  width: calc(100% - 30px);// 30px for padding
  min-height: calc(100vh - 40px);
  // height: 100vh;
  padding: 34px 10px 0px;
  border: 5px solid black;
  // justify-content: ${props => props.state} ? center : space-around};
  justify-content:${props => (props.state ? 'space-between' : 'center' )};
  // align-items: center;
  max-height: auto;
`;
export default App;