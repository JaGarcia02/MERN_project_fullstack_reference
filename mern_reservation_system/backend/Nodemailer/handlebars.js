const path = require("path");
var nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "listenapp2022@gmail.com",
    pass: "pjhwngszjrgabegj",
  },
});

const SendEmail = (key, email, name) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "listenapp2022@gmail.com",
    to: email,
    subject: "RESERVATION KEY",
    template: "email",
    context: {
      name: name,
      key: key,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const SendVerification = (link, email, name) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/verification"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/verification"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "listenapp2022@gmail.com",
    to: email,
    subject: "RESERVATION KEY",
    template: "verify",
    context: {
      name: name,
      link: `http://localhost:5173/verification/${link}`,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const SendEmailForgot = (link, email, name) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/userforgot"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/userforgot"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "listenapp2022@gmail.com",
    to: email,
    subject: "RESERVATION KEY",
    template: "userforgot",
    context: {
      name: name,
      link: `http://localhost:5173/forgot/${link}`,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  SendEmail,
  SendVerification,
  SendEmailForgot,
};
