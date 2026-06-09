import { useEffect, useState } from "react";
import api from "../services/api";

function Payment() {

  const [bookings, setBookings] =
  useState([]);

  const [payments, setPayments] =
  useState([]);

  const [form, setForm] =
  useState({
    booking_id: "",
    amount: "",
    payment_method: "Cash"
  });

  const loadData = async () => {

    const bookingRes =
    await api.get("/bookings");

    const paymentRes =
    await api.get("/payments");

    setBookings(
      bookingRes.data
    );

    setPayments(
      paymentRes.data
    );

  };

  useEffect(() => {

    loadData();

  }, []);

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]:
      e.target.value
    });

  };

  const savePayment =
  async (e) => {

    e.preventDefault();

    await api.post(
      "/payments",
      form
    );

    alert(
      "Pembayaran berhasil"
    );

    setForm({
      booking_id: "",
      amount: "",
      payment_method: "Cash"
    });

    loadData();

  };

  return (

    <div className="container mt-4">

      <h2>Pembayaran Hotel</h2>

      <form
        onSubmit={savePayment}
        className="card p-3 mb-4"
      >

        <select
          className="form-select mb-2"
          name="booking_id"
          value={form.booking_id}
          onChange={handleChange}
        >

          <option value="">
            Pilih Booking
          </option>

          {
            bookings.map(item => (

              <option
                key={item.id}
                value={item.id}
              >

                {item.fullname}
                {" - "}
                Kamar
                {" "}
                {item.room_number}

              </option>

            ))
          }

        </select>

        <input
          className="form-control mb-2"
          name="amount"
          placeholder="Jumlah Bayar"
          value={form.amount}
          onChange={handleChange}
        />

        <select
          className="form-select mb-2"
          name="payment_method"
          value={form.payment_method}
          onChange={handleChange}
        >

          <option>
            Cash
          </option>

          <option>
            Transfer
          </option>

          <option>
            QRIS
          </option>

        </select>

        <button
          className="btn btn-success"
        >
          Simpan Pembayaran
        </button>

      </form>

      <table
        className="table table-bordered"
      >

        <thead>

          <tr>

            <th>No</th>
            <th>Guest</th>
            <th>Kamar</th>
            <th>Jumlah</th>
            <th>Metode</th>
            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {
            payments.map(
              (item, index) => (

              <tr key={item.id}>

                <td>
                  {index + 1}
                </td>

                <td>
                  {item.fullname}
                </td>

                <td>
                  {item.room_number}
                </td>

                <td>
                  Rp {item.amount}
                </td>

                <td>
                  {item.payment_method}
                </td>

                <td>
                  {item.payment_status}
                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default Payment;