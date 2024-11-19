// FILE: NotificationModal.jsx
import React from 'react';

const NotificationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg z-10">
                <h2 className="text-2xl font-bold mb-4">You don't have any notifications yet</h2>
                <button
                    className="btn btn-primary"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default NotificationModal;