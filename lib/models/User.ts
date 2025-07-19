// //C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\User.ts
// import mongoose from "mongoose"

// // const addressSchema = new mongoose.Schema({
// //   street: { type: String, required: true },
// //   area: { type: String, required: true },
// //   townOrVillage: { type: String, required: true },
// //   taluka: { type: String, required: true },
// //   district: { type: String, required: true },
// //   geoLocation: {
// //     lat: { type: Number },
// //     lng: { type: Number },
// //   },
// // })

// const addressSchema = new mongoose.Schema({
//   street: { type: String, required: true },
//   area: { type: String, required: true },
//   village: { type: String, required: true }, // Renamed from townOrVillage
//   subDistrict: { type: String, required: true }, // Renamed from taluka
//   district: { type: String, required: true },
//   geoLocation: {
//     lat: { type: Number, required: false }, // Make coordinates required for distance calculation
//     lng: { type: Number, required: false },
//   },
// })

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   address: { type: addressSchema, required: true },
//   isAdmin: { type: Boolean, default: false },
//   isVerified: { type: Boolean, default: false },
//   role: { type: String, default: "user" },
//   createdAt: { type: Date, default: Date.now },
// })

// export default mongoose.models.User || mongoose.model("User", userSchema)





// C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\User.ts
import mongoose from "mongoose"

// Optional: previous version (for reference)
// const addressSchema = new mongoose.Schema({
//   street: { type: String, required: true },
//   area: { type: String, required: true },
//   townOrVillage: { type: String, required: true },
//   taluka: { type: String, required: true },
//   district: { type: String, required: true },
//   geoLocation: {
//     lat: { type: Number },
//     lng: { type: Number },
//   },
// })

// ✅ Updated Address Schema with Renamed Fields
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  area: { type: String, required: true },
  village: { type: String, required: true },       // Renamed from townOrVillage
  subDistrict: { type: String, required: true },   // Renamed from taluka
  district: { type: String, required: true },
  geoLocation: {
    lat: { type: Number, required: false },        // Not required during signup
    lng: { type: Number, required: false },
  },
})

// ✅ User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true },
  isAdmin: { type: Boolean, default: false },
  isVerified: { type: Boolean, default: false },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
})

// ✅ Export model (avoid re-defining on hot reload)
export default mongoose.models.User || mongoose.model("User", userSchema)
