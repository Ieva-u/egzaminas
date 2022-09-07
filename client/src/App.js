import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './components/auth/AuthContext';
import Events from './components/events/Events';
import Guests from './components/guests/Guests';
import Header from './components/common/Header';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

function App() {
    return (
        <AuthContext.Provider value={{}}>
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/events"
                    element={<Events />}
                />
                <Route
                    path="/login"
                    element={<Login />}
                />
                <Route
                    path="/register"
                    element={<Register />}
                />
                <Route
                    path="/:id/guests"
                    element={<Guests />}
                />
            </Routes>
        </AuthContext.Provider>
    );
}

export default App;
