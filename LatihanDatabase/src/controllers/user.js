const databaseUser = require("../databases/connectionUser");
const { QueryTypes } = require("sequelize");

const queryUser = async (req, res) => {
  let keyword = req.query.keyword;
  let processKeyword = `%${keyword}%`;
  const result = await databaseUser.query("SELECT * FROM user", {
    type: QueryTypes.SELECT,
    replacements: [processKeyword],
  });
  if (result.length < 1) {
    return res.status(200).json({ msg: "Data Tidak Ditemukan" });
  } else {
    return res.status(200).json(result);
  }
};

const insertUser = async (req, res) => {
  const body = req.body;
  const result = await databaseUser.query(
    "INSERT INTO user(nama, alamat, telepon, password) VALUES(:nama,:alamat, :telepon, :password)",
    {
      type: QueryTypes.INSERT,
      replacements: {
        nama: body.nama,
        alamat: body.alamat,
        telepon: body.telepon,
        password: body.password,
      },
    }
  );
  if (result) {
    return res.status(200).json({ msg: `Berhasil Register` });
  } else {
    return res.status(500).json({ msg: `Silahkan Coba Lagi` });
  }
};

const loginUser = async (req, res) => {
  const body = req.body;
  const result = await databaseUser.query(
    "SELECT * FROM user WHERE nama = :nama AND password = :password",
    {
      type: QueryTypes.SELECT,
      replacements: {
        nama: body.nama,
        password: body.password,
      },
    }
  );
  if (result.length < 1) {
    return res.status(200).json({ msg: "Data Tidak Ditemukan" });
  } else {
    return res.status(200).json({ msg: `Berhasil Login` });
  }
};

const updateUser = async (req, res) => {
  const body = req.body;
  const result = await databaseUser.query(
    "SELECT * FROM user WHERE nama = :nama",
    {
      type: QueryTypes.SELECT,
      replacements: {
        nama: body.nama,
      },
    }
  );

  if (result.length < 1) {
    return res.status(200).json({ msg: `Data Tidak Ditemukan` });
  }

  if (result[0].password !== body.oldpassword) {
    return res.status(200).json({ msg: `Password Salah` });
  }

  const resultUpdate = await databaseUser.query(
    "UPDATE user SET nama = :nama, alamat = :alamat, telepon = :telepon, password = :password WHERE nama = :nama",
    {
      type: QueryTypes.UPDATE,
      replacements: {
        nama: body.nama,
        alamat: body.alamat,
        telepon: body.telepon,
        password: body.newpassword,
      },
    }
  );

  if (resultUpdate) {
    return res.status(200).json({ msg: `Berhasil Update` });
  }
  else{
    return res.status(500).json({ msg: `Silahkan Coba Lagi` });
  }
};

const addFriend = async (req, res) => {
  const body = req.body;

  if(body.nama == body.namacari){
    return res.status(200).json({ msg: `Tidak Bisa Menambahkan diri Sendiri` });
  }

  const result = await databaseUser.query(
    "SELECT * FROM user WHERE nama = :nama AND password = :password",
    {
      type: QueryTypes.SELECT,
      replacements: {
        nama: body.nama,
        password: body.password,
      },
    }  
  );

  if (result.length < 1) {
    return res.status(200).json({ msg: `User tidak ditemukan` });
  }

  const resultCari = await databaseUser.query(
    "SELECT * FROM user WHERE nama = :nama",
    {
      type: QueryTypes.SELECT,
      replacements: {
        nama: body.namacari,
      },
    }
  );

  if (resultCari.length < 1) {
    return res.status(200).json({ msg: `User tidak ditemukan` });
  }

  const checkFriend = await databaseUser.query(
    "SELECT * FROM friends WHERE user_nama_1 = :user_nama_1 AND user_nama_2 = :user_nama_2",
    {
      type: QueryTypes.SELECT,
      replacements: {
        user_nama_1: body.nama,
        user_nama_2: body.namacari,
      },
    }
  );

  if (checkFriend.length > 0) {
    return res.status(200).json({ msg: `User sudah menjadi teman` });
  }

  const resultAdd = await databaseUser.query(
    "INSERT INTO friends(user_nama_1, user_nama_2) VALUES(:user_nama_1, :user_nama_2)",
    {
      type: QueryTypes.INSERT,
      replacements: {
        user_nama_1: body.nama,
        user_nama_2: body.namacari,
      },
    }
  );

  if (resultAdd) {
    return res.status(200).json({ msg: `Berhasil Menambahkan Teman` });
  }
  else{
    return res.status(500).json({ msg: `Silahkan Coba Lagi` });
  }
};
    



// const updateUser = async (req, res) => {
//   const body = req.body;
//   const result = await databaseUser.query(

module.exports = {
  queryUser,
  insertUser,
  loginUser,
  updateUser,
  addFriend
};
