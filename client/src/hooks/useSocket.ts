import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const useSocket = (url: string) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(url);

    return () => {
      socket.current?.disconnect();
    };
  }, [url]);

  return socket;
};

export default useSocket;
