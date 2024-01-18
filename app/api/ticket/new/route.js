import Ticket from "@/app/(models)/Ticket";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

export const POST = async (req) => {
  try {
    await connectToDB();

    const body = await req.json();
    const newTicket = body.formData;
    await Ticket.create(newTicket);

    return new Response(JSON.stringify(newTicket), {
      status: 201,
      message: "Ticket created successfully!",
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ status: 500, message: "Server error" })
    );
  }
};
