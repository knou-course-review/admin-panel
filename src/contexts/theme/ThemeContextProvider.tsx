"use client";

import {
  experimental_extendTheme as extendTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";
import { noto_sans_kr } from "@/constants/next-font";

export default function ThemeContextProvider({ children }: { children: React.ReactNode }) {
  const theme = extendTheme({
    typography: {
      fontFamily: noto_sans_kr.style.fontFamily,
    },
    colorSchemes: {
      // light: {
      //   palette: {
      //     primary: {
      //       main: "#",
      //     },
      //   },
      // },
      dark: {
        palette: {
          // primary: {
          //   main: "#",
          // },
          // text: {
          //   primary: "#",
          //   secondary: "#",
          // },
          error: {
            main: "#ff5d65",
          },
        },
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "0.5rem",
          },
        },
      },
    },
  });
  return (
    <CssVarsProvider defaultMode="system" theme={theme}>
      {children}
    </CssVarsProvider>
  );
}
