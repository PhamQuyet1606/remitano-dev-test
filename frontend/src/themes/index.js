import { createMuiTheme, responsiveFontSizes } from "@material-ui/core";
import palette from "./palette";

const theme = createMuiTheme({
    palette: palette.light
});

export default responsiveFontSizes(theme);