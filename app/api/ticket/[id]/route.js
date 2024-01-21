import Ticket from "@/app/(models)/Ticket";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    connectToDB();
    console.log("server", params);
    const ticket = await Ticket.findById(params.id);

    if (!ticket) return new Response("Ticket not founded", { status: 404 });

    return new Response(JSON.stringify(ticket), { status: 200 });
  } catch (error) {
    return new Response(`Server error: ${error}`, { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    connectToDB();

    const existingTicket = await Ticket.findById(params.id);

    if (!existingTicket) {
      return new Response("Ticket not found", { status: 404 });
    }

    if (existingTicket.status !== "resolved") {
      return new Response("Ticket status must be resolved before deletion", {
        status: 400,
      });
    }

    await Ticket.findByIdAndDelete(params.id);

    return new Response("Ticket successfully deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return new Response("Server error", { status: 500 });
  }
};
