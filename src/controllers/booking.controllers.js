import Booking from '../models/Bookings.model.js';
import shortid from 'shortid';
import Apartment from '../models/Apartment.model.js'

/** Crear reserva */
export const createBooking = async (req, res) => {

  try {

    const {
      startDate,
      endDate,
      numberOfDays,
      state,
      apartment,
    } = req.body;

    const { id } = req.user;

    // Validar que los campos obligatorios sean enviados
    if (!apartment) return res.status(400).json({ message: "Falta el numero del apartamento" })

    // Valido que el apartamento exista
    const existApartment = await Apartment.findById(apartment);
    if (!existApartment) {
      return res.status(404).json({ message: "Apartamento no encontrado" });
    }

    // Validar que la fecha de reserva no esté ocupada para el ID del apartamento
    const existingBooking = await Booking.findOne({
      apartment,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) },
    });


    if (existingBooking) {
      return res.status(400).json({ message: "El apartamento ya está reservado en las fechas indicadas" });
    }

    // Extraer el precio del apartamento
    const apartmentPrice = existApartment.price;

    // Validar que el precio del apartamento sea un numero
    if (typeof apartmentPrice !== "number" || isNaN(apartmentPrice)) {
      return res.status(400).json({ message: "El precio del apartamento es inválido" });
    }

    // Convertir las fechas a Date
    const dateStart = new Date(startDate);
    const dateEnd = new Date(endDate);


    // Validar que la fecha de inicio y fecha de fin sean diferentes
    if (dateStart.getTime() === dateEnd.getTime()) {
      return res.status(400).json({ message: "La fecha de inicio y la fecha de fin no pueden ser iguales" });
    }

    // Obtener la fecha actual
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
    const currentDay = String(currentDate.getDate()).padStart(2, '0');
    const formattedCurrentDate = new Date(`${currentYear}-${currentMonth}-${currentDay}`);


    // Validar que la fecha de inicio sea mayor o igual a la fecha actual
    if (dateStart < formattedCurrentDate) {
      return res.status(400).json({ message: "La fecha de inicio debe ser mayor o igual a la fecha actual" });
    }

    // La fecha finalizacion debe de ser igual o mayor a la fecha de inicio
    if (dateEnd < dateStart) {
      return res.status(400).json({ message: "La fecha de finalización debe ser igual o mayor a la fecha de inicio" });
    }

    // Calcular el total
    const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
    const diffDays = (Math.round(Math.abs((dateEnd - dateStart) / oneDay)));
    const totalPrice = diffDays * apartmentPrice;

    // Generar codigo de reserva
    const codeReservation = shortid.generate();

    // Crear la reserva
    const newBooking = new Booking({
      reservationCode: codeReservation,
      startDate,
      endDate,
      numberOfDays,
      totalPrice,
      state,
      user: id,
      apartment,
    })

    // Guardar la reserva
    const booking = await newBooking.save();


    // devolver la reserva
    res.status(201).json(booking);

  } catch (error) {
    res.status(500).json(error.message);
  }

}

/** Obtener todas las reservas, Por usuario  */
export const getAllBookings = async (req, res) => {

  // const { user: id } = req.user;

  console.log(req.user.id)

  try {

    const bookings = await Booking.find({ user: req.user.id });
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No hay reservas" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json(error.message);
  }

}

/** Obtener una reserva por ID, Por usuario */
export const getBookingById = async (req, res) => {
  try {

    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Reserva no encontrada" })

    res.status(200).json(booking);

  } catch (error) {
    res.status(500).json(error.message);
  }

}

/** Obtener todas las reservas, Publicos  */
export const getAllBookingsPublic = async (req, res) => {
  try {

    const bookings = await Booking.find();
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No hay reservas" });
    }

    // Filtrar las reservas para que solo sean publicas
    const bookingsFiltered = bookings.map((booking) => ({

      id: booking._id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      apartment: booking.apartment,
      state: booking.state,

    }))

    res.status(200).json(bookingsFiltered);
  } catch (error) {
    res.status(500).json(error.message);
  }

}

/** Obtener una reserva por ID (Incluye fechas de inicio y finalizacións)  */
export const getBookingByIdPublic = async (req, res) => {
  try {

    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Reserva no encontrada" })

    res.status(200).json({
      id: booking._id,
      startDate: booking.startDate,
      endDate: booking.endDate,
      apartment: booking.apartment,
      state: booking.state,
    });

  } catch (error) {
    res.status(500).json(error.message);
  }

}

/** Obtener reservas por apartamento - Publico    */
export const getBookingsByApartmentPublic = async (req, res) => {
  try {

    const { id } = req.params;

    const bookings = await Booking.find({ apartment: id });
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No hay reservas" });
    }

    // Filtrar las reservas para que solo sean publicas
    const bookingsFiltered = bookings.map((booking) => ({

      id: booking._id,
      apartment: booking.apartment,
      startDate: booking.startDate,
      endDate: booking.endDate,
      state: booking.state,

    }))

    res.status(200).json(bookingsFiltered);
  } catch (error) {
    res.status(500).json(error.message);
  }


}


/** Cancelar una reserva  - Por usuario  */
export const cancelBooking = async (req, res) => {

  try {
    const { reservationCode } = req.params;


    if (!reservationCode) return res.status(400).json({ message: "El codigo de la reserva es obligatorio" })


    // Validar si la reserva existe
    const booking = await Booking.findOne({ reservationCode });

    if (!booking) return res.status(404).json({ message: "La reserva no existe" })


    // Validar que el estado sea valido
    if (booking.state === "Cancelada") {
      return res.status(400).json({ message: "La reserva ya se encuentra cancelada" });
    }

    if (booking.state === "Confirmada") {
      return res.status(400).json({ message: "El estado de la reserva esta como confirmada!" });
    }

    // Obtener el ID del apartamento asociado a la reserva
    const apartmentId = booking.apartment;

    // Liberar la fecha reservada
    await Apartment.findByIdAndUpdate(
      apartmentId,
      { $pull: { bookings: booking._id } },
      { new: true }
    );

    booking.starDateCancled = booking.startDate;
    booking.endDateCancled = booking.endDate;
    booking.startDate = new Date("1900-01-01");
    booking.endDate = new Date("1900-01-01");
    booking.state = "Cancelada";

    await booking.save();

    res.status(200).json({ message: "Reserva cancelada" });


  } catch (error) {
    res.status(500).json(error.message);
  }

}

/** Confirmar una reserva  - Administrador  */
export const confirmBooking = async (req, res) => {

  try {
    const { reservationCode } = req.params;


    if (!reservationCode) return res.status(400).json({ message: "El codigo de la reserva es obligatorio" })


    // Validar si la reserva existe
    const booking = await Booking.findOne({ reservationCode });

    if (!booking) return res.status(404).json({ message: "La reserva no existe" })


    if (booking.state === "Confirmada") {
      return res.status(400).json({ message: "El estado de la reserva ya se encuentra confirmada!" });
    }

    // Obtener el ID del apartamento asociado a la reserva
    const apartmentId = booking.apartment;

    booking.state = "Confirmada";

    await booking.save();

    res.status(200).json({ message: "Reserva confirmada" });


  } catch (error) {
    res.status(500).json(error.message);
  }

}