import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import '../../styles/form.css';

const Login = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URI}/users/auth/login`,
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const data = await response.json();
            if (data.error) return alert(data.error);
            // setUser(data.user);
            navigate('/');
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="form">
            <div className="login-form">
                <form onSubmit={onFormSubmit}>
                    <div className="input-container">
                        <label>Email </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={(event) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    email: event.target.value,
                                }))
                            }
                            value={userData.email}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={(event) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    password: event.target.value,
                                }))
                            }
                            value={userData.password}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button
                            className="btn"
                            type="submit"
                            onClick={onFormSubmit}
                        >
                            Login
                        </button>
                    </div>
                    <div className="link-container">
                        <p>New here?</p>
                        <Link
                            className="link"
                            to="/register"
                        >
                            Create an account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
