import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from './Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;


// import React from 'react'
// import { withStyles } from '@material-ui/core/styles'
// import { TextField, Button, Grid } from '@material-ui/core'

// import { useFormInput } from '../../../utils/hooks'
// import { formStyles } from '../Forms.styles'

// function RegularForm({ classes }) {
//   const firstName = useFormInput('')
//   const lastName = useFormInput('')
//   const email = useFormInput('')
//   const phone = useFormInput('')

//   function handleSubmit(event) {
//     event.preventDefault()
//     // Do Something
//   }

//   return (
//     <form className={classes.container} onSubmit={handleSubmit}>
//       <div className={classes.inputContainer}>
//         <Grid container spacing={24}>
//           <Grid item xs={6}>
//             <TextField
//               name="firstName"
//               label="Name"
//               margin="normal"
//               required
//               className={classes.textField}
//               {...firstName}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               name="lastName"
//               label="Last Name"
//               margin="normal"
//               required
//               className={classes.textField}
//               {...lastName}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               name="email"
//               label="Email"
//               margin="normal"
//               required
//               className={classes.textField}
//               {...email}
//             />
//           </Grid>
//           <Grid item xs={6}>
//             <TextField
//               name="phone"
//               label="Phone Number"
//               margin="normal"
//               required
//               className={classes.textField}
//               {...phone}
//             />
//           </Grid>
//           <Grid item xs={12}>
//             <Button
//               type="submit"
//               className={classes.button}
//               variant="contained"
//               color="primary"
//             >
//               submit
//             </Button>
//           </Grid>
//         </Grid>
//       </div>
//     </form>
//   )
// }

// export default withStyles(formStyles)(RegularForm)
