import { createTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material";

const theme: Theme = createTheme({
    palette: {
        primary: {
            light: "#39796b",
            main: "#004d40",
            dark: "#00251a",
            contrastText: "#ffffff"
        },
        secondary: {
            light: "#534bae",
            main: "#1a237e",
            dark: "#000051",
            contrastText: "#ffffff"
        }
    }
});

export default theme;
