"use client";
import TicketCard from "../(components)/TicketCard";
import { useState, useEffect } from "react";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/ticket");
        const data = await res.json();

        setTickets(data);
        console.log("TICKETS:", tickets);
      } catch (error) {
        console.log("Failed to get tickets", error);
      }
    };
    getTickets();
  }, []);

  return (
    <div className="p-5">
      <div className="lg:grid grid-cols-3 xl:grid-cols-4">
        {tickets?.tickets?.map((ticket) => (
          <TicketCard
            key={ticket._id}
            title={ticket.title}
            priority={ticket.priority}
            date={ticket.createdAt}
            description={ticket.description}
            status={ticket.status}
            id={ticket._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Tickets;
