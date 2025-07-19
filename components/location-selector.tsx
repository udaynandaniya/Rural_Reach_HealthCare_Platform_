
// // // // "use client"
// // // // import { useState, useEffect } from "react"
// // // // import { Check, ChevronsUpDown, MapPin } from "lucide-react"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// // // // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// // // // import { Label } from "@/components/ui/label"
// // // // import { Input } from "@/components/ui/input"
// // // // import { cn } from "@/lib/utils"
// // // // import gujaratData from "@/lib/gujarat-data.json"

// // // // interface AddressData {
// // // //   district: string
// // // //   subDistrict: string
// // // //   village: string
// // // //   street: string
// // // //   area: string
// // // //   pincode: string
// // // // }

// // // // interface LocationSelectorProps {
// // // //   value: AddressData
// // // //   onChange: (address: AddressData) => void
// // // //   required?: boolean
// // // // }

// // // // export default function LocationSelector({ value, onChange, required = false }: LocationSelectorProps) {
// // // //   const [districtOpen, setDistrictOpen] = useState(false)
// // // //   const [subDistrictOpen, setSubDistrictOpen] = useState(false)
// // // //   const [villageOpen, setVillageOpen] = useState(false)
// // // //   const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
// // // //   const [availableSubDistricts, setAvailableSubDistricts] = useState<string[]>([])
// // // //   const [availableVillages, setAvailableVillages] = useState<string[]>([])

// // // //   // Update available districts when state changes
// // // //   useEffect(() => {
// // // //     setAvailableDistricts(gujaratData.districts.map((d) => d.district))
// // // //   }, [])

// // // //   // Update available sub-districts when district changes
// // // //   useEffect(() => {
// // // //     const selectedDistrict = gujaratData.districts.find((d) => d.district === value.district)
// // // //     setAvailableSubDistricts(selectedDistrict ? selectedDistrict.subDistricts.map((sd) => sd.subDistrict) : [])
// // // //   }, [value.district])

// // // //   // Update available villages when subDistrict changes
// // // //   useEffect(() => {
// // // //     const selectedDistrict = gujaratData.districts.find((d) => d.district === value.district)
// // // //     const selectedSubDistrict = selectedDistrict?.subDistricts.find((sd) => sd.subDistrict === value.subDistrict)
// // // //     setAvailableVillages(selectedSubDistrict ? selectedSubDistrict.villages : [])
// // // //   }, [value.district, value.subDistrict])

// // // //   const handleInputChange = (field: keyof AddressData, value: string) => {
// // // //     onChange({
// // // //       ...value,
// // // //       [field]: value,
// // // //     })
// // // //   }

// // // //   const handleDistrictChange = (district: string) => {
// // // //     onChange({
// // // //       ...value,
// // // //       district,
// // // //       subDistrict: "",
// // // //       village: "",
// // // //     })
// // // //     setDistrictOpen(false)
// // // //   }

// // // //   const handleSubDistrictChange = (subDistrict: string) => {
// // // //     onChange({
// // // //       ...value,
// // // //       subDistrict,
// // // //       village: "",
// // // //     })
// // // //     setSubDistrictOpen(false)
// // // //   }

// // // //   const handleVillageChange = (village: string) => {
// // // //     onChange({
// // // //       ...value,
// // // //       village,
// // // //     })
// // // //     setVillageOpen(false)
// // // //   }

// // // //   return (
// // // //     <div className="space-y-4">
// // // //       {/* Display Fixed State */}
// // // //       <div>
// // // //         <Label>State {required && <span className="text-red-500">*</span>}</Label>
// // // //         <Input type="text" value="Gujarat" disabled />
// // // //       </div>

