import React, { useState, useEffect } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { LOGIN } from './../../query/query'
import { useMutation } from '@apollo/client';

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const [login, result] = useMutation(LOGIN, {
        onError: (error) => {
            if (error.graphQLErrors[0]) setErr(error.graphQLErrors[0].message)
            else setErr("Logging in was not successful");
        }
    });

    useEffect(() => {
        if (result.data) {
            console.log("Logged in!");
        }
    }, [result.data])

    const handleSubmit = (e) => {
        e.preventDefault();
        setErr("");

        login({ variables: { input: { username, password } } })
    }



    return (
        <Container>
            <h1>Login</h1>
            <div>
                <div>{err}</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField name="username" label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <TextField name="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <Button variant="outlined" type="submit">Login</Button>
                </form>
            </div>
        </Container>
    );
}

export default Login;