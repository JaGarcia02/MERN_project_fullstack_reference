const { room_data } = require("../models");
const { Op } = require("sequelize");

//ADD ROOM
const add_room = async (req, res) => {
  const {
    room_name,
    room_price,
    room_desc,
    room_available,
    room_pic,
    room_pax,
    room_category,
  } = req.body;

  try {
    const create_room = await room_data.create({
      room_name,
      room_desc,
      room_pic,
      room_price,
      room_available,
      room_total_available: 0,
      room_pax,
      room_category,
    });

    return res.status(200).json(create_room);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//GET ROOMS
const get_rooms = async (req, res) => {
  try {
    const rooms = await room_data.findAll();

    return res.status(200).json(rooms);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//DELETE ROOMS
const remove_room = async (req, res) => {
  const { id } = req.params;
  try {
    await room_data.destroy({ where: { ID: id } });
    const newData = await room_data.findAll();

    return res.status(200).json(newData);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

//UPDATE ROOM
const update_room = async (req, res) => {
  const {
    id,
    room_name,
    room_price,
    room_desc,
    room_available,
    room_pax,
    room_category,
  } = req.body;
  try {
    await room_data.update(
      {
        room_name,
        room_price,
        room_desc,
        room_available,
        room_pax,
        room_category,
      },
      { where: { ID: id } }
    );
    const newData = await room_data.findAll();

    return res.status(200).json(newData);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const searchRoom = async (req, res) => {
  const { category, pax } = req.params;

  try {
    const resultSearch = await room_data.findAll({
      where: {
        room_category: category,
        room_pax: { [Op.gte]: pax },
      },
    });

    return res.status(200).json(resultSearch);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  add_room,
  get_rooms,
  remove_room,
  update_room,
  searchRoom,
};
