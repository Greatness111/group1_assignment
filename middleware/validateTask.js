function validateTask(req, res, next) {

  const { title, description, status } = req.body;

  if (title !== undefined && typeof title !== "string") {
    return res.status(400).json({
      message: "Title must be a string"
    });
  }

  if (description !== undefined && typeof description !== "string") {
    return res.status(400).json({
      message: "Description must be a string"
    });
  }

  const validStatus = ["cancelled", "in-progress", "pending", "completed"];

  if (status !== undefined && !validStatus.includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }

  next();
}

module.exports = validateTask;