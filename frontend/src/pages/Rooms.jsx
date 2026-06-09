import { useState, useEffect } from "react";
import api from "../services/api";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    room_number: "",
    room_type: "",
    price: "",
    status: "available",
  });

  const loadRooms = async () => {
    try {
      const res = await api.get("/rooms");
      setRooms(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveRoom = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/rooms/${editId}`, form);
        alert("Kamar berhasil diupdate");
      } else {
        await api.post("/rooms", form);
        alert("Kamar berhasil ditambahkan");
      }

      setForm({
        room_number: "",
        room_type: "",
        price: "",
        status: "available",
      });

      setEditId(null);

      loadRooms();
    } catch (error) {
      console.log(error);
      alert("Gagal menyimpan data");
    }
  };

  const editRoom = (room) => {
    setEditId(room.id);

    setForm({
      room_number: room.room_number,
      room_type: room.room_type,
      price: room.price,
      status: room.status,
    });
  };

  const deleteRoom = async (id) => {
    if (!window.confirm("Yakin ingin menghapus kamar?")) {
      return;
    }

    try {
      await api.delete(`/rooms/${id}`);

      alert("Kamar berhasil dihapus");

      loadRooms();
    } catch (error) {
      console.log(error);

      alert("Gagal menghapus kamar");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Data Kamar</h2>

      <form onSubmit={saveRoom} className="card p-3 mb-4">
        <input
          className="form-control mb-2"
          name="room_number"
          placeholder="Nomor Kamar"
          value={form.room_number}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="room_type"
          placeholder="Tipe Kamar"
          value={form.room_type}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="price"
          placeholder="Harga"
          value={form.price}
          onChange={handleChange}
        />

        <select
          className="form-select mb-2"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="occupied">Occupied</option>
          <option value="cleaning">Cleaning</option>
          <option value="maintenance">Maintenance</option>
        </select>

        <button className="btn btn-success">
          {editId ? "Update Kamar" : "Tambah Kamar"}
        </button>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Kamar</th>
            <th>Tipe</th>
            <th>Harga</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {rooms.map((room, index) => (
            <tr key={room.id}>
              <td>{index + 1}</td>
              <td>{room.room_number}</td>
              <td>{room.room_type}</td>
              <td>Rp {room.price}</td>
              <td>{room.status}</td>

              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editRoom(room)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteRoom(room.id)}
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Rooms;
