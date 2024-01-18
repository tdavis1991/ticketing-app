import Ticket from "@/app/(models)/Ticket";
import { connectToDB } from "@/utils/database";

export const GET = async () => {
  try {
    connectToDB();

    const tickets = await Ticket.find();

    return new Response(JSON.stringify({ tickets }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 500, message: "Server error" })
    );
  }
};
