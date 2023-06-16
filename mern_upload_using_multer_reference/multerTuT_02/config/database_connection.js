const mongoose = require("mongoose");
const connection_to_database = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connection Status: (${connection.connection.host}) Successfull`
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
    // console.log(error);
  }
};

module.exports = connection_to_database;
