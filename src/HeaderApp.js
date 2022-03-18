
import './HeaderApp.css'
import * as React from 'react';
import Login from "./Login";
import {AppBar, Container, MenuItem, Toolbar} from "@material-ui/core";

export default function HeaderApp() {
    return (
        <>
            <AppBar position="sticky" color="inherit">
                <Container maxWidth="xl" >
                    <Toolbar disableGutters>
                        <Login/>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}