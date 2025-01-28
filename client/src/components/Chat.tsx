import React, { useState, useEffect } from "react";
import useSocket from "../hooks/useSocket";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const Chat = () => {
  const [messages, setMessages] = useState<unknown[]>([]);
  const [message, setMessage] = useState("");
  const socket = useSocket("/socket.io");

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    const newMessage = {
      text: message,
      timestamp: new Date(),
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
      <div className="h-96 overflow-y-scroll bg-gray-100 rounded-lg p-4">
        {messages.map((msg, index) => (
          <p key={index} className="bg-white p-2 mb-2 rounded shadow">
            {msg.text}
          </p>
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
