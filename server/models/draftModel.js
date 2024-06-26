import mongoose from "mongoose";

const Schema = mongoose.Schema
const draftSchema = new Schema({
    status: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
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
    imdb_rating:{
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


export default mongoose.model('Drafts', draftSchema)