const UserValidation = require("../validations/auth");
const Auth = require("../models/auth");
const JwtHelper = require("../utils/jwtHelper");

module.exports = {
  login: async (req, res, next) => {
    try {
      UserValidation.login(req.body);
      const { email, password } = req.body;
      const user = await Auth.login(email, password);
      const accessToken = JwtHelper.generateToken(user);
      return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Login berhasil.",
        data: {
          user,
          accessToken,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: "Failed",
        statusCode: 500,
        message: "Terjadi kesalahan saat login. Silakan coba lagi.",
      });
    }
  },
  register: async (req, res, next) => {
    try {
      await UserValidation.register(req.body, req.file);
      const data = await Auth.register(req.body, req.file);
      return res.status(201).json({
        status: "Success",
        statusCode: 201,
        message: "Registrasi berhasil",
        data: {
          user: {
            id: data.id,
            name: data.name,
            email: data.email,
            noHp: data.noHp,
            nim: data.nim,
          },
        },
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        status: "Failed",
        statusCode: 500,
        message: "Terjadi kesalahan saat registrasi. Silakan coba lagi.",
    })
  }
}
};
