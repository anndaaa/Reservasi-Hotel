import { useState, useEffect } from "react";
import api from "../services/api";

function Guests() {

  const [guests, setGuests] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    email: ""
  });

  const loadGuests = async () => {
    const res = await api.get("/guests");
    setGuests(res.data);
  };

  useEffect(() => {
    loadGuests();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveGuest = async (e) => {

    e.preventDefault();

    if (editId) {

      await api.put(
        `/guests/${editId}`,
        form
      );

    } else {

      await api.post(
        "/guests",
        form
      );

    }

    setForm({
      fullname: "",
      phone: "",
      email: ""
    });

    setEditId(null);

    loadGuests();

  };

  const editGuest = (guest) => {

    setEditId(guest.id);

    setForm({
      fullname: guest.fullname,
      phone: guest.phone,
      email: guest.email
    });

  };

  const deleteGuest = async (id) => {

    if (!window.confirm("Hapus tamu?")) {
      return;
    }

    await api.delete(`/guests/${id}`);

    loadGuests();

  };

  return (

    <div className="container mt-4">

      <h2>Data Tamu</h2>

      <form
        onSubmit={saveGuest}
        className="card p-3 mb-4"
      >

        <input
          className="form-control mb-2"
          name="fullname"
          placeholder="Nama Tamu"
          value={form.fullname}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="phone"
          placeholder="Nomor HP"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-2"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <button className="btn btn-success">

          {editId
            ? "Update Tamu"
            : "Tambah Tamu"}

        </button>

      </form>

      <table className="table table-bordered">

        <thead>

          <tr>
            <th>No</th>
            <th>Nama</th>
            <th>HP</th>
            <th>Email</th>
            <th>Aksi</th>
          </tr>

        </thead>

        <tbody>

          {guests.map((guest, index) => (

            <tr key={guest.id}>

              <td>{index + 1}</td>
              <td>{guest.fullname}</td>
              <td>{guest.phone}</td>
              <td>{guest.email}</td>

              <td>

                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => editGuest(guest)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteGuest(guest.id)}
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

export default Guests;