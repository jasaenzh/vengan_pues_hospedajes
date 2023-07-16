import User from "../models/User.model.js"

export const adminProfile = (req, res, next) => {
  console.log("USER", req.user)
  const { id } = req.user;
  // Busco el usuario por su id
  const findUser = User.findById(id);

  findUser.then(user => {
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      const profile = user.permissions;
      if (!profile.includes('adminAccess')) return res.status(401).json(['No autorizado'])
      next();
    }
  }).catch(err => {
    return res.status(500).json({ message: 'Error al buscar el usuario' });
  });

};
