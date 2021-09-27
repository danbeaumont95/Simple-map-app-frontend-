import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Typography, TextField, Grid, Container, Button } from '@material-ui/core'
import Form from 'react-validation/build/form';
import Swal from 'sweetalert2';
import UserService from '../../Services/user.service';

const Login = () => {
    const form = useRef();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        form.current.validateAll();

        UserService.login(email, password)
            .then((res) => {
                console.log(res, 'res in component');
                if (res.data.error) {
                    console.log('there is an error');
                    return Swal.fire({
                        title: 'Error!',
                        // text: res.data.error,
                        text: 'Email or password are incorrect'
                      })
                }
                console.log('done');
                setSuccessful(true);
                localStorage.setItem('userToken', res.data.session.sessionToken);
                return Swal.fire({
                    title: 'Logged in!',
                    text: 'You will now be redirected to the homepage',
                    // imageUrl: 'https://unsplash.it/400/200',
                    // imageWidth: 400,
                    // imageHeight: 200,
                    // imageAlt: 'Custom image',
                  })
                  .then(() => {
                    window.location = "/";
                    localStorage.setItem('userEmail', email)
                  })
            })
            .catch(() => {
                console.log('in catch');
                setSuccessful(false)
            })
    }

    return (
        <>
            <Form noValidate onSubmit={handleSubmit} ref={form}>
            <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={[email]}
                onChange={onChangeEmail}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={[password]}
                onChange={onChangePassword}
              />
              <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Log In
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/register"} variant="body2">
                Dont have an account yet? Register here
              </Link>
            </Grid>
          </Grid>
            </Form>
        </>
    )
};

export default Login