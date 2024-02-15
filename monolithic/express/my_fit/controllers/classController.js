const Class = require("../models/Class");

exports.createClass = async (req, res) => {
  const date = req.body.date; // "YYYY-MM-DD"
  const time = req.body.time; // "HH:MM"
  // Combine date and time into a single string
  const dateTimeString = `${date}T${time}:00`;

  // Create a new Date object
  const dateTime = new Date(dateTimeString);
  try {
    const newClass = await Class.create({
      name: req.body.name,
      instructor: req.body.instructor,
      time: dateTime,
      duration: req.body.duration,
    });
  } catch (err) {
    res.send(err);
  }

  res.redirect("/dashboard");
};

exports.deleteClass = async (req, res) => {
  await Class.deleteOne({ _id: req.query.id });
  res.redirect("/dashboard");
};
