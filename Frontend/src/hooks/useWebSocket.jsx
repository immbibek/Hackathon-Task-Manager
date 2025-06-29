import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://taskmanager-backend-uuo3.onrender.com"); // Your backend URL

export const useWebSocket = (userId) => {
  const [realtimeUpdates, setRealtimeUpdates] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to socket server:", socket.id);
    });

    socket.on("task_updated", (data) => {
      if (data.task.assignedTo.includes(userId)) {
        setRealtimeUpdates((prev) => [...prev.slice(-4), data]);
      }
    });

    return () => {
      socket.off("task_updated");
      socket.disconnect();
    };
  }, [userId]);

  const clearUpdate = (index) => {
    setRealtimeUpdates((prev) => prev.filter((_, i) => i !== index));
  };

  return { realtimeUpdates, clearUpdate };
};
