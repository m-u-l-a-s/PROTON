import { ThemeContext, ThemeProvider, useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { ReactNode, useState } from "react";
import { DarkTheme } from "../themes";

export const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [themeName, setThemeName] = useState("dark");

  const theme = useTheme();

  return (
    <ThemeContext.Provider value={{ themeName }}>
      <ThemeProvider theme={DarkTheme}>
        <Box width="101%" height="61em" bgcolor={"#292A2D"}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
