import React, { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import Navbar from "../components/Navbar";

const Chat = () => {
  const [userId] = useState(localStorage.getItem("userId"));
  const [role] = useState(localStorage.getItem("role"));
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState([]); // Store all users initially
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered users for display
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [ws, setWs] = useState(null);
  const [error, setError] = useState(null); // Error state
  const [confirmation, setConfirmation] = useState(null); // Confirmation state

  useEffect(() => {
    // Connect to WebSocket server
    const socket = new WebSocket(`ws://localhost:3100?userId=${userId}`);
    setWs(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "message") {
        // Receive new message from the recipient
        setMessages((prev) => [
          ...prev,
          { senderId: data.senderId, text: data.text },
        ]);
      } else if (data.type === "confirmation") {
        // Display confirmation to the sender
        setConfirmation(data.message);
      } else if (data.type === "error") {
        // Display error to the sender
        setError(data.message);
      }
    };

    return () => socket.close();
  }, [userId]);

  useEffect(() => {
    // Fetch all users on component mount
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/user"); // Fetch all users
        const userList = response.data.filter(
          (user) => user.role === (role === "buyer" ? "seller" : "buyer")
        ); // Filter based on role
        setAllUsers(userList);
        setFilteredUsers(userList); // Initially, show all relevant users
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    fetchUsers();
  }, [role]);

  const handleSearch = () => {
    // Filter users based on the search term
    const filtered = allUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserSelect = async (user) => {
    setSelectedUser(user);
    setMessages([]); // Reset chat messages when switching users
    setError(null); // Clear any previous errors
    setConfirmation(null); // Clear any previous confirmations

    // Fetch chat history
    try {
      const response = await axiosInstance.get(`/chat/chats/${userId}/${user._id}`);
      if (response.data.length > 0) {
        setMessages(response.data);
      } else {
        setMessages([{ text: "No chats found.", senderId: null }]);
      }
    } catch (err) {
      console.error("Failed to fetch chat history:", err);
      setMessages([{ text: "No chats found.", senderId: null }]);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() && selectedUser) {
      ws.send(
        JSON.stringify({
          type: "message",
          recipientId: selectedUser._id,
          text: message,
        })
      );
      setMessages((prev) => [...prev, { senderId: userId, text: message }]);
      setMessage("");
    } else {
      setError("Message cannot be empty.");
    }
  };

  return (
    <>
    <Navbar/>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Sidebar */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Search Users</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            className="input input-bordered w-full mb-2"
          />
          <button className="btn btn-primary w-full" onClick={handleSearch}>
            Search
          </button>
          <ul className="mt-4 space-y-2">
            {filteredUsers.map((user) => (
              <li
                key={user._id}
                className="cursor-pointer p-2 rounded hover:bg-gray-100"
                onClick={() => handleUserSelect(user)}
              >
                {user.firstName} {user.lastName} ({user.role})
              </li>
            ))}
          </ul>
        </div>

        {/* Chat Section */}
        <div className="col-span-2 bg-white p-4 rounded shadow">
          {selectedUser ? (
            <>
              <h2 className="text-lg font-bold mb-2">
                Chat with {selectedUser.firstName} {selectedUser.lastName}
              </h2>
              {error && (
                <p className="text-red-500 mb-2">{error}</p>
              )}
              {confirmation && (
                <p className="text-green-500 mb-2">{confirmation}</p>
              )}
              <div className="h-64 bg-gray-100 p-4 rounded overflow-y-scroll">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center">Loading chats...</p>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`mb-2 ${
                        msg.senderId === userId
                          ? "text-right text-green-600"
                          : "text-left text-gray-600"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))
                )}
              </div>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message"
                  className="input input-bordered flex-grow"
                />
                <button
                  className="btn btn-primary ml-2"
                  onClick={handleSendMessage}
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select a user to start chatting.</p>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Chat;
