import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { saveData, getData } from "../utils/localStorageUtils";

const FormContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  label {
    display: block;
    margin-bottom: 8px;
    color: #555;
  }

  select,
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    background-color: #f9f9f9;
  }

  .price {
    margin-top: 10px;
    font-weight: bold;
    color: #333;
  }

  .discount {
    margin-top: 10px;
    color: #f44336;
    font-size: 0.8rem;
  }

  .alert {
    margin-top: 15px;
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border-radius: 4px;
    text-align: center;
  }

  .alert.error {
    background-color: #f44336;
  }

  button {
    width: 100%;
    padding: 12px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;

const BookingForm = ({ desks, setDesks }) => {
  const [selectedDesk, setSelectedDesk] = useState(null);
  const [membership, setMembership] = useState("Basic");
  const [hours, setHours] = useState(1);
  const [showPrice, setShowPrice] = useState(false);
  const [isBookedAlert, setIsBookedAlert] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    if (selectedDesk) {
      const desk = desks.find((d) => d.id === selectedDesk);
      if (desk.type === "individual") {
        setMembership(desk.membership || "Basic");
      } else {
        setMembership("Team");
      }
      setHours(desk.hours || 1);
    }
  }, [selectedDesk, desks]);

  const handleBooking = () => {
    if (!selectedDesk) return;

    const desk = desks.find((d) => d.id === selectedDesk);

    if (desk.isBooked) {
      setIsBookedAlert(true);
      setTimeout(() => setIsBookedAlert(false), 3000);
      return;
    }

    const updatedDesks = desks.map((desk) =>
      desk.id === selectedDesk
        ? { ...desk, isBooked: true, membership, hours }
        : desk
    );

    setDesks(updatedDesks);
    saveData("desks", updatedDesks);

    let totalRevenue = getData("totalRevenue") || {
      Basic: 0,
      Premium: 0,
      Executive: 0,
      Team: 0,
    };
    let cost = 10 * hours;
    let discountApplied = false;

    if (desk.type === "individual") {
      if (membership === "Premium") {
        cost = 15 * hours;
      } else if (membership === "Executive") {
        cost = 20 * hours;
      } else {
        cost = 10 * hours;
      }
    } else {
      cost = 25 * hours;
    }

    if (hours > 3) {
      cost *= 0.9; // Apply 10% discount
      discountApplied = true;
    }

    totalRevenue[membership] += cost;
    saveData("totalRevenue", totalRevenue);

    setSelectedDesk(null);
    setMembership("Basic");
    setHours(1);
    setShowPrice(true);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  const getPriceDisplay = () => {
    let price = 10 * hours;
    if (selectedDesk) {
      const desk = desks.find((d) => d.id === selectedDesk);
      if (desk.type === "individual") {
        if (membership === "Premium") {
          price = 15 * hours;
        } else if (membership === "Executive") {
          price = 20 * hours;
        } else {
          price = 10 * hours;
        }
      } else {
        price = 25 * hours;
      }
    }

    let display = `Total Price: $${price}`;
    if (hours > 3) {
      price *= 0.9; // Apply 10% discount
      display += ` (10% discount applied)`;
    }
    return display;
  };

  return (
    <FormContainer>
      <h2>Book a Desk</h2>
      <label>Select a Desk</label>
      <select
        value={selectedDesk}
        onChange={(e) => setSelectedDesk(Number(e.target.value))}
      >
        <option value={null}>Select a Desk</option>
        {desks
          .filter((d) => !d.isBooked)
          .map((d) => (
            <option
              key={d.id}
              value={d.id}
            >{`Desk ${d.id} (${d.type})`}</option>
          ))}
      </select>

      {selectedDesk &&
        desks.find((d) => d.id === selectedDesk)?.type === "individual" && (
          <>
            <label>Membership Tier</label>
            <select
              value={membership}
              onChange={(e) => setMembership(e.target.value)}
            >
              <option value="Basic">Basic ($10/hour)</option>
              <option value="Premium">Premium ($15/hour)</option>
              <option value="Executive">Executive ($20/hour)</option>
            </select>
          </>
        )}

      <label>Hours</label>
      <input
        type="number"
        value={hours}
        onChange={(e) => setHours(Number(e.target.value))}
        min="1"
        max="8"
      />

      <button onClick={handleBooking}>Book</button>

      {showPrice && <div className="price">{getPriceDisplay()}</div>}

      {hours > 3 && (
        <div className="discount">
          10% discount applied for bookings over 3 hours.
        </div>
      )}

      {isBookedAlert && (
        <div className="alert error">
          This desk has already been booked. Please select another desk.
        </div>
      )}

      {bookingSuccess && <div className="alert">Desk booked successfully!</div>}
    </FormContainer>
  );
};

export default BookingForm;
