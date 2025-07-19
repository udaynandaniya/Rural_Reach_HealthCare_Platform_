// //C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\Doctor.ts
// import mongoose from "mongoose"

// const addressSchema = new mongoose.Schema({
//   street: { type: String, required: true },
//   area: { type: String, required: true },
//   village: { type: String, required: true }, // Renamed from townOrVillage
//   subDistrict: { type: String, required: true }, // Renamed from taluka
//   district: { type: String, required: true },
//   geoLocation: {
//     lat: { type: Number ,required: false }, // Make coordinates required for distance calculation
//     lng: { type: Number ,required: false },
//   },
// })

// const doctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   specialty: { type: String, required: true },
//   hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
//   isVerified: { type: Boolean, default: false },
//   address: { type: addressSchema, required: true },
//   role: { type: String, default: "doctor" },
//   createdAt: { type: Date, default: Date.now },
// })

// export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema)


//C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\Doctor.ts
import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  area: { type: String, required: true },
  village: { type: String, required: true }, // Renamed from townOrVillage
  subDistrict: { type: String, required: true }, // Renamed from taluka
  district: { type: String, required: true },
  geoLocation: {
    lat: { type: Number, required: false }, // Make coordinates required for distance calculation
    lng: { type: Number, required: false },
  },
})

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialty: { type: String, required: true },
  hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
  isVerified: { type: Boolean, default: false },
  address: { type: addressSchema, required: true },
  role: { type: String, default: "doctor" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema)
