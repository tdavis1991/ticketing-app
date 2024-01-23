"use client";
import TicketCard from "../(components)/TicketCard";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const router = useRouter();

  const handleClick = () => {
    router.push("/TicketPage/new");
  };

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
      <div className="flex w-full justify-end">
        <button
          className="hover:no-underline bg-blue-accent hover:bg-blue-accent-hover font-bold cursor-pointer uppercase px-4 py-2 rounded-md transition-colors block mr-2 mb-2"
          onClick={handleClick}
        >
          Create Ticket
        </button>
      </div>
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
