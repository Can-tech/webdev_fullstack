const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// POST /admin/login
const adminLogin = (req, res) => {
  const { password } = req.body;

  // Check if the password matches the available password
  if (password === ADMIN_PASSWORD) {
    // Create a session with express-session
    req.session.userId = "admin";
    res.status(200).redirect("/admin");
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};

// Assuming you have already imported the necessary modules and set up the express app

// POST /admin/logout
const adminLogout = (req, res) => {
  // Destroy the session and remove the userID
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Error logging out" });
    } else {
      res.status(200).redirect("/");
    }
  });
};

module.exports = {
  adminLogout,
  adminLogin,
};
