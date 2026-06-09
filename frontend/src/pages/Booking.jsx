import { useEffect, useState } from "react";
import api from "../services/api";

function Booking() {
  const [rooms, setRooms] = useState([]);
  const [guests, setGuests] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [form, setForm] = useState({
    guest_id: "",
    room_id: "",
    check_in: "",
    check_out: "",
  });

  const loadData = async () => {
    const roomRes = await api.get("/rooms");

    const guestRes = await api.get("/guests");

    const bookingRes = await api.get("/bookings");

    setRooms(roomRes.data);
    setGuests(guestRes.data);
    setBookings(bookingRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveBooking = async (e) => {
    e.preventDefault();

    await api.post("/bookings", form);

    alert("Booking berhasil");

    setForm({
      guest_id: "",
      room_id: "",
      check_in: "",
      check_out: "",
    });

    loadData();
  };

  return (
    <div className="container mt-4">
      <h2>Booking Hotel</h2>

      <form onSubmit={saveBooking} className="card p-3 mb-4">
        <select
          className="form-select mb-2"
          name="guest_id"
          value={form.guest_id}
          onChange={handleChange}
        >
          <option value="">Pilih Tamu</option>

          {guests.map((guest) => (
            <option key={guest.id} value={guest.id}>
              {guest.fullname}
            </option>
          ))}
        </select>

        <select
          className="form-select mb-2"
          name="room_id"
          value={form.room_id}
          onChange={handleChange}
        >
          <option value="">Pilih Kamar</option>

          {rooms
            .filter((room) => room.status === "available")
            .map((room) => (
              <option key={room.id} value={room.id}>
                {room.room_number}-{room.room_type}
              </option>
            ))}
        </select>

        <input
          type="date"
          className="form-control mb-2"
          name="check_in"
          value={form.check_in}
          onChange={handleChange}
        />

        <input
          type="date"
          className="form-control mb-2"
          name="check_out"
          value={form.check_out}
          onChange={handleChange}
        />

        <button className="btn btn-primary">Simpan Booking</button>
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Tamu</th>
            <th>Kamar</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.fullname}</td>
              <td>{item.room_number}</td>
              <td>{item.check_in}</td>
              <td>{item.check_out}</td>
              <td>{item.booking_status}</td>

              <td>
                <button
                  className="btn btn-success btn-sm me-2"
                  onClick={async () => {
                    await api.put(`/bookings/checkin/${item.id}`);

                    loadData();
                  }}
                >
                  Check In
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={async () => {
                    await api.put(`/bookings/checkout/${item.id}`);

                    loadData();
                  }}
                >
                  Check Out
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Booking;
