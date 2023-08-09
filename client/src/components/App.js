import { GlobalStyle, theme } from "../GlobalStyles";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import styled from "styled-components";
import PokeNavBar from "./PokeNavBar";
import PokeSignin from "./PokeSignin";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <PokeNavBar />

      <Structurediv>
        {/* <PokeSideBar /> */}
        <Routes>
          <Route path="/" element={<PokeSignin />} />
          {/* <Route path="/:user" element={<PokeHome />} /> */}
          {/* <Route path="/error" element={<PokError />} /> */}
        </Routes>
        {/* <PokeFooter/> */}
      </Structurediv>
    </Router>
  );
}

const Structurediv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  font-family: ${theme.primaryFontFamily};
  color: ${theme.textColors.primary};
  background-color: ${theme.colors.primary};
  width: 100%;
  height: 100vh;
  padding-top: 34px;
  // justify-content: center;
  align-items: center;
`;
export default App;