// // // //       {/* District Selector */}
// // // //       <div>
// // // //         <Label>District {required && <span className="text-red-500">*</span>}</Label>
// // // //         <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
// // // //           <PopoverTrigger asChild>
// // // //             <Button
// // // //               variant="outline"
// // // //               role="combobox"
// // // //               aria-expanded={districtOpen}
// // // //               className="w-full justify-between bg-transparent"
// // // //             >
// // // //               {value.district || "Select district..."}
// // // //               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// // // //             </Button>
// // // //           </PopoverTrigger>
// // // //           <PopoverContent className="w-full p-0">
// // // //             <Command>
// // // //               <CommandInput placeholder="Search district..." />
// // // //               <CommandList>
// // // //                 <CommandEmpty>No district found.</CommandEmpty>
// // // //                 <CommandGroup>
// // // //                   {availableDistricts.map((district) => (
// // // //                     <CommandItem key={district} value={district} onSelect={() => handleDistrictChange(district)}>
// // // //                       <Check
// // // //                         className={cn("mr-2 h-4 w-4", value.district === district ? "opacity-100" : "opacity-0")}
// // // //                       />
// // // //                       {district}
// // // //                     </CommandItem>
// // // //                   ))}
// // // //                 </CommandGroup>
// // // //               </CommandList>
// // // //             </Command>
// // // //           </PopoverContent>
// // // //         </Popover>
// // // //       </div>

// // // //       {/* Sub-District Selector */}
// // // //       <div>
// // // //         <Label>Sub-District {required && <span className="text-red-500">*</span>}</Label>
// // // //         <Popover open={subDistrictOpen} onOpenChange={setSubDistrictOpen}>
// // // //           <PopoverTrigger asChild>
// // // //             <Button
// // // //               variant="outline"
// // // //               role="combobox"
// // // //               aria-expanded={subDistrictOpen}
// // // //               className="w-full justify-between bg-transparent"
// // // //               disabled={!value.district}
// // // //             >
// // // //               {value.subDistrict || "Select sub-district..."}
// // // //               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// // // //             </Button>
// // // //           </PopoverTrigger>
// // // //           <PopoverContent className="w-full p-0">
// // // //             <Command>
// // // //               <CommandInput placeholder="Search sub-district..." />
// // // //               <CommandList>
// // // //                 <CommandEmpty>No sub-district found.</CommandEmpty>
// // // //                 <CommandGroup>
// // // //                   {availableSubDistricts.map((subDistrict) => (
// // // //                     <CommandItem
// // // //                       key={subDistrict}
// // // //                       value={subDistrict}
// // // //                       onSelect={() => handleSubDistrictChange(subDistrict)}
// // // //                     >
// // // //                       <Check
// // // //                         className={cn("mr-2 h-4 w-4", value.subDistrict === subDistrict ? "opacity-100" : "opacity-0")}
// // // //                       />
// // // //                       {subDistrict}
// // // //                     </CommandItem>
// // // //                   ))}
// // // //                 </CommandGroup>
// // // //               </CommandList>
// // // //             </Command>
// // // //           </PopoverContent>
// // // //         </Popover>
// // // //       </div>

// // // //       {/* Village Selector */}
// // // //       <div>
// // // //         <Label>Village {required && <span className="text-red-500">*</span>}</Label>
// // // //         {availableVillages.length > 0 ? (
// // // //           <Popover open={villageOpen} onOpenChange={setVillageOpen}>
// // // //             <PopoverTrigger asChild>
// // // //               <Button
// // // //                 variant="outline"
// // // //                 role="combobox"
// // // //                 aria-expanded={villageOpen}
// // // //                 className="w-full justify-between bg-transparent"
// // // //                 disabled={!value.subDistrict}
// // // //               >
// // // //                 {value.village || "Select village..."}
// // // //                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// // // //               </Button>
// // // //             </PopoverTrigger>
// // // //             <PopoverContent className="w-full p-0">
// // // //               <Command>
// // // //                 <CommandInput placeholder="Search village..." />
// // // //                 <CommandList>
// // // //                   <CommandEmpty>No village found.</CommandEmpty>
// // // //                   <CommandGroup>
// // // //                     {availableVillages.map((village) => (
// // // //                       <CommandItem key={village} value={village} onSelect={() => handleVillageChange(village)}>
// // // //                         <Check
// // // //                           className={cn("mr-2 h-4 w-4", value.village === village ? "opacity-100" : "opacity-0")}
// // // //                         />
// // // //                         {village}
// // // //                       </CommandItem>
// // // //                     ))}
// // // //                   </CommandGroup>
// // // //                 </CommandList>
// // // //               </Command>
// // // //             </PopoverContent>
// // // //           </Popover>
// // // //         ) : (
// // // //           <Input
// // // //             id="village"
// // // //             type="text"
// // // //             placeholder={value.subDistrict ? "Enter village name" : "Select sub-district first"}
// // // //             value={value.village}
// // // //             onChange={(e) => handleInputChange("village", e.target.value)}
// // // //             required={required}
// // // //             disabled={!value.subDistrict}
// // // //           />
// // // //         )}
// // // //       </div>

