import User from "../models/User.model.js"

export const editProfile = (req, res, next) => {
  const { id } = req.user;

  const findUser = User.findById(id);

  findUser.then(user => {
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      const profile = user.permissions;
      if (!profile.includes('adminAccess') && !profile.includes('controlAccess')) return res.status(401).json(['No autorizado'])
      next();
    }
  }).catch(err => {
    console.error(err);
    return res.status(500).json({ message: 'Error al buscar el usuario' });
  });

};
