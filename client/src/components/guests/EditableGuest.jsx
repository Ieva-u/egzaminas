import { useState } from 'react';

import Button from '../common/Button';

const EditableGuest = ({ guest, handleEditableId, onSave }) => {
    const [newGuest, setNewGuest] = useState(guest);

    const handleChange = (e) => {
        setNewGuest({ ...newGuest, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <div className="guest">
                <div className="text-container">
                    <div>Name and surname</div>
                    <input
                        type="text"
                        name="name"
                        value={newGuest.name}
                        onChange={handleChange}
                    />
                    <div>Email</div>
                    <div className="text-container">
                        <input
                            type="email"
                            name="email"
                            value={newGuest.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>Date</div>
                    <div className="datetime-container">
                        <input
                            type="text"
                            name="date"
                            maxLength={10}
                            value={newGuest.date}
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
                            onSave(newGuest);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditableGuest;