// // // //       {/* Manual Input Fields */}
// // // //       <div className="grid grid-cols-2 gap-4">
// // // //         <div>
// // // //           <Label htmlFor="street">Street {required && <span className="text-red-500">*</span>}</Label>
// // // //           <Input
// // // //             id="street"
// // // //             value={value.street}
// // // //             onChange={(e) => handleInputChange("street", e.target.value)}
// // // //             placeholder="Enter street address"
// // // //             required={required}
// // // //           />
// // // //         </div>
// // // //         <div>
// // // //           <Label htmlFor="area">Area {required && <span className="text-red-500">*</span>}</Label>
// // // //           <Input
// // // //             id="area"
// // // //             value={value.area}
// // // //             onChange={(e) => handleInputChange("area", e.target.value)}
// // // //             placeholder="Enter area/locality"
// // // //             required={required}
// // // //           />
// // // //         </div>
// // // //       </div>

// // // //       {/* Pincode Input */}
// // // //       {/* <div>
// // // //         <Label htmlFor="pincode">Pincode {required && <span className="text-red-500">*</span>}</Label>
// // // //         <div className="relative">
// // // //           <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // // //           <Input
// // // //             id="pincode"
// // // //             className="pl-10"
// // // //             value={value.pincode}
// // // //             onChange={(e) => handleInputChange("pincode", e.target.value)}
// // // //             placeholder="Enter pincode"
// // // //             maxLength={6}
// // // //             pattern="[0-9]{6}"
// // // //             required={required}
// // // //           />
// // // //         </div>
// // // //       </div> */}
// // // //     </div>
// // // //   )
// // // // }



// // "use client"
// // import { useState, useEffect } from "react"
// // import { Check, ChevronsUpDown } from "lucide-react" // MapPin will be removed later if not used
// // import { Button } from "@/components/ui/button"
// // import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// // import { Label } from "@/components/ui/label"
// // import { Input } from "@/components/ui/input"
// // import { cn } from "@/lib/utils"
// // import gujaratData from "@/lib/gujarat-data.json"

// // interface AddressData {
// //   street: string
// //   area: string
// //   district: string
// //   subDistrict: string
// //   village: string
// // }

// // interface LocationSelectorProps {
// //   value: AddressData
// //   onChange: (address: AddressData) => void
// //   required?: boolean
// // }

// // export default function LocationSelector({ value, onChange, required = false }: LocationSelectorProps) {
// //   const [districtOpen, setDistrictOpen] = useState(false)
// //   const [subDistrictOpen, setSubDistrictOpen] = useState(false)
// //   const [villageOpen, setVillageOpen] = useState(false)
// //   const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
// //   const [availableSubDistricts, setAvailableSubDistricts] = useState<string[]>([])
// //   const [availableVillages, setAvailableVillages] = useState<string[]>([])

// //   // Update available districts when state changes
// //   useEffect(() => {
// //     setAvailableDistricts(gujaratData.districts.map((d) => d.district))
// //   }, [])

// //   // Update available sub-districts when district changes
// //   useEffect(() => {
// //     const selectedDistrict = gujaratData.districts.find((d) => d.district === value.district)
// //     setAvailableSubDistricts(selectedDistrict ? selectedDistrict.subDistricts.map((sd) => sd.subDistrict) : [])
// //   }, [value.district])

