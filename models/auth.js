const ImageKit = require("imagekit");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

class User {
  static async login (email, password) {
    try {
      const {email, password} = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Email atau kata sandi yang Anda masukkan salah.', 401);
    }
    return user;

    }catch (error) {
      throw new Error("Email atau password salah.", 401);
    }
  }
  static async register( datas, file ) {
    try {
        const { name, email, password, role} = datas;
        const existingEmail = await prisma.user.findUnique({
            where: { email: String(email) }
        });

        if (existingEmail) {
            throw new Error('Email sudah terdaftar.', 409);
        }

        let avatar = null;
        if (file) {
          const uploadImageKit = await imagekit.upload({
            file: file.buffer.toString("base64"), // Gunakan file dari parameter
            fileName: file.originalname,
            folder: "Foto-Profile",
          });
          avatar = uploadImageKit.url;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: String(name),
                email: String(email),
                password: hashedPassword,
                avatar : String(avatar),
                role: role || 'user'
            }
        });
        return user;
    } catch (error) {
      console.log(error, "ini error di model");
      throw new Error('Gagal melakukan registrasi. ini di model', 500);
    }
}
  static async findByEmail(email) {
    const existEmail = await prisma.user.findUnique({
      where: {
        email: email,
      },
    }) || false;
    return existEmail;
  }

}

module.exports = User;
