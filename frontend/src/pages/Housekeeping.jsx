import { useEffect, useState } from "react";
import api from "../services/api";

function Housekeeping() {

  const [rooms, setRooms] =
  useState([]);

  const [staff, setStaff] =
  useState([]);

  const [tasks, setTasks] =
  useState([]);

  const [form, setForm] =
  useState({
    room_id: "",
    staff_id: "",
    notes: ""
  });

  const loadData = async () => {

    const roomRes =
    await api.get("/rooms");

    const userRes =
    await api.get("/users");

    const taskRes =
    await api.get("/housekeeping");

    setRooms(roomRes.data);
    setStaff(userRes.data);
    setTasks(taskRes.data);

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

  const saveTask = async (e) => {

    e.preventDefault();

    await api.post(
      "/housekeeping",
      form
    );

    alert(
      "Tugas berhasil dibuat"
    );

    loadData();

  };

  return (

    <div className="container mt-4">

      <h2>Housekeeping</h2>

      <form
        onSubmit={saveTask}
        className="card p-3 mb-4"
      >

        <select
          className="form-select mb-2"
          name="room_id"
          onChange={handleChange}
        >

          <option value="">
            Pilih Kamar
          </option>

          {
            rooms.map(room => (

              <option
                key={room.id}
                value={room.id}
              >

                {room.room_number}

              </option>

            ))
          }

        </select>

        <select
          className="form-select mb-2"
          name="staff_id"
          onChange={handleChange}
        >

          <option value="">
            Pilih Petugas
          </option>

          {
            staff.map(user => (

              <option
                key={user.id}
                value={user.id}
              >

                {user.fullname}

              </option>

            ))
          }

        </select>

        <input
          className="form-control mb-2"
          name="notes"
          placeholder="Catatan"
          onChange={handleChange}
        />

        <button
          className="btn btn-primary"
        >
          Assign Tugas
        </button>

      </form>

      <table
        className="table table-bordered"
      >

        <thead>

          <tr>

            <th>Kamar</th>
            <th>Petugas</th>
            <th>Status</th>
            <th>Aksi</th>

          </tr>

        </thead>

        <tbody>

          {
            tasks.map(task => (

              <tr key={task.id}>

                <td>
                  {task.room_number}
                </td>

                <td>
                  {task.staff_name}
                </td>

                <td>
                  {task.cleaning_status}
                </td>

                <td>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={async () => {

                      await api.put(
                        `/housekeeping/start/${task.id}`
                      );

                      loadData();

                    }}
                  >
                    Start
                  </button>

                  <button
                    className="btn btn-success btn-sm"
                    onClick={async () => {

                      await api.put(
                        `/housekeeping/finish/${task.id}`
                      );

                      loadData();

                    }}
                  >
                    Finish
                  </button>

                </td>

              </tr>

            ))
          }

        </tbody>

      </table>

    </div>

  );

}

export default Housekeeping;