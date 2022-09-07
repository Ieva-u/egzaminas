import { useNavigate } from 'react-router-dom';

import Button from '../common/Button';

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

const ReadOnlyEvent = ({ event, handleEditableId, onDelete }) => {
    const date = new Date(event.date).toLocaleDateString('en-gb', dateOptions);
    const time = new Date(event.date).toLocaleTimeString('en-gb');

    const navigate = useNavigate();

    return (
        <div className="container">
            <div className="event">
                <div className="text-container">
                    <h3>{event.name}</h3>
                    <div className="datetime-container">
                        <p id="date">{date} </p>
                        <p id="time">{time}</p>
                    </div>
                </div>
                <div className="action-container">
                    <Button
                        id="delete"
                        text={'Delete'}
                        onClick={() => onDelete(event.id)}
                    />
                    <Button
                        id="update"
                        text="Edit"
                        onClick={(e) => handleEditableId(event)}
                    />
                    <Button
                        id="view"
                        text={'View'}
                        onClick={() => {
                            navigate(`/${event.id}/guests`, { state: event });
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReadOnlyEvent;
