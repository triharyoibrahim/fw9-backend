exports.getHome = (req, res) => {
  return res.json({
    success: true,
    message: "Home page",
  });
};
