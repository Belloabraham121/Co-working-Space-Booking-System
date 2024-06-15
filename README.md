## Co-working Space Booking System

This Co-working Space Booking System is a web application designed to allow users to book desks in a co-working space. The system categorizes bookings by membership tiers and calculates the total revenue based on the hours booked. It also applies a discount for longer bookings.

## Features

- View available desks and their booking status
- Book a desk for a specified number of hours
- Different membership tiers with varying rates
- Display total price with discount information for longer bookings
- Real-time update of total revenue based on bookings

## Technologies Used

- React
- Styled Components
- Chart.js
- Local Storage

## Using the Application

- Home as two buttons Book a Desk and Dashboard

### Book a Desk

- Select a desk from the dropdown list(Individual and Team).
- Choose the membership tier (Basic, Premium, Executive) if the desk type is individual.
- Team as a fixed price
- Enter the number of hours for the booking.
- Click the "Book" button.
- The form will display the total price, including any applicable discounts. If the booking is successful, an alert will confirm the booking.

### Dashboard

The Dashboard displays a bar chart showing the total revenue collected over a certain period, categorized by membership tiers (Basic, Premium, Executive).
