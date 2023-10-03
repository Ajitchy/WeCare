import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function CoachHome() {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/bookings`)
            .then((res) => res.json())
            .then((resp) => {
                console.log(resp);

                if (Object.keys(resp).length === 0) {
                    toast.error('Failed to fetch');
                } else {
                    setBookings(resp);
                }
            })
            .catch((err) => {
                toast.error('Failed:' + err.message);
            });
    }, []); // Empty dependency array ensures the effect runs once after the initial render

    return (
        <div className='bg-light mt-auto'>
            <div className="row row-cols-1 row-cols-md-3 mx-3 my-3 g-4">
                {bookings.map((booking, index) => (
                    <div key={index} className="col mb-4">
                        <div className="card bg-dark text-light">
                            <div className="card-body">
                                <h2 className="card-title">Appointment Date: {booking.appointmentDate}</h2>
                                <h3 className="card-text">Slot: {booking.slot}</h3>
                                <p>
                                    <li>Booking Id: {booking.id}</li>
                                    <li>User Id: {booking.userId}</li>
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
