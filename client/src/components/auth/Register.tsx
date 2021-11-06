import React, { useState, useEffect } from 'react';
import { Button, Container, TextField } from '@mui/material';
import { CREATE_USER } from './../../query/query'
import { useMutation } from '@apollo/client';

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

    useEffect(() => {
        if (result.data) {
            console.log("Registered!");
        }
    }, [result.data])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErr("");

        login({ variables: { input: { username, password } } })
    }



    return (
        <Container>
            <h1>Register</h1>
            <div>
                <div>{err}</div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField name="username" label="Username" value={username} onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <TextField name="password" label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <Button variant="outlined" type="submit">Register</Button>
                </form>
            </div>
        </Container>
    );
}

export default Register;