const router = require("express").Router();

const pool = require("../db");
const authorization = require("../middleware/authorization");

router.post("/", authorization, async (req, res) => {
  try {
    const user = await pool.query(
      "Select userid,username,user_role from users where userid = $1",
      [req.user]
    );
    res.status(200).json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
