import { createTheme } from "@mui/material/styles";

const getDesignTokens = (isLight) => ({
  palette: {
    mode:( isLight ? 'light' : 'dark' ),
    isLight,
    ...(isLight ? 
      {
      // Светлая тема
      primary: {
        main: "#2d2e49",
        footer:"#2d2e49",
      },
      background: {
        default: "#f4f6f8",
        paper: "#f5f5f5",
      },
      text: {
        primary: "#2d2e49",
        secondary: "#575b8c",
        pastel: '#555',
      },
    } : {
      // Темная тема
      primary: {
        main: "#f55",
        footer:"#262626",
      },
      background: {
        default: "#181818",
        paper: "#181818",
      },
      text: {
        primary: "#ffffff",
        secondary: "#bdbdbd",
        pastel: '#777',
      },
    }
  ),
  },
});

const createAppTheme = (isLight) => {
  return createTheme(getDesignTokens(isLight))
}

export default createAppTheme;
