"use client";
import { useState, useEffect } from "react";

const Ticket = ({ params }) => {
  const [ticket, setTicket] = useState({});

  const ticketId = params.id;

  useEffect(() => {
    const getTicket = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/ticket/${ticketId}`);
        const data = await res.json();

        setTicket(data);
        console.log("TICKET:", ticket);
      } catch (error) {
        console.log("Failed to get tickets", error);
      }
    };
    getTicket();
  }, []);

  console.log(ticket);

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h1 className="my-4">{ticket.title}</h1>
      <div className="flex justify-evenly">
        <p className="w-1/3">{ticket.description}</p>
        <div>
          <h2>Attachments</h2>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
