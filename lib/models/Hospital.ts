// // // //C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\Hospital.ts

// // // import mongoose from "mongoose"

// // // const addressSchema = new mongoose.Schema({
// // //   street: { type: String, required: true },
// // //   area: { type: String, required: true },
// // //   townOrVillage: { type: String, required: true },
// // //   taluka: { type: String, required: true },
// // //   district: { type: String, required: true },
// // //   pincode: { type: String, required: true },
// // //   geoLocation: {
// // //     lat: { type: Number },
// // //     lng: { type: Number },
// // //   },
// // // })

// // // const hospitalSchema = new mongoose.Schema({
// // //   name: { type: String, required: true },
// // //   email: { type: String, required: true, unique: true },
// // //   phone: { type: String, required: true, unique: true },
// // //   password: { type: String, required: true },
// // //   isAvailable: { type: Boolean, default: true },
// // //   isHandleEmergency: { type: Boolean, required: true },
// // //   isVerified: { type: Boolean, default: false },
// // //   address: { type: addressSchema, required: true },
// // //   location: {
// // //     lat: { type: Number },
// // //     lng: { type: Number },
// // //   },
// // //   role: { type: String, default: "hospital" },
// // //   createdAt: { type: Date, default: Date.now },
// // // })

// // // export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)



// // //C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\Hospital.ts
// // import mongoose from "mongoose"

// // const addressSchema = new mongoose.Schema({
// //   street: { type: String, required: true },
// //   area: { type: String, required: true },
// //   village: { type: String, required: true }, // Renamed from townOrVillage
// //   subDistrict: { type: String, required: true }, // Renamed from taluka
// //   district: { type: String, required: true },
// //   geoLocation: {
// //     lat: { type: Number ,required: false }, // Make coordinates required for distance calculation
// //     lng: { type: Number, required: false},
// //   },
// // })


// // const hospitalSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { type: String, required: true, unique: true },
// //   phone: { type: String, required: true, unique: true },
// //   password: { type: String, required: true },
// //   address: { type: addressSchema, required: true },
// //   specialties: [{ type: String, required: true }],
// //   isVerified: { type: Boolean, default: false },
// //   isAvailable: { type: Boolean, default: true }, // Hospital availability status
// //   isHandleEmergency: { type: Boolean, required: true }, // Whether hospital handles emergencies - REQUIRED
// //   role: { type: String, default: "hospital" },
// //   createdAt: { type: Date, default: Date.now },
// // })

// // export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)



// // C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\Hospital.ts
// import mongoose from "mongoose"

// const addressSchema = new mongoose.Schema({
//   street: { type: String, required: true },
//   area: { type: String, required: true },
//   village: { type: String, required: true }, // Renamed from townOrVillage
//   subDistrict: { type: String, required: true }, // Renamed from taluka
//   district: { type: String, required: true },
//   geoLocation: {
//     lat: { type: Number }, // Made REQUIRED for accurate location use
//     lng: { type: Number },
//   },
// })

// const hospitalSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     address: {
//       type: addressSchema,
//       required: true,
//       default: {}, // Ensure nested structure exists
//     },
//     specialties: [{ type: String, required: true }],
//     isVerified: { type: Boolean, default: false },
//     isAvailable: { type: Boolean, default: true },
//     isHandleEmergency: { type: Boolean, required: true },
//     role: { type: String, default: "hospital" },
//   },
//   { timestamps: true } // Adds createdAt and updatedAt
// )

// export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)







import mongoose from "mongoose"

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  area: { type: String, required: true },
  village: { type: String, required: true }, // Renamed from townOrVillage
  subDistrict: { type: String, required: true }, // Renamed from taluka
  district: { type: String, required: true },
  pincode: { type: String }, // Added for consistency with formatLocationAddress
  state: { type: String, required: true, default: "Gujarat" }, // Added for consistency and default
  geoLocation: {
    // This is for the static address's coordinates, made required as per your comment
    lat: { type: Number, required: false }, // Made optional as it might be populated later
    lng: { type: Number, required: false }, // Made optional as it might be populated later
  },
})

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: addressSchema, required: true },
  // This new top-level 'location' field is for dynamic, live location updates
  // It will now be populated from the address during signup
  location: {
    lat: { type: Number, required: false }, // Optional, as live location might not always be available
    lng: { type: Number, required: false }, // Optional, as live location might not always be available
  },
  specialties: [{ type: String, required: true }],
  isVerified: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true }, // Hospital availability status
  isHandleEmergency: { type: Boolean, required: true }, // Whether hospital handles emergencies - REQUIRED
  role: { type: String, default: "hospital" },
  createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.Hospital || mongoose.model("Hospital", hospitalSchema)
