import { generateToken } from '../libs/tokenUtils.js';
import { sendVerificationEmail } from '../libs/verifyEmail.js';
import User from '../models/User.model.js';
import bcryptjs from "bcryptjs";
import shortid from 'shortid';


/** Registro de usuario  */
export const registerUser = async (req, res) => {

  const {
    username,
    email,
    password,
    firstName,
    secondName,
    lastName,
    secondLastName,
  } = req.body

  try {

    /** Valido primero si el usuario ya existe  */
    const findUser = await User.findOne({ email });

    /** Si el usuario ya existe devuelvo un error */
    if (findUser) return res.status(400).json(['El usuario ya existe'])

    /** Si el usuario no existe encripto la contraseña */
    const passwordHash = await bcryptjs.hash(password, 10);

    // Genero un codigo de verificación para el usuario
    const verificationToken = shortid.generate();

    /** Creo el objeto usuario */
    const newUser = new User({
      username,
      email,
      password: passwordHash,
      firstName,
      secondName,
      lastName,
      secondLastName,
      emailVerificationCode: verificationToken,
    })

    /** Guardo el usuario en la base de datos  */
    const savedUser = await newUser.save()

    /** Creo el token pasandole el id del usuario  */
    const token = await generateToken({ id: savedUser._id })

    /** Guardo el token en la cookie */
    res.cookie('token', token)

    // savedUser.emailVerificationCode = verificationToken;

    await sendVerificationEmail(savedUser.email, verificationToken);

    /** Devuelvo el usuario guardado solo con los campos que indico */
    res.status(201).json({
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      fullName: savedUser.fullName,
      createdAt: savedUser.createdAt,
      updatedAt: savedUser.updatedAt,
      emailVerificationCode: savedUser.emailVerificationCode,
      emailVerified: savedUser.emailVerified,
    })

  } catch (error) {
    res.status(500).json(error)
  }
}

/** Verificación de usuario */
export const verifyUser = async (req, res) => {
  const { emailVerificationCode } = req.body;
  try {
    // Busco el usuario por el codigo de verificación
    const user = await User.findOne({ emailVerificationCode: emailVerificationCode });

    // Si no encuentro el usuario devuelvo un error
    if (!user) return res.status(400).json(["El codigo de verificación no es valido"]);

    // Actualizar el estado de verificación del correo electrónico del usuario
    user.emailVerified = true;
    user.emailVerificationCode = null;
    await user.save();
    res.status(200).json(["Correo electrónico verificado con éxito"]);
  } catch (error) {
    res.status(500).json(error);
  }
}

/** Inicio de sesión de usuario  */
export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {

    /** Debo de buscar el usuario por email, si existe me lo devuelvo, si no existe devuelvo un error  */
    const findUser = await User.findOne({ email })

    if (!findUser) return res.status(400).json(['El usuario no existe'])

    /** Extraigo la contraseña que viene de la Base de Datos */
    const passwordDB = findUser.password

    /** Comparto la contraseña que viene de la Base de Datos con la que llega por el body */
    const comparePassword = await bcryptjs.compare(password, passwordDB);

    /** Si no son iguales devuelvo un error */
    if (!comparePassword) return res.status(400).json(["Datos incorrectos"])

    /** Creo el token pasandole el id del usuario  */
    const token = await generateToken({ id: findUser._id })

    console.log("TOKEN:", token)

    /** Guardo el token en la cookie *///
    res.cookie('token', token, {
      domain: 'vengan-pues-hospedajes.vercel.app',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    })

    /** Devuelvo el usuario guardado solo con los campos que indico */
    return res.status(200).json({
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      fullName: findUser.fullName,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
      emailVerified: findUser.emailVerified,
      permissions: findUser.permissions,
    })

  } catch (error) {
    res.status(500).json(error)
  }
}

/** Perfil de usuario   */
export const profileUser = async (req, res) => {

  // Id del usuario que esta logueado
  const id = req.user.id

  try {

    // Busco el usuario por el id, en la base de datos
    const findUser = await User.findById(id)

    // Si no encuentro el usuario devuelvo un error
    if (!findUser) return res.status(400).json(['El usuario no existe'])

    // Si existe devuelvo los datos
    res.status(200).json({
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      fullName: findUser.fullName,
      permissions: findUser.permissions,
      createdAt: findUser.createdAt,
      updatedAt: findUser.updatedAt,
      emailVerified: findUser.emailVerified,
      permissions: findUser.permissions,
    })
  } catch (error) {
    res.status(500).json(error)
  }

}

/** Actualizar usuario    */
export const updateUser = async (req, res) => {

  // Id del usuario que esta Logueado
  const id = req.user.id

  // Busco el usuario por el id, si no esta en la base de datos devuelvo un error
  if (!id) return res.status(400).json("No se encontro el usuario")

  // Extraigo los datos que llegan desde el body
  const body = req.body

  try {
    // Busco el usuario por el id, si no esta en la base de datos devuelvo un error
    const updateUser = await User.findByIdAndUpdate(id, body, { new: true })
    const { password, ...response } = updateUser._doc;
    return res.status(200).json(response)
  } catch (error) {
    return res.status(500).json(error)
  }

  res.status(200).json("Estas en la ruta de actualizar usuario")

}

/** Resetear contraseña de usuario    */
export const resetPassword = async (req, res) => {
  const { email } = req.body
  try {

    // Busco el usuario por el email, si no esta en la base de datos devuelvo un error
    const findUser = await User.findOne({ email })

    if (!findUser) return res.status(400).json(['El usuario no existe'])

    // Genero un codigo de verificación para el usuario
    const verificationToken = shortid.generate();

    // Actualizar el estado de verificación del correo electrónico del usuario
    findUser.emailVerificationCode = verificationToken;
    await findUser.save();

    await sendVerificationEmail(findUser.email, verificationToken);

    res.cookie('token', "", {
      expires: new Date(0)
    })

    res.status(200).json("Se envión un email con las instrucciones")

  } catch (error) {
    res.status(500).json(error)
  }

}

/** Cambiar contraseña de usuario   */
export const changePassword = async (req, res) => {
  const { emailVerificationCode, password } = req.body
  try {

    // Busco el usuario por el email, si no esta en la base de datos devuelvo un error
    const findUser = await User.findOne({ emailVerificationCode })

    if (!findUser) return res.status(400).json(['El usuario no existe'])

    // Genero un codigo de verificación para el usuario
    const passwordHash = await bcryptjs.hash(password, 10);

    // Actualizar el estado de verificación del correo electrónico del usuario
    findUser.emailVerificationCode = null;
    findUser.password = passwordHash;
    await findUser.save();

    res.status(200).json("Contraseña cambiada con éxito")

  } catch (error) {
    res.status(500).json(error)
  }

}

/** Cerrar sesión de usuario   */
export const logoutUser = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  res.status(200).json("Sesión cerrada")
}
