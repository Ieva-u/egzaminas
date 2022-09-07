import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

const NavBar = () => {
    const { setUser } = useContext(AuthContext);

    return (
        <section className="navbar">
            <a
                href="/"
                className="navbar-item"
            >
                Home
            </a>
            <a
                href="/events"
                className="navbar-item"
            >
                Events
            </a>
            <a
                href="/login"
                className="navbar-item"
                onClick={() => setUser(null)}
            >
                Logout
            </a>
        </section>
    );
};

export default NavBar;
