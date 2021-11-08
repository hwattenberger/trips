import React, { useState, useEffect } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { LOGIN } from './../../query/query';
import { useMutation } from '@apollo/client';
import { Input } from "./../../styles/general";

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
            window.location.href = "/";
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
            <div className="loginRegisterDiv">
                {err && <div className="error">{err}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="formRow">
                        <label>Username:
                            <Input type="text" id="username" name="username" width="15rem" value={username} onChange={e => setUsername(e.target.value)} />
                        </label>
                    </div>
                    <div className="formRow">
                        <label>Password:
                            <Input type="password" id="password" name="password" width="15rem" value={password} onChange={e => setPassword(e.target.value)} />
                        </label>
                    </div>
                    <Button variant="outlined" type="submit">Login</Button>
                </form>
            </div>
        </Container>
    );
}

export default Login;