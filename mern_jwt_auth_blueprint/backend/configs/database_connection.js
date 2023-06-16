const mongoose = require("mongoose");
const connection_to_database = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Connection Status: (${connection.connection.host}) Successfull`.cyan
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = connection_to_database;
