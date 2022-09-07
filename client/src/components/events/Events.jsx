import { useEffect, useState, Fragment } from 'react';

import EditableEvent from './EditableEvent';
import ReadOnlyEvent from './ReadOnlyEvent';
import Button from '../common/Button';

const serverUrl = `${process.env.REACT_APP_SERVER_URI}/events`;

const Events = () => {
    const [events, setEvents] = useState([
        {
            id: '',
            name: '',
            date: '',
        },
    ]);
    const [event, setEvent] = useState({
        name: '',
        date: '',
    });
    const [editEventId, setEditEventId] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        await fetch(serverUrl)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((events) => {
                setEvents(events);
            })
            .finally(() => setLoading(false));
    };

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdd = async (event) => {
        await fetch(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .then((response) => {
                const newEvent = { ...event, id: response.insertId };
                setEvents([...events, newEvent]);
            });
    };

    const handleEditableId = (event) => {
        event ? setEditEventId(event.id) : setEditEventId(event);
    };

    const onSave = async (event) => {
        await fetch(serverUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw response;
                }
            })
            .finally(() => {
                const newState = events.map((e) => {
                    if (e.id === event.id) {
                        return event;
                    }
                    return e;
                });
                setEvents(newState);
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
            .finally(setEvents(events.filter((event) => event.id !== id)));
    };

    if (loading) return 'Loading...';

    return (
        <div>
            {events.length !== 0 ? (
                <h2>Upcoming events</h2>
            ) : (
                <h4>There are no events</h4>
            )}
            {events.map((event) => (
                <Fragment key={event.id}>
                    {editEventId === event.id ? (
                        <EditableEvent
                            event={event}
                            handleEditableId={handleEditableId}
                            onSave={onSave}
                        />
                    ) : (
                        <ReadOnlyEvent
                            event={event}
                            handleEditableId={handleEditableId}
                            onDelete={onDelete}
                        />
                    )}
                </Fragment>
            ))}
            <hr className="hline" />
            <div>
                <h2>Add new event</h2>
                <div className="container">
                    <div className="input-container">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            key="name"
                            placeholder="CodeAcademy exam"
                            id="name"
                            onChange={handleChange}
                            value={event.name}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Date</label>
                        <input
                            type="text"
                            name="date"
                            key="date"
                            placeholder="2022-08-31T23:59:59"
                            id="date"
                            onChange={handleChange}
                            value={event.date}
                            required
                        />
                    </div>
                    <div className="add-button-container">
                        <Button
                            id="new-event"
                            text={'Add new'}
                            onClick={() => handleAdd(event)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
