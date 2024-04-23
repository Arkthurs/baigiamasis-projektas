import mongoose from "mongoose";

const Schema = mongoose.Schema
const moviesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    release_year:{
        type: Number,
        required: true,
    },
    genres: {
        type: [String],
        required: true
    },
    imdb:{
        type: Number,
        required: true,
    },
    director: {
        type: [String],
        required: true
    },
    cast: {
        type: [String],
        required: true
    }
})


export default mongoose.model('Movies', moviesSchema)