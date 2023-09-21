import WifiList from "./WifiList";
import "./App.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WifiList />
    </ThemeProvider>
  );
}

export default App;
