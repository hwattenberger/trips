import React, { useState, useEffect } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { CREATE_USER } from './../../query/query'
import { useMutation } from '@apollo/client';
import { Input } from "./../../styles/general";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const [login, result] = useMutation(CREATE_USER, {
        onError: (error) => {
            if (error.graphQLErrors[0]) setErr(error.graphQLErrors[0].message)
            else setErr("Registering was not successful");
        }
    });

    // useEffect(() => {
    //     if (result.data) {
    //         console.log("Registered!");
    //     }
    // }, [result.data])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErr("");

        login({ variables: { input: { username, password } } })
    }

    return (
        <Container>
            <h1>Register</h1>
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
                    <Button variant="outlined" type="submit">Register</Button>
                </form>
            </div>
        </Container>
    );
}

export default Register;