import { Backdrop, SigninExpirationTime } from '@dtap/ui-core-components';
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { orange } from '@material-ui/core/colors';
import React from 'react';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

const theme: any = createMuiTheme({
  status: {
    danger: orange[500],
  },
});

const LayoutDefault = (props: any) => {
  const {children} = props;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
      <SigninExpirationTime />
      <Backdrop />
    </ThemeProvider>
  )
}
export default LayoutDefault;
export { LayoutDefault };

