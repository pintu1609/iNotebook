const express=require("express");
const Note=require('../models/Notes')
const router=express.Router();
const fetchuser=require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator')



// route 1 get all the notes details using GET "/api/auth/getuser". login required

    

router.get('/fetchallnotes', fetchuser, async(req, res)=>{

    try {
    const notes= await Note.find({user:req.user.id})
    res.json(notes)
} catch (error) {
    
    
    console.error(error.message);
    res.status(500).send("some error occours")
}
})

// route 2 add a new notes details using POST "/api/notes/add notes". login required
router.post('/addnote', fetchuser,[
    body('title','Please Enter valid Title').isLength({min:3}),
    body('description','Description must be alteast 5 character ').isLength({min:5}),


], async(req, res)=>{

    try {
        
   

    const{title, description,tag}=req.body;
    //if there is error, return bad request and the error  

    const errors=validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});

    }
    const note=new Note({
         title, description, tag, user:req.user.id
    })
    const savedNote=await note.save()
    res.json(savedNote);
} catch (error) {
        
     console.error(error.message);
     res.status(500).send("some error occours")
}
})


// route 3 update notes details using POST "/api/notes/add notes". login required


router.put('/updatenote/:id', fetchuser, async(req, res)=>{

const{title, description, tag}=req.body;
try {
    


// create a new notes object:

const newNote={};
if(title){newNote.title=title};
if(description){newNote.description=description};
if(tag){newNote.tag=tag};


// find the notes to be updated


let note = await Note.findById(req.params.id);

if(!note){ return res.status(404).send("not found")}


if(note.user.toString() !== req.user.id){
    return res.status(401).json("not allowed")
}


 note=await Note.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true})
res.json({note});

} catch (error) {

    console.error(error.message);
     res.status(500).send("some error occours")
    
}

})


// route 4 delete notes details using DELETE "/api/notes/deletenote". login required


router.delete('/deletenote/:id', fetchuser, async(req, res)=>{
    
    
    try {
        
   
    // find the notes to be delete and delete it

    
    let note = await Note.findById(req.params.id);
    
    if(!note){ return res.status(404).send("not found")}
    
    //allow deletion only if user owns this Note
    if(note.user.toString() !== req.user.id){
        return res.status(401).json("not allowed")
    }
    
    
     note=await Note.findByIdAndDelete(req.params.id)
    res.json({"Success": "note has been deleted", note:note});
    

} catch (error) {

    console.error(error.message);
     res.status(500).send("some error occours")
        
}

    })
    


module.exports=router