// //   // Update available villages when subDistrict changes
// //   useEffect(() => {
// //     const selectedDistrict = gujaratData.districts.find((d) => d.district === value.district)
// //     const selectedSubDistrict = selectedDistrict?.subDistricts.find((sd) => sd.subDistrict === value.subDistrict)
// //     setAvailableVillages(selectedSubDistrict ? selectedSubDistrict.villages : [])
// //   }, [value.district, value.subDistrict])

// //   const handleInputChange = (field: keyof AddressData, inputValue: string) => {
// //     onChange({
// //       ...value,
// //       [field]: inputValue,
// //     })
// //   }

// //   const handleDistrictChange = (district: string) => {
// //     onChange({
// //       ...value,
// //       district,
// //       subDistrict: "",
// //       village: "",
// //     })
// //     setDistrictOpen(false)
// //   }

// //   const handleSubDistrictChange = (subDistrict: string) => {
// //     onChange({
// //       ...value,
// //       subDistrict,
// //       village: "",
// //     })
// //     setSubDistrictOpen(false)
// //   }

// //   const handleVillageChange = (village: string) => {
// //     onChange({
// //       ...value,
// //       village,
// //     })
// //     setVillageOpen(false)
// //   }

// //   return (
// //     <div className="space-y-4">
// //       {/* Manual Input Fields (Street and Area) */}
// //       <div className="grid grid-cols-2 gap-4">
// //         <div>
// //           <Label htmlFor="street">Street {required && <span className="text-red-500">*</span>}</Label>
// //           <Input
// //             id="street"
// //             value={value.street}
// //             onChange={(e) => handleInputChange("street", e.target.value)}
// //             placeholder="Enter street address"
// //             required={required}
// //           />
// //         </div>
// //         <div>
// //           <Label htmlFor="area">Area {required && <span className="text-red-500">*</span>}</Label>
// //           <Input
// //             id="area"
// //             value={value.area}
// //             onChange={(e) => handleInputChange("area", e.target.value)}
// //             placeholder="Enter area/locality"
// //             required={required}
// //           />
// //         </div>
// //       </div>

// //       {/* Display Fixed State */}
// //       <div>
// //         <Label>State {required && <span className="text-red-500">*</span>}</Label>
// //         <Input type="text" value="Gujarat" disabled />
// //       </div>

// //       {/* District Selector */}
// //       <div>
// //         <Label>District {required && <span className="text-red-500">*</span>}</Label>
// //         <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
// //           <PopoverTrigger asChild>
// //             <Button
// //               variant="outline"
// //               role="combobox"
// //               aria-expanded={districtOpen}
// //               className="w-full justify-between bg-transparent"
// //             >
// //               {value.district || "Select district..."}
// //               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// //             </Button>
// //           </PopoverTrigger>
// //           <PopoverContent className="w-full p-0">
// //             <Command>
// //               <CommandInput placeholder="Search district..." />
// //               <CommandList>
// //                 <CommandEmpty>No district found.</CommandEmpty>
// //                 <CommandGroup>
// //                   {availableDistricts.map((district) => (
// //                     <CommandItem key={district} value={district} onSelect={() => handleDistrictChange(district)}>
// //                       <Check
// //                         className={cn("mr-2 h-4 w-4", value.district === district ? "opacity-100" : "opacity-0")}
// //                       />
// //                       {district}
// //                     </CommandItem>
// //                   ))}
// //                 </CommandGroup>
// //               </CommandList>
// //             </Command>
// //           </PopoverContent>
// //         </Popover>
// //       </div>

