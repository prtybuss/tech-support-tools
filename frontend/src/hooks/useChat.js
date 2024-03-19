import React from "react";
import { createContext, useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { getMessages, messageDeleted } from "../slices/messagesSlice";
import { markAllMessagesAsRead, updateTicket } from "../slices/ticketSlice";
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [currentTicketId, setCurrentTicketId] = useState(null);
  const [chatLoading, setChatLoading] = useState(false);


  const getMessageHistory = async (ticketId) => {
    console.log('getMessageHistory', 'id', ticketId);
    if (ticketId === currentTicketId) return;
    setCurrentTicketId(ticketId);
    setChatLoading(true);
    dispatch(getMessages(ticketId));
    setChatLoading(false);
  };

  const createMessage = async (messageText) => {
    dispatch(createMessage({ ticketId: currentTicketId, text: messageText }));
  };

  const deleteMessage = async (id) => {
    dispatch(messageDeleted({ ticketId: currentTicketId, messageId: id }));
  };

  const closeTicket = async () => {
    dispatch(updateTicket({ ticketId: currentTicketId, changes: { status: "closed" } }))
  }

  const markAsRead = async () => {
    dispatch(markAllMessagesAsRead({ id: currentTicketId }));
  }

  const value = {
    currentTicketId, setCurrentTicketId,
    chatLoading,
    getMessageHistory: getMessageHistory,
    readAllMessages: markAsRead,
    createMessage: createMessage,
    deleteMesage: deleteMessage,
    closeTicket: closeTicket,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  return useContext(ChatContext);
};
