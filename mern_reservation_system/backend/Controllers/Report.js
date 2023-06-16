const { report_data } = require("../models");
const moment = require("moment");

const create_or_update_report = async (req, res) => {
  try {
    const dateData = await report_data.findAll({ order: ["ID"] });

    if (
      dateData.slice(-1)[0]?.monthYear == moment().format("MMMMYYYY") &&
      dateData
    ) {
      await report_data.update(
        { numberData: dateData.slice(-1)[0].numberData + 1 },
        { where: { ID: dateData.slice(-1)[0].ID } }
      );
    } else {
      await report_data.create({
        numberData: 1,
        monthYear: moment().format("MMMMYYYY"),
      });
    }
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

const get_report = async (req, res) => {
  try {
    const report = await report_data.findAll();

    return res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
};

module.exports = {
  get_report,
  create_or_update_report,
};
