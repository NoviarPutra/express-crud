const express = require("express");
const dbConnection = require("../config/db.config");
const router = express.Router();

// GET DATA '/'
router.get("/", (req, res) => {
  dbConnection.query(
    `SELECT * FROM user WHERE status = 'ACTIVE'`,
    [],
    (error, results) => {
      if (error) {
        console.log(`Error : ${error.sqlMessage}`);
        return;
      } else {
        console.log(results);
        return res.status(200).render("pages/index", {
          data: results,
        });
      }
    }
  );
});
// FIND USER
router.post("/", (req, res) => {
  let search = req.body.search;
  dbConnection.query(
    `SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ?`,
    [`%${search}%`, `%${search}%`, `%${search}%`],
    (error, results) => {
      if (error) {
        console.log(`Error : ${error.sqlMessage}`);
        return;
      } else {
        return res.status(200).render("pages/index", {
          data: results,
        });
      }
    }
  );
});
// GO TO FORM
router.get("/addUser", (req, res) => {
  res.render("pages/users/addUser", { alert: null });
});
// ADD USER or POST DATA
router.post("/addUser", (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  dbConnection.query(
    `INSERT INTO user (first_name,last_name,email,phone,comments) VALUES (?,?,?,?,?)`,
    [first_name, last_name, email, phone, comments],
    (error, results) => {
      if (error) throw error;
      return res
        .status(202)
        .render("pages/users/addUser", { alert: "Add User Successfully" });
    }
  );
});
// EDIT USER or EDIT DATA
router.get("/editUser/:id", (req, res) => {
  const id = req.params.id;
  dbConnection.query(
    `SELECT * FROM user WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) throw error;
      console.log(results);
      return res.render("pages/users/editUser", { data: results });
    }
  );
});
// UPDATE USER or UPDATE DATA
router.post("/editUser/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, phone, comments } = req.body;
  dbConnection.query(
    `
  UPDATE user SET
  first_name = ?,
  last_name = ?,
  email = ?,
  phone = ?,
  comments = ?
  WHERE id = ?
  `,
    [first_name, last_name, email, phone, comments, id],
    (error, results) => {
      if (error) throw error;
      return res.render("pages/success", {
        alert: `ID ${id} has been updated !!!`,
      });
    }
  );
});
// DELETE USER or DELETE DATA
router.get("/:id", (req, res) => {
  const { id } = req.params;
  // dbConnection.query(
  //   `DELETE FROM user WHERE id = ?`,
  //   [id],
  //   (error, results) => {
  //     if (error) throw error;
  //     return res.redirect("/");
  //   }
  // );
  dbConnection.query(
    `UPDATE user SET status = ? WHERE id = ?`,
    ["REMOVED", id],
    (error, results) => {
      if (error) throw error;
      return res.redirect("/");
    }
  );
});
// VIEW USER
router.get("/viewUser/:id", (req, res) => {
  const { id } = req.params;
  dbConnection.query(
    `SELECT * FROM user WHERE id = ?`,
    [id],
    (error, results) => {
      if (error) throw error;
      return res.render("pages/users/view-user", { data: results });
    }
  );
});
module.exports = router;
