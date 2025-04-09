import cloudinary from "../lib/cloudinary.js";
import { Album } from "../models/album.model.js";
import { Song } from './../models/song.model.js';

const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            resource_type: "auto"
        });
        return result.secure_url;
    }
    catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw new Error("Cloudinary upload failed");
    }
}

export const checkAdmin = async (req, res, next) => {
    res.status(200).json({ admin: true });
}

export const createSong = async (req, res, next) => {
    try{
        if(!req.Files || !req.files.audioFile || !req.files.imageFiles){
            return res.status(400).json({ message: "Please upload all files" });
        }

        const {title, artist, albumId, duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFiles = req.files.imageFiles;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFiles);

        const song = new Song({
            title,
            artist,
            duration,
            audioUrl,
            imageUrl,
            albumId: albumId || null
        })

        await song.save();
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: { songs: song._id }
            })
        }
        res.status(201).json({ message: "Song created successfully" });
    }
    catch(err){
        console.log(err);
        next (error);
    }
}

export const deleteSong = async (req, res, next) => {
    try{
        const { id } = req.params;
        const song = await Song.findByIdAndDelete(id);
        if(!song){
            return res.status(404).json({ message: "Song not found" });
        }
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: { songs: song._id }
            })
        }
        res.status(200).json({ message: "Song deleted successfully" });
    }
    catch(err){
        console.log(err);
        next (error);
    }
}   

export const createAlbum = async (req, res, next) => {
    try{
        if(!req.files || !req.files.imageFile){
            return res.status(400).json({ message: "Please upload all files" });
        }

        const {title, artist, releaseYear} = req.body;
        const imageFile = req.files.imageFile;

        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title,
            artist,
            releaseYear,
            imageUrl
        })

        await album.save();
        res.status(201).json({ message: "Album created successfully" });
    }
    catch(err){
        console.log(err);
        next (error);
    }
}

export const deleteAlbum = async (req, res, next) => {
    try{
        const { id } = req.params;
        await Song.deleteMany({ albumId: id });
        await Album.findByIdAndDelete(id);
        res.status(200).json({ message: "Album deleted successfully" });
    }
    catch(err){
        console.log(err);
        next (error);
    }
}