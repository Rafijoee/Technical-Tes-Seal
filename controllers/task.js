const validations = require("../validations/task");
const Task = require("../models/task");

module.exports = {
    getAll : async (req, res) => {
        try {
            const data = await Task.getAll();
            return res.status(200).json({
                status: "Success",
                statusCode: 200,
                message: "Data semua task berhasil didapatkan.",
                data
            });
        }catch (err){
            console.log(err);
            return res.status(500).json({
                status: "Failed",
                statusCode: 500,
                message: "Terjadi kesalahan saat mengambil data task. Silakan coba lagi."
            });
        }
    }
};