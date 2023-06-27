import nodemailer from "nodemailer";
import { enviroment } from "../config/config.js"


/** Verificación de usuario   */
export const sendVerificationEmail = async (email, verificationToken) => {

  const { EMAIL, PWD_EMAIL } = enviroment

  // Configura el transporte de Nodemailer
  const transporter = nodemailer.createTransport({
    // Configura el servicio de correo electrónico que desees utilizar
    service: "gmail",
    auth: {
      user: EMAIL, // Coloca aquí tu dirección de correo electrónico
      pass: PWD_EMAIL, // Coloca aquí tu contraseña de correo electrónico
    },
  });

  // Crea el mensaje de correo electrónico
  const mailOptions = {
    from: "jash0310@gmail.com", // Coloca aquí tu dirección de correo electrónico
    to: email,
    subject: "Verificación de correo electrónico",
    html: `
    <p>Hola,</p>
    <p>Para verificar tu dirección de correo electrónico, por favor ingresa el siguiente código de verificación:</p>
    <h3>${verificationToken}</h3>
    <p>Si no has solicitado esta verificación, puedes ignorar este correo electrónico.</p>
    <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.</p>
    <p>¡Gracias!</p>
    `,
  };

  // Envía el correo electrónico
  await transporter.sendMail(mailOptions);
};