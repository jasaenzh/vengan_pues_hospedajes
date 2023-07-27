import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema(
  {
    // Numero de Apartamento
    apartmentNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // Locacion
    location: {
      type: String,
      required: true,
      trim: true,
    },
    // Area
    squareMeter: {
      type: Number,
      required: true,
    },
    // Precio
    price: {
      type: Number,
      required: true,
    },
    // Duplex
    duplex: {
      type: Boolean,
      default: false,
    },
    // Habitaciones
    bedrooms: {
      type: Number,
      required: true,
    },
    // Camas dobles
    doubleBeds: {
      type: Number,
      required: true,
    },
    // Camas sencillas
    singleBeds: {
      type: Number,
      required: true,
    },
    // Camas tipo nido
    trundleBed: {
      type: Number,
      required: true,
    },
    // Baños
    bathrooms: {
      type: Number,
      required: true,
    },
    // Agua caliente
    hotWater: {
      type: Boolean,
      default: false,
    },
    // Secador de cabello
    hairdryer: {
      type: Number,
      required: true,
    },
    // Sala de estar
    livingRoom: {
      type: Boolean,
      default: false,
    },
    // Comedor
    diningRoom: {
      type: Number,
      required: true,
    },
    // Sofa cama
    sofaBed: {
      type: Number,
      required: true,
    },
    // Televisor
    tv: {
      type: Number,
      required: true,
    },
    // Internet
    internet: {
      type: Boolean,
      default: false,
    },
    // Cocina
    kitchen: {
      type: Boolean,
      default: false,
    },
    // Nevera
    fridge: {
      type: Boolean,
      default: false,
    },
    // Lavadora
    washingMachine: {
      type: Boolean,
      default: false,
    },
    // Microondas
    microwave: {
      type: Boolean,
      default: false,
    },
    // Cafetera
    coffeeMaker: {
      type: Boolean,
      default: false,
    },
    // Licuadora
    dishwasher: {
      type: Boolean,
      default: false,
    },
    // Tostadora de pan
    breadToaster: {
      type: Boolean,
      default: false,
    },
    // Olla de presion
    pressureCooker: {
      type: Boolean,
      default: false,
    },
    // Olla arrocera
    riceCooker: {
      type: Boolean,
      default: false,
    },
    // Sanduchera
    grill: {
      type: Boolean,
      default: false,
    },
    // Camaras de seguridad
    securityCameras: {
      type: Boolean,
      default: false,
    },
    // Terraza con vista
    terraceWithView: {
      type: Boolean,
      default: false,
    },
    // image: {
    //   public_id: String,
    //   secure_url: String
    // },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        }
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model("Apartment", apartmentSchema);