// //       {/* Sub-District Selector */}
// //       <div>
// //         <Label>Sub-District {required && <span className="text-red-500">*</span>}</Label>
// //         <Popover open={subDistrictOpen} onOpenChange={setSubDistrictOpen}>
// //           <PopoverTrigger asChild>
// //             <Button
// //               variant="outline"
// //               role="combobox"
// //               aria-expanded={subDistrictOpen}
// //               className="w-full justify-between bg-transparent"
// //               disabled={!value.district}
// //             >
// //               {value.subDistrict || "Select sub-district..."}
// //               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// //             </Button>
// //           </PopoverTrigger>
// //           <PopoverContent className="w-full p-0">
// //             <Command>
// //               <CommandInput placeholder="Search sub-district..." />
// //               <CommandList>
// //                 <CommandEmpty>No sub-district found.</CommandEmpty>
// //                 <CommandGroup>
// //                   {availableSubDistricts.map((subDistrict) => (
// //                     <CommandItem
// //                       key={subDistrict}
// //                       value={subDistrict}
// //                       onSelect={() => handleSubDistrictChange(subDistrict)}
// //                     >
// //                       <Check
// //                         className={cn("mr-2 h-4 w-4", value.subDistrict === subDistrict ? "opacity-100" : "opacity-0")}
// //                       />
// //                       {subDistrict}
// //                     </CommandItem>
// //                   ))}
// //                 </CommandGroup>
// //               </CommandList>
// //             </Command>
// //           </PopoverContent>
// //         </Popover>
// //       </div>

// //       {/* Village Selector */}
// //       <div>
// //         <Label>Village {required && <span className="text-red-500">*</span>}</Label>
// //         {availableVillages.length > 0 ? (
// //           <Popover open={villageOpen} onOpenChange={setVillageOpen}>
// //             <PopoverTrigger asChild>
// //               <Button
// //                 variant="outline"
// //                 role="combobox"
// //                 aria-expanded={villageOpen}
// //                 className="w-full justify-between bg-transparent"
// //                 disabled={!value.subDistrict}
// //               >
// //                 {value.village || "Select village..."}
// //                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// //               </Button>
// //             </PopoverTrigger>
// //             <PopoverContent className="w-full p-0">
// //               <Command>
// //                 <CommandInput placeholder="Search village..." />
// //                 <CommandList>
// //                   <CommandEmpty>No village found.</CommandEmpty>
// //                   <CommandGroup>
// //                     {availableVillages.map((village) => (
// //                       <CommandItem key={village} value={village} onSelect={() => handleVillageChange(village)}>
// //                         <Check
// //                           className={cn("mr-2 h-4 w-4", value.village === village ? "opacity-100" : "opacity-0")}
// //                         />
// //                         {village}
// //                       </CommandItem>
// //                     ))}
// //                   </CommandGroup>
// //                 </CommandList>
// //               </Command>
// //             </PopoverContent>
// //           </Popover>
// //         ) : (
// //           <Input
// //             id="village"
// //             type="text"
// //             placeholder={value.subDistrict ? "Enter village name" : "Select sub-district first"}
// //             value={value.village}
// //             onChange={(e) => handleInputChange("village", e.target.value)}
// //             required={required}
// //             disabled={!value.subDistrict}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   )
// // }


// "use client"

// import { useState, useEffect } from "react"
// import { Check, ChevronsUpDown } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { cn } from "@/lib/utils"
// import gujaratData from "@/lib/gujarat-data.json"

// interface LocationSelectorProps {
//   selectedStreet: string
//   onStreetChange: (value: string) => void
//   selectedArea: string
//   onAreaChange: (value: string) => void
//   selectedDistrict: string
//   onDistrictChange: (value: string) => void
//   selectedSubDistrict: string
//   onSubDistrictChange: (value: string) => void
//   selectedVillage: string
//   onVillageChange: (value: string) => void
//   selectedState?: string // Assuming this is always "Gujarat" but can be passed
//   required?: boolean
// }

// export default function LocationSelector({
//   selectedStreet,
//   onStreetChange,
//   selectedArea,
//   onAreaChange,
//   selectedDistrict,
//   onDistrictChange,
//   selectedSubDistrict,
//   onSubDistrictChange,
//   selectedVillage,
//   onVillageChange,
//   selectedState = "Gujarat", // Default to Gujarat if not provided
//   required = false,
// }: LocationSelectorProps) {
//   const [districtOpen, setDistrictOpen] = useState(false)
//   const [subDistrictOpen, setSubDistrictOpen] = useState(false)
//   const [villageOpen, setVillageOpen] = useState(false)
//   const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
//   const [availableSubDistricts, setAvailableSubDistricts] = useState<string[]>([])
//   const [availableVillages, setAvailableVillages] = useState<string[]>([])

