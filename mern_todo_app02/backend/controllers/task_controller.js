const db = require("../models");
const { task_data } = require("../models");

// Create Task
const createTask = async (req, res) => {
  const { task_Text } = req.body;
  try {
    const newTask = await task_data.create({
      task_Text,
    });
    return res.status(201).json(newTask);
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Show All Task
const displayAllTask = async (req, res) => {
  const task_list = await task_data.findAll();
  return res.status(200).json({ task_list: task_list });
};

// Edit Task
const editTask = async (req, res) => {
  const { edit_Task } = req.body;
  const { id } = req.params;
  await task_data.update({ task_Text: edit_Task }, { where: { id: id } });
  return res.status(200).json(edit_Task);
};

// Delete Task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  await task_data.destroy({ where: { id: id } });
  return res.status(200).json("Post Delete Successfuly!");
};

// View specific Task
const viewTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const specific_task = await task_data.findAll({ where: { id: id } });
    return res.status(200).json(specific_task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createTask,
  displayAllTask,
  editTask,
  deleteTask,
  viewTaskById,
};
