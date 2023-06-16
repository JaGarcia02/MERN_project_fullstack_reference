const db = require("../models");
const { tbl_task, sequelize } = require("../models");

const addTask = async (req, res) => {
  const { my_task } = req.body;
  try {
    await tbl_task.create({ my_task });
    const task = await tbl_task.findAll({
      order: [["id", "DESC"]],
    });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const viewAllTask = async (req, res) => {
  try {
    const myTask_List = await tbl_task.findAll({
      order: [["id", "DESC"]],
    });
    return res.status(200).json(myTask_List);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await tbl_task.destroy({ where: { id: id } });
    const task = await tbl_task.findAll();
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const viewTaskById = async (req, res) => {
  const { id } = req.params;
  try {
    const ViewTask_byId = await tbl_task.findOne({ where: { id: id } });
    return res.status(200).json(ViewTask_byId);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  try {
    await tbl_task.update(
      { my_task: task },
      {
        where: { id: id },
      }
    );
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const taskCount = async (req, res) => {
  const taskCount = await tbl_task.count({
    distinct: true,
    col: "my_task",
  });
  return res.status(200).json(taskCount);
};

module.exports = {
  addTask,
  viewAllTask,
  deleteTask,
  viewTaskById,
  updateTask,
  taskCount,
};
