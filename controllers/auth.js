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
      });
    }
  },
  changePassword: async (req, res, next) => {
    try {
      await UserValidation.changePassword(req.body);
      const data = await Auth.changePassword(req.user.id, req.body);
      return res.status(201).json({
        status: "Success",
        statusCode: 200,
        message: "Kata sandi berhasil diubah.",
        data: data,
      });
    } catch (err) {
      return res.status(500).json({
        status: "Failed",
        statusCode: 500,
        message: "Terjadi kesalahan saat mengubah kata sandi. Silakan coba lagi.",
      });
    }
  },
  delete : async (req, res, next) => {
    try {
      const id = req.params.id;
      await Auth.deleted(id);
      return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "User berhasil dihapus.",
      });
    } catch (err) {
      return res.status(500).json({
        status: "Failed",
        statusCode: 500,
        message: "Terjadi kesalahan saat menghapus user. Silakan coba lagi.",
      });
    }
  },
  getAllUser : async (req, res, next) => {
    try {
      const data = await Auth.getAll();
      return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Data semua user berhasil didapatkan.",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        status: "Failed",
        statusCode: 500,
        message: "Terjadi kesalahan saat mengambil data user. Silakan coba lagi.",
      });
    }
  },
  getById : async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = await Auth.getById(id);
      return res.status(200).json({
        status: "Success",
        statusCode: 200,
        message: "Data user berhasil didapatkan.",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        status: "Failed",
        statusCode: 500,
        message: "Terjadi kesalahan saat mengambil data user. Silakan coba lagi.",
      });
    }
  }
};
