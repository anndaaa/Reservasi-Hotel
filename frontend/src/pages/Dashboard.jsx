import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

import { Pie } from "react-chartjs-2";

import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

import { useState, useEffect } from "react";

import api from "../services/api";

Chart.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [totalRoom, setTotalRoom] = useState(0);
  const [totalGuest, setTotalGuest] = useState(0);
  const [totalBooking, setTotalBooking] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [roomStatus, setRoomStatus] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const room = await api.get("/dashboard/rooms");
      const guest = await api.get("/dashboard/guests");
      const booking = await api.get("/dashboard/bookings");
      const revenue = await api.get("/dashboard/revenue");
      const status = await api.get("/dashboard/room-status");

      setTotalRoom(room.data.total);
      setTotalGuest(guest.data.total);
      setTotalBooking(booking.data.total);
      setTotalRevenue(revenue.data.total || 0);
      setRoomStatus(status.data);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <h2>Selamat Datang, {user.fullname}</h2>

        <p className="text-muted">Sistem Manajemen Reservasi Hotel</p>

        <hr />

        {/* CARD STATISTIK */}
        <div className="row">
          <div className="col-md-3 mb-3">
            <div className="card shadow border-primary">
              <div className="card-body text-center">
                <h5>Total Kamar</h5>
                <h2 className="text-primary">{totalRoom}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow border-success">
              <div className="card-body text-center">
                <h5>Total Tamu</h5>
                <h2 className="text-success">{totalGuest}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow border-warning">
              <div className="card-body text-center">
                <h5>Total Booking</h5>
                <h2 className="text-warning">{totalBooking}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card shadow border-danger">
              <div className="card-body text-center">
                <h5>Revenue</h5>
                <h5 className="text-danger">
                  Rp {Number(totalRevenue).toLocaleString("id-ID")}
                </h5>
              </div>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="row mt-4">
          <div className="col-md-8 mx-auto">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Statistik Status Kamar</h5>
              </div>

              <div className="card-body" style={{ height: "450px" }}>
                <Pie
                  data={{
                    labels: roomStatus.map((item) => item.status),
                    datasets: [
                      {
                        data: roomStatus.map((item) => item.total),
                        backgroundColor: [
                          "#198754",
                          "#dc3545",
                          "#ffc107",
                          "#6c757d",
                        ],
                        borderColor: "#ffffff",
                        borderWidth: 2,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                      },
                      title: {
                        display: true,
                        text: "Distribusi Status Kamar",
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <hr />

        {/* MENU BUTTONS */}
        <div className="text-center mt-4">
          <Link to="/rooms" className="btn btn-primary me-2">
            Kelola Kamar
          </Link>

          <Link to="/guests" className="btn btn-success me-2">
            Data Tamu
          </Link>

          <Link to="/booking" className="btn btn-warning me-2">
            Booking
          </Link>

          <Link to="/payment" className="btn btn-info me-2">
            Payment
          </Link>

          {/* ✅ TAMBAHAN INI */}
          <Link to="/housekeeping" className="btn btn-secondary me-2">
            Housekeeping
          </Link>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