//   // Update available districts when component mounts
//   useEffect(() => {
//     setAvailableDistricts(gujaratData.districts.map((d) => d.district))
//   }, [])

//   // Update available sub-districts when district changes
//   useEffect(() => {
//     const selectedDistrictData = gujaratData.districts.find((d) => d.district === selectedDistrict)
//     setAvailableSubDistricts(selectedDistrictData ? selectedDistrictData.subDistricts.map((sd) => sd.subDistrict) : [])
//   }, [selectedDistrict])

//   // Update available villages when subDistrict changes
//   useEffect(() => {
//     const selectedDistrictData = gujaratData.districts.find((d) => d.district === selectedDistrict)
//     const selectedSubDistrictData = selectedDistrictData?.subDistricts.find(
//       (sd) => sd.subDistrict === selectedSubDistrict,
//     )
//     setAvailableVillages(selectedSubDistrictData ? selectedSubDistrictData.villages : [])
//   }, [selectedDistrict, selectedSubDistrict])

//   const handleDistrictChange = (district: string) => {
//     onDistrictChange(district)
//     onSubDistrictChange("") // Reset sub-district when district changes
//     onVillageChange("") // Reset village when district changes
//     setDistrictOpen(false)
//   }

//   const handleSubDistrictChange = (subDistrict: string) => {
//     onSubDistrictChange(subDistrict)
//     onVillageChange("") // Reset village when sub-district changes
//     setSubDistrictOpen(false)
//   }

//   const handleVillageChange = (village: string) => {
//     onVillageChange(village)
//     setVillageOpen(false)
//   }

