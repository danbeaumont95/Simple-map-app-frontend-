import React, { useState, useEffect, useRef } from 'react';
import UserService from '../../Services/user.service';
import Form from 'react-validation/build/form';
import Swal from 'sweetalert2';
import { TextField, Typography, Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword]=  useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const form = useRef();

    const onChangeFirstName = (e) => {
        const firstName = e.target.value;
        setFirstName(firstName);
    };
    const onChangeLastName = (e) => {
        const lastName = e.target.value;
        setLastName(lastName);
    };
    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };
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
        UserService.register(username, password, email, firstName, lastName)
            .then((res) => {
                console.log(res, 'res');
                if (res.data.error) {
                    console.log(error, 'error res data');
                    return Swal.fire({
                        title: 'Error',
                        text: res.data.error
                    })
                }
                console.log('done');
                setSuccessful(true)
                return Swal.fire({
                    title: 'Successful',
                    text: 'You will now be redirected to Login'
                })
                .then(() => {
                    window.location = "/login";
                })
            })
            .catch((err) => {
                console.log(err, 'error in catch');
                setError(true);
            })
    };
    return (
        <>
        <h1>Register</h1>
        <Form onSubmit={handleSubmit} ref={form}>
            <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={[firstName]}
                onChange={onChangeFirstName}
            />
            <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={[lastName]}
                onChange={onChangeLastName}
            />
            <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={[username]}
                onChange={onChangeUsername}
              />
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={"/login"} variant="body2">
                <Typography  style={{color: '#000000'}}>Already have an account? Sign in</Typography>
              </Link>
            </Grid>
          </Grid>
        </Form>
        </>
    )
};

export default Register;