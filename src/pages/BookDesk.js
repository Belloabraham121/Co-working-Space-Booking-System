import React, { useState, useEffect } from "react";
import DeskGrid from "../components/DeskGrid";
import BookingForm from "../components/BookingForm";
import { getData, saveData } from "../utils/localStorageUtils";

const BookDesk = () => {
  const [desks, setDesks] = useState(
    getData("desks") || [
      ...Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        isBooked: false,
        type: "individual",
      })),
      ...Array.from({ length: 5 }, (_, i) => ({
        id: i + 11,
        isBooked: false,
        type: "team",
      })),
    ]
  );

  useEffect(() => {
    saveData("desks", desks);
  }, [desks]);

  const handleBook = (id) => {
    const updatedDesks = desks.map((desk) =>
      desk.id === id ? { ...desk, isBooked: true } : desk
    );
    setDesks(updatedDesks);
    saveData("desks", updatedDesks);
  };

  return (
    <div>
      <h1>Book a Space </h1>
      <DeskGrid desks={desks} onBook={handleBook} />
      <BookingForm desks={desks} setDesks={setDesks} />
    </div>
  );
};

export default BookDesk;
