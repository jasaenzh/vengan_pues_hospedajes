import mongoose from "mongoose";

const statusCode = ["Pendiente", "Confirmada", "Cancelada"]

const bookingSchema = new mongoose.Schema(
  {
    reservationCode: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    starDateCancled: {
      type: Date,
      default: null,
    },
    endDateCancled: {
      type: Date,
      default: null,
    },
    numberOfDays: {
      type: Number,
    },
    totalPrice: {
      type: Number,
    },
    state: {
      type: String,
      enum: statusCode,
      default: "Pendiente",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    apartment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Apartment",
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

bookingSchema.pre("save", function (next) {
  const startDate = this.startDate;
  const endDate = this.endDate;

  // Calcular los días entre las fechas
  const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
  const diffDays = Math.ceil(Math.abs((endDate - startDate) / oneDay));

  this.numberOfDays = diffDays;

  next();
});

export default mongoose.model("Booking", bookingSchema);