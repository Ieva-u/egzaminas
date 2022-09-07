import Button from '../common/Button';

const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};

const ReadOnlyGuest = ({ guest, handleEditableId, onDelete }) => {
    const date = new Date(guest.date).toLocaleDateString('en-gb', dateOptions);

    return (
        <div className="container">
            <div className="guest">
                <div className="text-container">
                    <h3>{guest.name}</h3>
                    <h5>{guest.email}</h5>
                    <h5>{date}</h5>
                </div>
                <div className="action-container">
                    <Button
                        id="delete"
                        text={'Delete'}
                        onClick={() => onDelete(guest.id)}
                    />
                    <Button
                        id="update"
                        text="Edit"
                        onClick={() => handleEditableId(guest)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ReadOnlyGuest;
