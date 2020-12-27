import React from 'react'
import { Redirect,  } from '@reach/router'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import AuthContext from '../auth/AuthContext'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  shape: {
    borderRadius: 8
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
})

const darkTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark'
  },
  shape: {
    borderRadius: 8
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
})

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthContext.Consumer>
    {context => {
      if (context.user.id) {
        return (
          <MuiThemeProvider
          theme={darkTheme}
            theme={context.user.theme === 'light'}
          >
            <Component {...rest} />
          </MuiThemeProvider>
        )
      }
      return <Redirect noThrow from="/" to="/home" />
    }}
  </AuthContext.Consumer>
)

export default ProtectedRoute
