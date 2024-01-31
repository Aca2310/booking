import Booking_ruangan from "../models/Booking_ruangan.js";


export const getBooking = async (req, res) => {
    try {
        const response = await  Booking_ruangan.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const SaveBooking_ruangan = async (req, res) => {
    try {
        // Create a new booking entry in the database
        const booking = await Booking_ruangan.create(req.body);
        res.status(201).json({ success: true, data: booking });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
}
