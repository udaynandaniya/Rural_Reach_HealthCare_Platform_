// // // // //C:\Users\UDAYN\Downloads\healthcare-platform\lib\utils.ts

// // // // import { clsx, type ClassValue } from "clsx"
// // // // import { twMerge } from "tailwind-merge"

// // // // export function cn(...inputs: ClassValue[]) {
// // // //   return twMerge(clsx(inputs))
// // // // }





// // // import { type ClassValue, clsx } from "clsx"
// // // import { twMerge } from "tailwind-merge"

// // // export function cn(...inputs: ClassValue[]) {
// // //   return twMerge(clsx(inputs))
// // // }

// // // // Helper function to calculate distance between two coordinates (moved here for reusability)
// // // export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
// // //   const R = 6371 // Radius of the Earth in kilometers
// // //   const dLat = (lat2 - lat1) * (Math.PI / 180)
// // //   const dLng = (lng2 - lng1) * (Math.PI / 180)
// // //   const a =
// // //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // //     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
// // //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
// // //   const distance = R * c // Distance in kilometers
// // //   return distance
// // // }






// // import { clsx, type ClassValue } from "clsx"
// // import { twMerge } from "tailwind-merge"

// // // Helper function to calculate distance between two coordinates
// // export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
// //   const R = 6371 // Radius of the Earth in kilometers
// //   const dLat = (lat2 - lat1) * (Math.PI / 180)
// //   const dLng = (lng2 - lng1) * (Math.PI / 180)
// //   const a =
// //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// //     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
// //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
// //   const distance = R * c // Distance in kilometers
// //   return distance
// // }
// // export function cn(...inputs: ClassValue[]) {
// //   return twMerge(clsx(inputs))
// // }




// import { type ClassValue, clsx } from "clsx"
// import { twMerge } from "tailwind-merge"

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// // Helper function to calculate distance between two coordinates
// export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
//   const R = 6371 // Radius of the Earth in kilometers
//   const dLat = (lat2 - lat1) * (Math.PI / 180)
//   const dLng = (lng2 - lng1) * (Math.PI / 180)
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
//   const distance = R * c // Distance in kilometers
//   return distance
// }


import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to calculate distance between two lat/lng points in kilometers
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180)
  const dLon = (lon2 - lon1) * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c // Distance in km
  return distance
}