//   return (
//     <div className="space-y-4">
//       {/* Manual Input Fields (Street and Area) */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <Label htmlFor="street">Street {required && <span className="text-red-500">*</span>}</Label>
//           <Input
//             id="street"
//             value={selectedStreet}
//             onChange={(e) => onStreetChange(e.target.value)}
//             placeholder="Enter street address"
//             required={required}
//           />
//         </div>
//         <div>
//           <Label htmlFor="area">Area {required && <span className="text-red-500">*</span>}</Label>
//           <Input
//             id="area"
//             value={selectedArea}
//             onChange={(e) => onAreaChange(e.target.value)}
//             placeholder="Enter area/locality"
//             required={required}
//           />
//         </div>
//       </div>
//       {/* Display Fixed State */}
//       <div>
//         <Label>State {required && <span className="text-red-500">*</span>}</Label>
//         <Input type="text" value={selectedState} disabled />
//       </div>
//       {/* District Selector */}
//       <div>
//         <Label>District {required && <span className="text-red-500">*</span>}</Label>
//         <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={districtOpen}
//               className="w-full justify-between bg-transparent"
//             >
//               {selectedDistrict || "Select district..."}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-full p-0">
//             <Command>
//               <CommandInput placeholder="Search district..." />
//               <CommandList>
//                 <CommandEmpty>No district found.</CommandEmpty>
//                 <CommandGroup>
//                   {availableDistricts.map((district) => (
//                     <CommandItem key={district} value={district} onSelect={() => handleDistrictChange(district)}>
//                       <Check
//                         className={cn("mr-2 h-4 w-4", selectedDistrict === district ? "opacity-100" : "opacity-0")}
//                       />
//                       {district}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>
//       {/* Sub-District Selector */}
//       <div>
//         <Label>Sub-District {required && <span className="text-red-500">*</span>}</Label>
//         <Popover open={subDistrictOpen} onOpenChange={setSubDistrictOpen}>
//           <PopoverTrigger asChild>
//             <Button
//               variant="outline"
//               role="combobox"
//               aria-expanded={subDistrictOpen}
//               className="w-full justify-between bg-transparent"
//               disabled={!selectedDistrict}
//             >
//               {selectedSubDistrict || "Select sub-district..."}
//               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//             </Button>
//           </PopoverTrigger>
//           <PopoverContent className="w-full p-0">
//             <Command>
//               <CommandInput placeholder="Search sub-district..." />
//               <CommandList>
//                 <CommandEmpty>No sub-district found.</CommandEmpty>
//                 <CommandGroup>
//                   {availableSubDistricts.map((subDistrict) => (
//                     <CommandItem
//                       key={subDistrict}
//                       value={subDistrict}
//                       onSelect={() => handleSubDistrictChange(subDistrict)}
//                     >
//                       <Check
//                         className={cn(
//                           "mr-2 h-4 w-4",
//                           selectedSubDistrict === subDistrict ? "opacity-100" : "opacity-0",
//                         )}
//                       />
//                       {subDistrict}
//                     </CommandItem>
//                   ))}
//                 </CommandGroup>
//               </CommandList>
//             </Command>
//           </PopoverContent>
//         </Popover>
//       </div>
//       {/* Village Selector */}
//       <div>
//         <Label>Village {required && <span className="text-red-500">*</span>}</Label>
//         {availableVillages.length > 0 ? (
//           <Popover open={villageOpen} onOpenChange={setVillageOpen}>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={villageOpen}
//                 className="w-full justify-between bg-transparent"
//                 disabled={!selectedSubDistrict}
//               >
//                 {selectedVillage || "Select village..."}
//                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-full p-0">
//               <Command>
//                 <CommandInput placeholder="Search village..." />
//                 <CommandList>
//                   <CommandEmpty>No village found.</CommandEmpty>
//                   <CommandGroup>
//                     {availableVillages.map((village) => (
//                       <CommandItem key={village} value={village} onSelect={() => handleVillageChange(village)}>
//                         <Check
//                           className={cn("mr-2 h-4 w-4", selectedVillage === village ? "opacity-100" : "opacity-0")}
//                         />
//                         {village}
//                       </CommandItem>
//                     ))}
//                   </CommandGroup>
//                 </CommandList>
//               </Command>
//             </PopoverContent>
//           </Popover>
//         ) : (
//           <Input
//             id="village"
//             type="text"
//             placeholder={selectedSubDistrict ? "Enter village name" : "Select sub-district first"}
//             value={selectedVillage}
//             onChange={(e) => onVillageChange(e.target.value)}
//             required={required}
//             disabled={!selectedSubDistrict}
//           />
//         )}
//       </div>
//     </div>
//   )
// }































"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import gujaratData from "@/lib/gujarat-data.json"

interface AddressData {
  street: string
  area: string
  district: string
  subDistrict: string
  village: string
}

interface LocationSelectorProps {
  value: AddressData
  onChange: (address: AddressData) => void
  required?: boolean
}

