const { reservation_data, room_data } = require("../models");
const { SendEmail } = require("../Nodemailer/handlebars");
const { Op } = require("sequelize");

//RESERVED ROOM
const reserve_room = async (req, res) => {
  const {
    Date_Start,

    reservation_status,
    reservation_paymentMethod,
    reservation_roomID,
    reservation_key,
    reservation_package,
  } = req.body;
  try {
    const room_count = await room_data.findOne({
      where: { ID: reservation_roomID },
    });

    await room_data.update(
      { room_total_available: room_count.room_total_available + 1 },
      { where: { ID: reservation_roomID } }
    );

    const reservation = await reservation_data.create({
      UserID: req.user.ID,
      Date_Start,
      reservation_package,
      reservation_status,
      reservation_paymentMethod,
      reservation_roomID,
      reservation_key,
    });

    const room_info = await room_data.findOne({
      where: { ID: reservation_roomID },
    });

    SendEmail(
      reservation_key,
      req.user.user_Email,
      req.user.user_FirstName,
      reservation_package,
      Date_Start,
      room_info.room_name
    );

    return res.status(200).json(reservation);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const get_reservation_key = async (req, res) => {
  const { key } = req.params;
  try {
    const reservationData = await reservation_data.findOne({
      where: { reservation_key: key },
    });

    if (!reservationData) {
      return res.status(404).json({ message: "Nothing Found!" });
    }

    return res.status(200).json(reservationData);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const update_reservation = async (req, res) => {
  const { ID, status } = req.body;
  try {
    const update_reservation = await reservation_data.update(
      { reservation_status: status },
      { where: { ID } }
    );

    return res.status(200).json(update_reservation);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//GET RESERVATION BY USERID
const get_reservation_user = async (req, res) => {
  const { userID } = req.params;
  try {
    const reservationUser = await reservation_data.findAll({
      where: {
        [Op.and]: [
          { UserID: userID },
          { reservation_status: { [Op.ne]: "Done" } },
        ],
      },
    });

    return res.status(200).json(reservationUser);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//GET ALL THE RESERVATIONS
const get_all = async (req, res) => {
  try {
    const reservationAll = await reservation_data.findAll();

    return res.status(200).json(reservationAll);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  reserve_room,
  get_reservation_key,
  update_reservation,
  get_all,
  get_reservation_user,
};
