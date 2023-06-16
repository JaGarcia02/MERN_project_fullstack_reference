const db = require("../models");
const { persons } = require("../models");

const createPeople = async (req, res) => {
  const { personFullName } = req.body;
  try {
    const duplicateValue = await persons.findOne({
      where: { personFullName: personFullName },
    });

    if (duplicateValue) {
      return res.status(409).json({ message: "Person is registered already!" });
    } else {
      await persons.create({
        personFullName,
      });
      const viewDataPerson = await persons.findAll({ order: [["id", "DESC"]] });
      return res.status(200).json(viewDataPerson);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

const viewAllData = async (req, res) => {
  const personData = await persons.findAll({ order: [["id", "DESC"]] });
  return res.status(200).json(personData);
};

module.exports = {
  createPeople,
  viewAllData,
};
