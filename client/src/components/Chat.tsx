import React, { useState, useEffect, useContext } from "react";
import useSocket from "../hooks/useSocket";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
  const [messages, setMessages] = useState<unknown[]>([]);
  const [message, setMessage] = useState("");
  const socket = useSocket("http://localhost:4000");
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!user) return alert("You must be logged in to send messages!");

    const newMessage = {
      text: message,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      timestamp: serverTimestamp(),
    };

    await addDoc(collection(db, "messages"), newMessage);
    socket?.current?.emit("send_message", newMessage);
    setMessage("");
  };

  socket?.current?.on("receive_message", (data) => {
    setMessages((prev) => [...prev, data]);
  });

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Welcome, {user?.displayName}</h1>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>
      <div className="h-96 overflow-y-scroll bg-gray-100 rounded-lg p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-white p-2 mb-2 rounded shadow flex items-center"
          >
            {msg.userPhoto && (
              <img
                src={msg.userPhoto}
                alt={msg.userName}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div>
              <strong>{msg.userName || "Anonymous"}:</strong> {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <input
          className="flex-1 p-2 border rounded"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
