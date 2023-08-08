import { createGlobalStyle, ThemeProvider  } from 'styled-components';

const theme = {//just a first approach for colors, just to create and share this theme object
    colors: {
      primary: '#36454F',   //blueish gray used at the moment in the navbar background
      secondary: '#333333', //dark gray almost black used at the moment as general background
      highlight: '#1DB954', //spotify green used at the moment for button colors
      darkHighlight: '#179346',//spotify green used at the moment for button colors when mouse hovers
      pokeyellow: '#ffcc03',
      pokered: '#ef4036',
      pokeblue: '#4265a8',
    },
    textColors: {
      primary: 'white',     //white for texts
      secondary: 'darkgray',//darkgrey for hovering texts
      highlight: '#00ff00',//random shiny green
    },
    primaryFontFamily: 'Arial, sans-serif',
  };

const GlobalStyle = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
        v2.0 | 20110126
        License: none (public domain)
    */

    html, body, div, span, applet, object, iframe,
    blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }

    input {
        &:disabled {
            cursor: not-allowed;
        }
    }

    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
`;
const GlobalStyles = () => (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
      </>
    </ThemeProvider>
  );

export {  GlobalStyle, theme };