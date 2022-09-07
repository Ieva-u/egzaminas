import { useState } from 'react';

import Button from '../common/Button';

const EditableEvent = ({ event, handleEditableId, onSave }) => {
    const [newEvent, setNewEvent] = useState(event);

    const handleChange = (e) => {
        setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="event">
                <div className="text-container">
                    <div>Name</div>
                    <input
                        type="text"
                        name="name"
                        value={newEvent.name}
                        onChange={handleChange}
                    />
                    <div>Date</div>
                    <div className="datetime-container">
                        <input
                            type="text"
                            name="date"
                            value={newEvent.date}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className="action-container">
                    <Button
                        id="cancel"
                        text={'Cancel'}
                        onClick={() => {
                            handleEditableId(null);
                        }}
                        onChange={handleChange}
                    />
                    <Button
                        id="save"
                        text={'Save'}
                        onClick={() => {
                            handleEditableId(null);
                            onSave(newEvent);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditableEvent;