export default function LocationSelector({ value, onChange, required = false }: LocationSelectorProps) {
  const [districtOpen, setDistrictOpen] = useState(false)
  const [subDistrictOpen, setSubDistrictOpen] = useState(false)
  const [villageOpen, setVillageOpen] = useState(false)
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([])
  const [availableSubDistricts, setAvailableSubDistricts] = useState<string[]>([])
  const [availableVillages, setAvailableVillages] = useState<string[]>([])

  // Update available districts when component mounts
  useEffect(() => {
    setAvailableDistricts(gujaratData.districts.map((d) => d.district))
  }, [])

  // Update available sub-districts when district changes
  useEffect(() => {
    const selectedDistrict = gujaratData.districts.find((d) => d.district === value.district)
    setAvailableSubDistricts(selectedDistrict ? selectedDistrict.subDistricts.map((sd) => sd.subDistrict) : [])
  }, [value.district])

  // Update available villages when subDistrict changes
  useEffect(() => {
    const selectedDistrict = gujaratData.districts.find((d) => d.district === value.district)
    const selectedSubDistrict = selectedDistrict?.subDistricts.find((sd) => sd.subDistrict === value.subDistrict)
    setAvailableVillages(selectedSubDistrict ? selectedSubDistrict.villages : [])
  }, [value.district, value.subDistrict])

  const handleInputChange = (field: keyof AddressData, inputValue: string) => {
    onChange({
      ...value,
      [field]: inputValue,
    })
  }

  const handleDistrictChange = (district: string) => {
    onChange({
      ...value,
      district,
      subDistrict: "",
      village: "",
    })
    setDistrictOpen(false)
  }

  const handleSubDistrictChange = (subDistrict: string) => {
    onChange({
      ...value,
      subDistrict,
      village: "",
    })
    setSubDistrictOpen(false)
  }

  const handleVillageChange = (village: string) => {
    onChange({
      ...value,
      village,
    })
    setVillageOpen(false)
  }

  return (
    <div className="space-y-4">
      {/* Manual Input Fields (Street and Area) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="street">Street {required && <span className="text-red-500">*</span>}</Label>
          <Input
            id="street"
            value={value.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
            placeholder="Enter street address"
            required={required}
          />
        </div>
        <div>
          <Label htmlFor="area">Area {required && <span className="text-red-500">*</span>}</Label>
          <Input
            id="area"
            value={value.area}
            onChange={(e) => handleInputChange("area", e.target.value)}
            placeholder="Enter area/locality"
            required={required}
          />
        </div>
      </div>
      {/* Display Fixed State */}
      <div>
        <Label>State {required && <span className="text-red-500">*</span>}</Label>
        <Input type="text" value="Gujarat" disabled />
      </div>
      {/* District Selector */}
      <div>
        <Label>District {required && <span className="text-red-500">*</span>}</Label>
        <Popover open={districtOpen} onOpenChange={setDistrictOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={districtOpen}
              className="w-full justify-between bg-transparent"
            >
              {value.district || "Select district..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search district..." />
              <CommandList>
                <CommandEmpty>No district found.</CommandEmpty>
                <CommandGroup>
                  {availableDistricts.map((district) => (
                    <CommandItem key={district} value={district} onSelect={() => handleDistrictChange(district)}>
                      <Check
                        className={cn("mr-2 h-4 w-4", value.district === district ? "opacity-100" : "opacity-0")}
                      />
                      {district}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* Sub-District Selector */}
      <div>
        <Label>Sub-District {required && <span className="text-red-500">*</span>}</Label>
        <Popover open={subDistrictOpen} onOpenChange={setSubDistrictOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={subDistrictOpen}
              className="w-full justify-between bg-transparent"
              disabled={!value.district}
            >
              {value.subDistrict || "Select sub-district..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search sub-district..." />
              <CommandList>
                <CommandEmpty>No sub-district found.</CommandEmpty>
                <CommandGroup>
                  {availableSubDistricts.map((subDistrict) => (
                    <CommandItem
                      key={subDistrict}
                      value={subDistrict}
                      onSelect={() => handleSubDistrictChange(subDistrict)}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", value.subDistrict === subDistrict ? "opacity-100" : "opacity-0")}
                      />
                      {subDistrict}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {/* Village Selector */}
      <div>
        <Label>Village {required && <span className="text-red-500">*</span>}</Label>
        {availableVillages.length > 0 ? (
          <Popover open={villageOpen} onOpenChange={setVillageOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={villageOpen}
                className="w-full justify-between bg-transparent"
                disabled={!value.subDistrict}
              >
                {value.village || "Select village..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search village..." />
                <CommandList>
                  <CommandEmpty>No village found.</CommandEmpty>
                  <CommandGroup>
                    {availableVillages.map((village) => (
                      <CommandItem key={village} value={village} onSelect={() => handleVillageChange(village)}>
                        <Check
                          className={cn("mr-2 h-4 w-4", value.village === village ? "opacity-100" : "opacity-0")}
                        />
                        {village}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <Input
            id="village"
            type="text"
            placeholder={value.subDistrict ? "Enter village name" : "Select sub-district first"}
            value={value.village}
            onChange={(e) => handleInputChange("village", e.target.value)}
            required={required}
            disabled={!value.subDistrict}
          />
        )}
      </div>
    </div>
  )
}
