"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getStatusColor } from "@/utils/statusColor";

const Ticket = ({ params }) => {
  const [ticket, setTicket] = useState({});
  const router = useRouter();

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

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/ticket/${ticketId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        window.alert("Ticket successfully deleted");
        // Perform additional actions if needed
        router.push("/");
      } else {
        const errorResponse = await res.json(); // Parse the error response as JSON
        console.error("Failed to delete ticket:", errorResponse.message);
        window.alert(errorResponse.message);
      }
    } catch (error) {
      console.error("Error deleting ticket:", error);
      window.alert(error);
      // Handle network or other errors
    }
  };
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-semibold">{ticket.title}</h1>
        <div className="text-gray-500">
          Status:{" "}
          <span
            className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(
              ticket.status
            )}`}
          >
            {ticket.status}
          </span>{" "}
          | Priority: {ticket.priority}
          <button
            className="bg-red-700 ml-3 px-5 py-2 text-white rounded-xl hover:cursor-pointer hover:bg-red-400"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p>{ticket.description}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Comments/Updates</h2>
            {ticket?.comments &&
              ticket.comments.map((comment, index) => (
                <div key={index} className="mb-2">
                  <span className="font-semibold">{comment.author}</span>
                  <p>{comment.text}</p>
                  <small className="text-gray-500">{comment.timestamp}</small>
                </div>
              ))}
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Details</h2>
            <ul>
              <li>
                <strong>Assignee:</strong> Frost
              </li>
              <li>
                <strong>Reporter:</strong> Tevin Davis
              </li>
              <li>
                <strong>Date Created:</strong> 1/12/24
              </li>
              <li>
                <strong>Date Last Updated:</strong> 1/18/24
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Attachments</h2>
            <ul>
              {ticket?.attachments &&
                ticket.attachments.map((attachment, index) => (
                  <li key={index} className="mb-2">
                    <a
                      href={attachment.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {attachment.filename}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ticket;

// return (
//   <div className="flex flex-col w-full justify-center items-center">
//     <h1 className="my-4">{ticket.title}</h1>
//     <div className="flex justify-evenly">
//       <p className="w-1/3">{ticket.description}</p>
//       <div>
//         <h2>Attachments</h2>
//       </div>
//     </div>
//     <div className="flex">

//     </div>
//   </div>
// );
