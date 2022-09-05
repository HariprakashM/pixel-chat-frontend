import { io } from "socket.io-client";
import React from "react";
import { config } from '../config'
const SOCKET_URL = `${config.api}`;
export const socket = io(SOCKET_URL);
// app context
export const AppContext = React.createContext();