const Hotel = require("../models/hotelModel");

const searchByCity = async (parent, args) => {
  try {
    return await Hotel.findOne({ city: args.city });
  } catch (err) {
    throw new Error("Error fetching hotel");
  }
};

module.exports = {
  searchByCity,
};
