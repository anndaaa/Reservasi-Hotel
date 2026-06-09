const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;

    const checkSql = "SELECT * FROM users WHERE email=?";

    db.query(checkSql, [email], async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({
          message: "Email sudah digunakan",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const sql = `INSERT INTO users
          (fullname,email,password,role)
          VALUES(?,?,?,?)`;

      db.query(sql, [fullname, email, hash, role || "guest"], (err) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "Register berhasil",
        });
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length === 0) {
        return res.status(404).json({
          message: "User tidak ditemukan",
        });
      }

      const user = result[0];

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        return res.status(401).json({
          message: "Password salah",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
      );

      res.json({
        token,
        user: {
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          role: user.role,
        },
      });
    },
  );
};
