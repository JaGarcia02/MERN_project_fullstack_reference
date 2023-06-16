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

const SendEmail = (key, email, name, package, Date_start, Amenity) => {
  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve("./Nodemailer/Views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/Views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "listenapp2022@gmail.com",
    to: email,
    subject: "RESERVATION KEY",
    template: "Email",
    context: {
      name: name,
      key: key,
      package: package,
      Date_start: Date_start,
      Amenity: Amenity,
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
      partialsDir: path.resolve("./Nodemailer/Views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/Views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "listenapp2022@gmail.com",
    to: email,
    subject: "RESERVATION KEY",
    template: "Verify",
    context: {
      name: name,
      link: `https://reservation-t2oi.onrender.com/verification/${link}`,
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
      partialsDir: path.resolve("./Nodemailer/Views"),
      defaultLayout: false,
    },
    viewPath: path.resolve("./Nodemailer/Views"),
    extName: ".handlebars",
  };

  transporter.use("compile", hbs(handlebarOptions));

  var mailOptions = {
    from: "listenapp2022@gmail.com",
    to: email,
    subject: "RESERVATION KEY",
    template: "Userforgot",
    context: {
      name: name,
      link: `https://reservation-t2oi.onrender.com/forgot/${link}`,
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

const SendEmailForgot_admin = (link, email) => {
  var mailOptions = {
    from: "listenapp2022@gmail.com",
    to: email,
    subject: "Admin Reset Password",
    text: `Hello Admin this is your ${
      "https://reservation-t2oi.onrender.com/forgot-admin/" + link
    }`,
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
  SendEmailForgot_admin,
};
