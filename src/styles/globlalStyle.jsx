import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --font-family: 'Vollkorn', serif;
    }

    body {
        font-family: var(--font-family);
        margin: 0;
        padding: 0;
    }
`;

export default GlobalStyles;
