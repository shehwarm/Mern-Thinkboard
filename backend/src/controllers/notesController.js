import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try{
        const notes = await Note.find();
        res.status(200).json(notes);
    }catch(error){
        console.error("Error fetching notes:", error);
        res.status(500).json({message:"Error fetching notes"});
    }
}; 

export async function getNoteById(req,res){
    try{
        const note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json(note);
    }catch(error){
        console.error("Error fetching note:", error);
        res.status(500).json({message:"Error fetching note"});
    }
};

export async function createNote(req,res){
    try{
      const {title, content} = req.body;
      const newNote = new Note({title, content});
      const savedNote = await newNote.save();
      res.status(201).json(savedNote);
    }catch(error){
        console.log("Error creating note:", error);
        res.status(500).json({message:"Error creating note"});
    }
};

export async function updateNote(req,res){
    try{
    const {title, content} = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id,{title,content})
    res.status(200).json(updatedNote);
    }catch(error){
        console.log("Error updating note:", error);
        res.status(500).json({message:"Error updating note"});
    }
};

export async function deleteNote(req,res){
    try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote){
            return res.status(404).json({message:"Note not found"});
        }
        res.status(200).json({message:"Delete notes successfully", deletedNote});
    }catch(error){
        console.log("Error deleting note:", error);
        res.status(500).json({message:"Error deleting note"});
    }
};