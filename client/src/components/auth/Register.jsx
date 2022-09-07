import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        username: '',
        password: '',
    });

    const onFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `${process.env.REACT_APP_SERVER_URI}/users/auth/register`,
                {
                    method: 'POST',
                    body: JSON.stringify(userData),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            const data = await response.json();
            if (data.error) return console.log('User is not created!');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="form">
            <div className="login-form">
                <form onSubmit={onFormSubmit}>
                    <div className="input-container">
                        <label>Email</label>
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
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            onChange={(event) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    username: event.target.value,
                                }))
                            }
                            value={userData.username}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={userData.password}
                            onChange={(event) =>
                                setUserData((prev) => ({
                                    ...prev,
                                    password: event.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button
                            className="btn"
                            type="submit"
                        >
                            Register
                        </button>
                    </div>
                    <div className="link-container">
                        <p>Already have an account?</p>
                        <Link
                            className="link"
                            to="/login"
                        >
                            Sign in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
