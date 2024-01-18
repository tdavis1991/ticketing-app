"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
  const router = useRouter();
  const startingTicketData = {
    title: "",
    description: "",
    status: "open",
    severity: "medium",
    priority: 1,
  };
  const [formData, setFormData] = useState(startingTicketData);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM DATA:", formData);

    const res = await fetch("/api/ticket/new", {
      method: "POST",
      body: JSON.stringify({ formData }),
      "content-type": "application/json",
    });

    if (!res.ok) {
      throw new Error("Failed to create ticket");
    }

    router.refresh();
    router.push("/");
  };

  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/3 mt-3 shadow-md text-black"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>Create Your Ticket</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <label>Description</label>
        <textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows="5"
        />
        <label>Severity</label>
        <select
          name="severity"
          value={formData.severity}
          onChange={handleChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <label>Priority</label>
        <div className="text-white">
          <input
            id="priority-1"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={1}
            checked={formData.priority == 1}
          />
          <label>1</label>
          <input
            id="priority-2"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={2}
            checked={formData.priority == 2}
          />
          <label>2</label>
          <input
            id="priority-3"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={3}
            checked={formData.priority == 3}
          />
          <label>3</label>
          <input
            id="priority-4"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={4}
            checked={formData.priority == 4}
          />
          <label>4</label>
          <input
            id="priority-5"
            name="priority"
            type="radio"
            onChange={handleChange}
            value={5}
            checked={formData.priority == 5}
          />
          <label>5</label>
        </div>
        <input type="submit" className="btn" value="Create Ticket" />
      </form>
    </div>
  );
};

export default TicketForm;
