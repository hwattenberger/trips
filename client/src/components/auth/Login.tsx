import React, { useState, useEffect } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { LOGIN } from './../../query/query'
import { useMutation } from '@apollo/client';

interface LoginProps {
    setToken: (token: React.Dispatch<React.SetStateAction<string>>) => void
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
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
        if (result.data && result.data.login.value) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('login-user-token', token);
        }
    }, [result.data]) // eslint-disable-line

    const handleSubmit = (e: React.FormEvent) => {
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