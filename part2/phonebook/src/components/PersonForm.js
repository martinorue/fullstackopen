import React from "react";

const PersonForm = ({ onSubmit, newName, handleNameChange, newPhone, handlePhoneChange }) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name:
                <input
                    value={newName}
                    onChange={handleNameChange}
                />
                <div>number:
                    <input
                        value={newPhone}
                        onChange={handlePhoneChange}
                    />
                </div>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm