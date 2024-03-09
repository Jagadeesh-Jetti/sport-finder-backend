const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
});

const SportsProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SportsUser",
    required: true,
  },
  sportsProfile: [
    {
      sport: {
        type: String,
        required: true,
      },
      skillLevel: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true,
      },
    },
  ],
  preferredActivities: {
    type: [String],
    required: true,
  },
  location: {
    type: AddressSchema,
    required: true,
  },
});

// SportsProfileSchema.pre("save", async function (next) {
//   // Geocode the address and set the coordinates before saving
//   // You would need to implement or use a geocoding service for this
//   // For demonstration purposes, let's assume a fictional geocoding function
//   try {
//     const coordinates = await geocodeAddress(this.location);
//     this.location = { ...this.location, coordinates }; // Update the location with coordinates
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

// SportsProfileSchema.index({ "location.coordinates": "2dsphere" }); // Index for geospatial queries

const SportsProfile = mongoose.model("SportsProfile", SportsProfileSchema);

module.exports = SportsProfile;

// Assume a fictional geocoding function for demonstration purposes
// async function geocodeAddress(address) {
//   // Implement your geocoding logic here, or use a geocoding service
//   // Return an array with [longitude, latitude]
//   return [0, 0];
// }
