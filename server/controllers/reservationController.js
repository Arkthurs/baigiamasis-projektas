import Reservation from '../models/reservationModel.js'
import mongoose from 'mongoose'

// GET - paimti visus userio rezervations
export const getReservations = async (req, res) => {
    const user_id = req.user._id
    const reservations = await Reservation.find({user_id}).sort({createdAt: 1})
    res.status(200).json(reservations)
}
export const getReservationsAdmin = async (req, res) => {
    const reservations = await Reservation.find({}).sort({createdAt: 1})
    res.status(200).json(reservations)
}

// GET - paimti viena userio rezervation
export const getReservation = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    const reservations = await Reservation.findById(id)
    if(!reservations) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    res.status(200).json(reservations)
}

// POST - sukurti rezervacija
export const createReservation = async (req, res) => {
    const {user_email, movie_id, pickup_date, pickup_location} = req.body
    let emptyFields = []

    if (!movie_id) {emptyFields.push('movie_id')}
    if (!pickup_date) {emptyFields.push('pickup_date')}
    if (!pickup_location) {emptyFields.push('pickup_location')}
    if (!user_email) { emptyFields.push('user_email') }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Prašome užpildyti visus laukelius', emptyFields })
    }

    try {
        const user_id = req.user._id
        const reservation = await Reservation.create({user_email, user_id, movie_id, pickup_date, pickup_location})
        res.status(200).json(reservation)
    } catch(error) {
        res.status(400).json({message: "Error creating reservation", error: error.toString()})
    }
}


// PATCH - pakoreguoti rezervacija
export const updateReservation = async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        const updatedReservation = await Reservation.findByIdAndUpdate(id, update, { new: true });
        if (!updatedReservation) {
            return res.status(404).json({ message: "Reservation not found" });
        }
        res.status(200).json(updatedReservation);
    } catch (error) {
        res.status(400).json({ message: "Error updating reservation", error: error.toString() });
    }
}

// DELETE - istrinti rezervacija
export const deleteReservation = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    const rezervacija = await Reservation.findOneAndDelete({_id: id})
    if(!rezervacija) {
        return res.status(404).json({error: 'There is no such reservation.'})
    }
    res.status(200).json(rezervacija)
}
