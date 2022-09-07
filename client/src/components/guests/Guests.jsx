import { useEffect, useState, Fragment } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import Button from '../common/Button';
import EditableGuest from './EditableGuest';
import ReadOnlyGuest from './ReadOnlyGuest';

const serverUrl = `${process.env.REACT_APP_SERVER_URI}/guests`;

const Guests = () => {
    const event = useLocation().state;
    const params = useParams();

    const [guests, setGuests] = useState([
        {
            id: '',
            name: '',
            email: '',
            date: '',
        },
    ]);
    const [guest, setGuest] = useState({
        name: '',
        email: '',
        date: '',
    });
    const [editGuestId, setEditGuestId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getGuests();
    }, []);

    const getGuests = async () => {
        await fetch(`${serverUrl}/${params.id}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((guests) => {
                setGuests(guests);
            })
            .finally(() => setLoading(false));
    };

    const handleEditableId = (guest) => {
        guest ? setEditGuestId(guest.id) : setEditGuestId(guest);
    };

    const handleChange = (e) => {
        setGuest({
            ...guest,
            [e.target.name]: e.target.value,
        });
    };

    const onAdd = async (guest) => {
        await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...guest, eventId: event.id }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((response) => {
                const newGuest = { ...guest, id: response.insertId };
                setGuests([...guests, newGuest]);
            });
    };

    const onSave = async (guest) => {
        await fetch(serverUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guest),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .finally(() => {
                const newState = guests.map((e) => {
                    if (e.id === guest.id) {
                        return guest;
                    }
                    return e;
                });
                setGuests(newState);
            });
    };

    const onDelete = async (id) => {
        await fetch(serverUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(setGuests(guests.filter((event) => event.id !== id)));
    };

    if (loading) return 'Loading...';

    return (
        <div>
            <div className="title">
                <h2 className="events-title">{event.name}</h2>
            </div>
            <hr className="hline" />
            {guests.length !== 0 ? (
                <div>
                    {<h2>Event guests</h2>}
                    {guests.map((guest) => (
                        <Fragment key={guest.id}>
                            {editGuestId === guest.id ? (
                                <EditableGuest
                                    guest={guest}
                                    handleEditableId={handleEditableId}
                                    onSave={onSave}
                                />
                            ) : (
                                <ReadOnlyGuest
                                    guest={guest}
                                    handleEditableId={handleEditableId}
                                    onDelete={onDelete}
                                />
                            )}
                        </Fragment>
                    ))}
                </div>
            ) : (
                <h4>There are no guests</h4>
            )}
            <hr className="hline" />
            <div>
                <h2>Add new guest</h2>
                <div className="container">
                    <div className="input-container">
                        <label>Name and surname</label>
                        <input
                            type="text"
                            name="name"
                            key="name"
                            placeholder="Jonas Jonaitis"
                            id="name"
                            onChange={handleChange}
                            value={guest.name}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            key="email"
                            placeholder="jonas.jonaitis@mail.com"
                            id="email"
                            onChange={handleChange}
                            value={guest.email}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Date</label>
                        <input
                            type="text"
                            name="date"
                            key="date"
                            placeholder="1970-01-01"
                            id="date"
                            onChange={handleChange}
                            value={guest.date}
                            required
                        />
                    </div>
                    <div className="add-button-container">
                        <Button
                            id="new-guest"
                            text={'Add new'}
                            onClick={() => onAdd(guest)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Guests;
