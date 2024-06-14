// // const express=require('express');
// // const router=express();
// // const User=require('../models/users.models');
// // const multer=require('multer');

// // // image upload
// // var storage= multer.diskStorage({
// //     destination: function(req,file,cb){
// //         cb(null,'./uploads');

// //     },
// //     filename: function(req,file,cb){
// //         cb(null,file.fieldname+"_"+Date.now()+"_"+file.originalname);
// //     }
// // });

// // var upload=multer({
// //     storage:storage,
// // }).single("image"); 

// // // Insert a User into database

 
// // router.get("/",(req,res)=>{
// //     res.render('index',{title : "Home Page"})
// // })
// // router.get("/add",(req,res)=>{
// //     res.render('add_users',{title : "Add Users"})
// // })

// // router.get("/about",(req,res)=>{
// //     res.render('about',{title: "About Us"})
// // })

// // router.get("/contact",(req,res)=>{
// //     res.render('Contact',{title: "Contact Us"});
// // })

// // router.post('/add',upload,(req,res)=>{
// //     const user=new User({
// //         name:req.body.name,
// //         email:req.body.email,
// //         phone:req.body.phone,
// //         image:req.file.filename,


// //     });
// //     user.save((err)=>{
// //         if(err){
// //             res.json({message: err.message, type : 'danger'});
// //         }
// //         else{
// //             req.session.message={
// //                 type:'success',
// //                 message:'User added Successfully !'
// //             };
// //             res.redirect('/');
// //         }
// //     });
// // });
// // module.exports=router

// const express = require('express');
// const router = express.Router();
// const User = require('../models/users.models');
// const multer = require('multer');
// const path = require('path');

// // Image upload
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
//     }
// });

// var upload = multer({
//     storage: storage,
// }).single("image");

// // Routes
// router.get("/", (req, res) => {
//     res.render('index', { title: "Home Page" });
// });

// router.get("/add", (req, res) => {
//     res.render('add_users', { title: "Add Users" });
// });

// router.get("/about", (req, res) => {
//     res.render('about', { title: "About Us" });
// });

// router.get("/contact", (req, res) => {
//     res.render('contact', { title: "Contact Us" });
// });

// router.post('/add', upload, async (req, res) => {
//     const user = new User({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         image: req.file.filename,
//     });

//     try {
//         await user.save();
//         req.session.message = {
//             type: 'success',
//             message: 'User added successfully!'
//         };
//         res.redirect('/');
//     } catch (err) {
//         res.json({ message: err.message, type: 'danger' });
//     }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const User = require('../models/users.models');
const multer = require('multer');
const path = require('path');
const fs=require('fs');

// Image upload configuration
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
}).single("image");

// GET route for rendering home page with users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().exec(); // Use exec() to return a promise
        res.render('index', {
            title: 'Home Page',
            users: users,
            message: req.session.message // Pass session message if needed
        });
        req.session.message = null; // Clear the message after displaying
    } catch (err) {
        res.json({ message: err.message }); // Handle error appropriately
    }
});

// GET route for rendering add user form
router.get("/add", (req, res) => {
    res.render('add_users', { title: "Add Users", message: req.session.message });
    req.session.message = null; // Clear the message after displaying
});

// GET route for rendering about page
router.get("/about", (req, res) => {
    res.render('about', { title: "About Us", message: req.session.message });
    req.session.message = null; // Clear the message after displaying
});

// GET route for rendering contact page
router.get("/contact", (req, res) => {
    res.render('contact', { title: "Contact Us", message: req.session.message });
    req.session.message = null; // Clear the message after displaying
});

// POST route for adding a new user
router.post('/add', upload, async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename,
    });

    try {
        await user.save();
        req.session.message = {
            type: 'success',
            message: 'User added successfully!'
        };
        res.redirect('/');
    } catch (err) {
        req.session.message = {
            type: 'danger',
            message: err.message
        };
        res.redirect('/add');
    }
});

// edit an user route
router.get('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findById(id);
        
        if (user === null) {
            res.redirect('/');
        } else {
            res.render('edit_user', { title: "Edit User", user: user });
        }
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});


// update user route

router.post('/update/:id', upload, async (req, res) => {
    const id = req.params.id;
    let new_image = '';

    try {
        let user = await User.findById(id);

        if (!user) {
            return res.redirect('/');
        }

        if (req.file) {
            // Delete old image if new image uploaded
            try {
                fs.unlinkSync('./uploads/' + req.body.old_image);
            } catch (err) {
                console.error(err);
            }
            new_image = req.file.filename;
        } else {
            new_image = req.body.old_image;
        }

        // Update user fields
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.image = new_image;

        await user.save();
        
        req.session.message = {
            type: 'success',
            message: 'User updated successfully!'
        };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.session.message = {
            type: 'danger',
            message: err.message
        };
        res.redirect('/');
    }
});


// delete user route

router.get('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.redirect('/');
        }

        // Delete user's image file if it exists
        if (user.image && user.image.trim() !== '') {
            try {
                fs.unlinkSync('./uploads/' + user.image);
            } catch (err) {
                console.error(err);
            }
        }

        await User.findByIdAndDelete(id);

        req.session.message = {
            type: 'info',
            message: 'User deleted successfully!'
        };
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.session.message = {
            type: 'danger',
            message: err.message
        };
        res.redirect('/');
    }
});

module.exports = router;
