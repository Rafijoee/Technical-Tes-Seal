const router = require("express").Router();
const auth = require("./auth");

router.use(auth);
router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

module.exports = router;
