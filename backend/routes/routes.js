const express = require('express');
const router = express.Router();
require('dotenv').config()
const mongoose = require('mongoose');
const User = mongoose.model('User');
const AllPost = mongoose.model('AllPost');
const b = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UnivPost = mongoose.model('UniversityPost');
const reqLogin = require('../middleware/reqLogin');
const Resources = mongoose.model('Resources');
const UniversityData = mongoose.model('university');
const AdminPosts = mongoose.model('AdminPosts');
const HashtagPost = mongoose.model("hashtagPost");
const HashTagUniv = mongoose.model("hashtagUnivPost");
const AllComment = mongoose.model("AllComments");
const Message = require('../models/Messages');
const Conversation = require('../models/Conversation');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mail = require('./mail');
const Token = require('../models/resetToken');

const trans =  nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:"harshitr2001@gmail.com",
        pass:""
    }
});


router.post("/signup", async(req, res) => {
    console.log(req.body);

    const { email, password, name, university } = req.body;
    if (!email || !password || !name) {
        return res.status(422).json({ error: "Add all the data" });
    }
    User.findOne({ email: email }).then((SavedUser) => {
        if (SavedUser) {
            return res.status(422).json({ error: "User Already Exists" });
        }

        b.hash(password, 8)
            .then(async(hashedpassword) => {
                const user = new User({
                    email,
                    password: hashedpassword,
                    name,
                    avatar: req.body.avatar,
                    university
                });

                // trans.sendMail({from:"noReply-CollegeDost@gmail.com",
                // to:user.email,subject:"Verify Your Account",text:"Please Verify Your Account"},function(err,res){
                //     if(err){
                //         console.log(err)
                //     }else{
                //         console.log(res)
                //     }
                // })

                // const t = crypto.randomBytes(32).toString('hex');
                // await Token({token:t,email:email}).save();
                // mail.sendVerificationEmail(email,t);


        
                 user.save()
                    .then(user => {
                        res.json({ message: "saved" })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err);
            })
    })
});


router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ message: "Please add email and password both" })
    }
    await User.findOne({ email: email })
        .then(SavedUser => {
            if (!SavedUser) {
                return res.status(201).send({ error: 'Invalid email or password' });
            }
            // console.log(SavedUser);
            b.compare(password, SavedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: SavedUser._id }, "CollegeDostJS")
                        console.log(token);

                        const { _id, name, email, university, avatar, isAdmin ,confirmed} = SavedUser;
                        return res.status(201).json({ token, user: { _id, name, email, university, avatar, isAdmin,confirmed } });
                    } else {
                        console.log("Fake");
                        return res.status(201).send({ error: 'Invalid email or password' })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});


router.post("/createglobalpost", reqLogin, async (req, res) => {
    const { body } = req.body;
    const data = req.body;
    if (!body) {
        res.status(422).json({ error: "Kuch toh daldo" });
    }

    console.log("Data :" + req.body)
    const post = new AllPost({
        body: req.body.body,
        postedBy: req.user._id,
        hashtag: req.body.hashtag,
        photo: req.body.pic ? req.body.pic : ""
    });


    await post.save().then(async (result) => {
        console.log(result)
        if (result.hashtag) {
            for (var i = 0; i < req.body.hashtag.length; i++) {
                console.log(req.body.hashtag[i]);
                const findHashtag = await HashtagPost.findOneAndUpdate({ hashTagtext: req.body.hashtag[i] }, {
                    $inc: {
                        postCounts: 1
                    }
                });
                if (!findHashtag) {
                    const hashtag = await new HashtagPost({
                        hashTagtext: req.body.hashtag[i].toString(),
                    });
                    await hashtag.save().then((resd) => {

                        console.log(hashtag);
                    })
                } else {
                    console.log("Else Block");
                }
            }
        }
        res.json({ post: result })
        console.log("Successfully posted" + result);
    })
        .catch(err => {
            console.log(err);
        })
});



router.post("/createuniversitypost", reqLogin, async (req, res) => {
    const { body } = req.body;
    if (!body) {
        res.status(422).json({ error: "Kuch toh daldo" });
    }
    const post = new UnivPost({
        body: req.body.body,
        university: req.user.university,
        postedBy: req.user._id,
        hashtag: req.body.hashtag,
        photo: req.body.pic ? req.body.pic : ""
    });

    await post.save().then(async (result) => {
        console.log(result)
        if (result.hashtag) {
            for (var i = 0; i < req.body.hashtag.length; i++) {
                console.log(req.body.hashtag[i]);
                const findHashtag = await HashTagUniv.findOneAndUpdate({ hashTagtext: req.body.hashtag[i] }, {
                    $inc: {
                        postCounts: 1
                    },
                    universityName: req.user.university
                });
                if (!findHashtag) {
                    const hashtag = await new HashTagUniv({
                        hashTagtext: req.body.hashtag[i].toString(),
                        universityName: req.user.university

                    });
                    await hashtag.save().then((resd) => {

                        console.log(hashtag);
                    })
                } else {
                    console.log("Else Block");
                }
            }
        }

        res.json({ post: result })
        console.log("Successfully posted" + result);
    })
        .catch(err => {
            console.log(err);
        })
});



router.get('/globalposts', async(req, res) => {
    await AllPost.find()
        .sort('-createdAt')
        .populate("postedBy","email name university avatar _id")
        .populate("comments.commentedBy","name email _id avatar")
        .then(posts => {
            res.json({ posts })
            // console.log(posts)
        })
        .catch((err) => {
            console.log(err)
        })
});


router.get('/universityPosts', reqLogin, async(req, res) => {
   await UnivPost.find({ university: req.user.university })
        .sort('-createdAt')
        .populate("postedBy","email name university avatar _id")
        .populate("comments.commentedBy","email name university avatar _id")
        .then(post => {
            res.json({ post })
        })
        .catch(err => {
            console.log(err);
        })
});



router.put('/mainlike', reqLogin, (req, res) => {
    console.log(req.body.postId)
    AllPost.findByIdAndUpdate(req.body.postId, {
        $push: {
            likes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        console.log(s)
        res.status(201).json(s)
    })
});

router.post('/addUniversity', (req, res) => {
    const newUniv = new UniversityData({
        universityName: req.body.universityName,
        universityAddress: req.body.universityAddress
    });

    newUniv.save().then((resd) => {
        res.json(resd);
    }).catch((e) => {
        res.json(e);
    })
});

router.post('/getUserDetails', (req, res) => {
    console.log(req.body.id);
    const _id = req.body.id;
    User.findById({ _id }).then(result => {
        res.json(result);
        console.log(result);
    })
});



router.put('/takebackmainlike', reqLogin, async(req, res) => {
    console.log(req.body.id)
   await AllPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            likes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        console.log(s)
        res.status(201).json(s)
    })
        // .populate("comments.postedBy", "_id name")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result);
        //         console.log(result);
        //     }
        // })
});


router.put('/maindislike', reqLogin, async(req, res) => {
    console.log(req.body.id)
    await AllPost.findByIdAndUpdate(req.body.id, {
        $push: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        res.status(201).json(s)
    })
        // .populate("postedBy", "_id name avatar")
        // .populate("comments.postedBy", "_id name")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result);
        //         console.log(result)
        //     }
        // })
});

router.put('/univdislike', reqLogin, (req, res) => {
    console.log(req.body.postId)
    UnivPost.findByIdAndUpdate(req.body.id, {
        $push: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        res.status(201).json(s)
    })
        // .populate("postedBy", "_id name avatar")
        // .populate("comments.postedBy", "_id name")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result);
        //         console.log(result)
        //     }
        // })
});


router.put('/takebackmaindislike', reqLogin, async(req, res) => {
    await AllPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        res.status(201).json(s)
    })
        // .populate("postedBy", "_id name pic ")
        // .populate("comments.postedBy", "_id name")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result);
        //     }
        // })
});

router.put('/takebackunivdislike', reqLogin, async(req, res) => {
   await UnivPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            dislikes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        res.status(201).json(s)
    })
        // .populate("postedBy", "_id name pic ")
        // .populate("comments.postedBy", "_id name")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result);
        //     }
        // })
});


router.put('/takebackunivlike', reqLogin, async(req, res) => {
   await UnivPost.findByIdAndUpdate(req.body.id, {
        $pull: {
            likes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        res.status(201).json(s)
    })
        // .populate("postedBy", "_id name pic ")
        // .populate("comments.postedBy", "_id name")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result)
        //     }
        // })
});

router.put('/univlike', reqLogin, async(req, res) => {
    await UnivPost.findByIdAndUpdate(req.body.postId, {
        $push: {
            likes: req.user._id
        }
    }, {
        new: true
    })
    .populate("postedBy", "name _id avatar").then((s)=>{
        res.status(201).json(s)
    })
        // .populate("postedBy", "_id name pic")
        // .populate("comments.postedBy", "_id name")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result)
        //     }
        // })
});


router.put('/maincomment', reqLogin, async(req, res) => {

    // const commentData={
    //     commentedBy:req.user._id,
    //     postId:req.body.postId,
    //     commentedText:req.body.commentedText
    // };

    const comment = {
        text: req.body.text,
        commentedBy: req.user._id
    }



        console.log("dh");
        await AllPost.findByIdAndUpdate(req.body.postId, {
            $push: {
                comments: comment
            },
            hasBeenCommented: true
        }, {
            new: true
        })
        .populate("postedBy", "name _id avatar").then((sd)=>{
            console.log(sd)
            res.status(201).json(sd)
        });
    // const comment = {
    //     text: req.body.text,
    //     commentedBy: req.user
    // }
 
        // .populate("postedBy", "_id name photo")
        // .exec((err, result) => {
        //     if (err) {
        //         res.status(422).json({ error: err })
        //     } else {
        //         res.json(result)
        //         console.log(result)
        //     }
        // })
});


router.get('/getUnivs', async (req, res) => {
    const getUni = await UniversityData.find({});
    if (getUni) {
        res.status(201).json(getUni);
    }
});


router.put('/univcomment', reqLogin, async(req, res) => {

    const comment = {
        text: req.body.text,
        commentedBy: req.user._id
    }



        await UnivPost.findByIdAndUpdate(req.body.postId, {
            $push: {
                comments: comment
            },
            hasBeenCommented: true
        }, {
            new: true
        })
        .populate("postedBy", "name _id avatar").then((sd)=>{
            res.status(201).json(sd)
        })
});


router.delete('/maindelete/:postId', reqLogin,(req, res) => {
    AllPost.findOne({
        _id: req.params.postId
    })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                res.status(422).json({ error: err })
            } else {
                if (post.postedBy._id.toString() === req.user._id.toString()) {
                    post.remove()
                        .then(result => {
                            res.status(200).json(result)
                        }).catch((err) => {
                            console.log(err)
                        })
                }
            }
        })
});


// router.put('/univcomment', reqLogin, (req, res) => {
//     const comment = {
//         text: req.body.text,
//         postedBy: req.user._id
//     }
//     UnivPost.findByIdAndUpdate(req.body.postId, {
//         $push: {
//             comments: comment
//         }
//     }, {
//         new: true
//     })
//         .populate("comments.postedBy", "_id name")
//         .populate("postedBy", "_id name pic")
//         .exec((err, result) => {
//             if (err) {
//                 res.status(422).json({ error: err })
//             } else {
//                 res.json(result)
//             }
//         })
// });

// router.put('/replyToComment', reqLogin, (req, res) => {

// });



router.delete('/univdelete/:postId', reqLogin, (req, res) => {
    UnivPost.findOne({
        _id: req.params.postId
    })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                res.status(422).json({ error: err })
            } else {
                if (post.postedBy._id.toString() === req.user._id.toString()) {
                    post.remove()
                        .then(result => {
                            res.status(200).json(result)
                        }).catch((err) => {
                            console.log(err)
                        })
                }
            }
        })
});


router.post('/searchResources', reqLogin, async (req, res) => {

});

router.get('/resources', reqLogin, (req, res) => {
    Resources.find({ resourceUniversityName: req.user.university })
    .populate("resourceUploaderName","name")
        .then(resources => {
            res.json({ resources });
        })
});


router.post('/addResources', reqLogin, async (req, res) => {
    const { resourcesname, resourceUrl } = req.body;
    if (!resourcesname || !resourceUrl) {
        res.status(422).json({ error: "Resources Kidhar Hai ??" });
    }
    const resource = new Resources({
        resourcesname,
        resourceUniversityName: req.user.university,
        resourceUrl,
        resourceUploaderName: req.user._id,
    });

    await resource.save().then(result => {
        res.status(201).json({ resource: result })
        console.log(result);
    })
        .catch(err => {
            console.log(err);
        })
});



router.get('/getResources', reqLogin, (req, res) => {
    Resources.find({ resourceUniversityName: req.user.university })
    .populate("resourceUploaderName","name")
        .sort("-createdAt")
        .then(Recentresources => {
            res.json({ Recentresources });
        })
});


router.post('/getSearched', reqLogin, async (req, res) => {
    let resourcePattern = new RegExp("^" + req.body.query)
    await Resources.find({ resourcesname: { $regex: resourcePattern } })
    .populate("resourceUploaderName","name")
        .then(resources => {
            res.json(resources)
            console.log(resources)
        }).catch((e) => {
            console.log(e);
        });
});


router.post('/addPostToAdmin', reqLogin, async (req, res) => {
    console.log(req.body.id);
    const reportedPost = await AllPost.findById(req.body.id);
    if (reportedPost) {
        const adminPost = new AdminPosts({
            postId: reportedPost._id,
            body: reportedPost.body,
            photo: reportedPost.photo,
            postedBy: reportedPost.postedBy
        });
        await adminPost.save().then(p => {
            res.status(201).json(p);
        });
    }
});




router.post('/addUnivPostToAdmin', reqLogin, async (req, res) => {
    console.log(req.body.id);
    const reportedPost = await UnivPost.findById(req.body.id);
    if (reportedPost) {
        const adminPost = new AdminPosts({
            postId: reportedPost._id,
            body: reportedPost.body,
            photo: reportedPost.photo,
            postedBy: reportedPost.postedBy,
            university: true
        });
        await adminPost.save().then(p => {
            res.status(201).json(p);
        });
    }
});

router.post('/getUserAdmin', async (req, res) => {
    let resourcePattern = new RegExp("^" + req.body.user)
    await User.find({ name: { $regex: resourcePattern } })
        .then(resources => {
            res.json(resources)
            console.log(resources)
        }).catch((e) => {
            console.log(e);
        });
})


router.get('/getAdminPosts', async (req, res) => {
    console.log("qbvjbew");
    const posts = await AdminPosts.find({});
    if (posts) {
        res.status(201).json(posts);
        console.log(posts);
    } else {
        res.status(200).json("No Posts");
        console.log("No Posts");
    }
});


router.get('/topHashtags', reqLogin, async (req, res) => {
    const hashtags = await HashtagPost.find({})
        .sort("-postCounts")
        .limit(5)


    if (hashtags) {
        res.status(201).json(hashtags);
    }
});

router.get('/topHashtagsUniv', reqLogin, async (req, res) => {
    const hashtags = await HashTagUniv.find({ universityName: req.user.university })
        .sort("-postCounts")
        .limit(5)


    if (hashtags) {
        res.status(201).json(hashtags);
    }
});

router.post('/getHashtags', reqLogin, async (req, res) => {
    const getHashtagPost = await AllPost.find({ hashtag: req.body.hashtag })
    .sort('-createdAt')
    .populate("postedBy","email name university avatar _id")
    .populate("comments.commentedBy","name email _id avatar")
    if (getHashtagPost) {
        console.log(getHashtagPost);
        res.json(getHashtagPost);
    }
});


router.post('/getHashtagsPosts', reqLogin, async (req, res) => {
    const getHashtagPost = await UnivPost.find({ $and: [{ hashtag: req.body.hashtag }, { university: req.user.university }] })
    .sort('-createdAt')
    .populate("postedBy","email name university avatar _id")
    .populate("comments.commentedBy","name email _id avatar")
    if (getHashtagPost) {
        console.log(getHashtagPost);
        res.status(201).json(getHashtagPost);
    }
});


router.get('/getUserPost', reqLogin, async (req, res) => {
    // const pd =  await AllPost.find({req.body.us:pos}
    const pd = await AllPost.find({ postedBy: req.user })
    .sort('-createdAt')
    .populate("postedBy","email name university avatar _id")
    .populate("comments.commentedBy","name email _id avatar")
    if (pd) {
        res.status(201).json(pd);
        console.log(pd);
    }
});


router.get('/getUnivUserPost', reqLogin, async (req, res) => {
    const pd = await UnivPost.find({ postedBy: req.user })
    .sort('-createdAt')
    .populate("postedBy","email name university avatar _id")
    .populate("comments.commentedBy","name email _id avatar")
    if (pd) {
        res.status(201).json(pd);
        console.log(pd);
    }
});

router.get('/getRecentResources', reqLogin, async (req, res) => {
    const resourceLatest = await Resources.find({ resourceUniversityName: req.user.university })
    .populate("resourceUploaderName","name")
        .sort("-createdAt")
        .limit(5)

    if (resourceLatest) {
        res.status(201).json(resourceLatest);
    }
});


router.get('/getRecentPosts', reqLogin, async (req, res) => {
    const recentPosts = await AllPost.find({})
        .sort("-createdAt")
        .populate("postedBy","email name university avatar _id")
        .limit(5)

    if (recentPosts) {
        res.status(201).json(recentPosts)
    }
});



router.get('/getRecentUnivPosts', reqLogin, async (req, res) => {
    const recentPosts = await UnivPost.find({ university: req.user.university })
    .populate("postedBy","email name university avatar _id")
        .sort("-createdAt");

    if (recentPosts) {
        res.status(201).json(recentPosts);
    }
});


router.delete('/deletePost/:id', reqLogin, async (req, res) => {
    console.log("qbhvfjef");
    const getPost = await AllPost.findOne({ _id: req.params.id });

    // if(getPost){
    //     const hashtag = getPost.body.match(/#\w+/g);
    //    const docHash = await HashtagPost.findOneAndUpdate({hashTagtext:hashtag},{
    //        $inc:{
    //         postCounts:-1
    //        }
    //    },{new:true}).then(async(p)=>{
    //        if(p.postCounts===0){
    //            await HashtagPost.findByIdAndDelete(p._id).then((s)=>{
    //                console.log("Hashtag Deleted")
    //            })
    //        }
    //    });
    // }
    if (getPost && getPost.postedBy._id.toString() === req.user._id.toString()) {
        await getPost.remove()
            .then((result) => {
                res.status(201).json(result)
                console.log(result);
            }).catch((err) => {
                console.log(err)
            });
    }
});


router.delete('/deleteAdminPost/:id', reqLogin, async (req, res) => {
    console.log("qbhvfjef");
    const getPost = await AllPost.findOne({ _id: req.params.id });
    const adminPost = await AdminPosts.findOne({ postId: req.params.id });
    console.log(getPost);



    if (getPost || adminPost) {

        // const hashtag = getPost.body.match(/#\w+/g);
        // const docHash = await HashtagPost.findOneAndUpdate({hashTagtext:hashtag},{
        //     $inc:{
        //      postCounts:-1
        //     }
        // },{new:true}).then(async(p)=>{
        //     if(p.postCounts===0){
        //         await HashtagPost.findByIdAndDelete(p._id).then((s)=>{
        //             console.log("Hashtag Deleted")
        //         })
        //     }
        // });

        getPost.remove()
            .then(async (result) => {
                await adminPost.remove()
                res.status(201).json(result);
                console.log("Removed");
            }).catch((err) => {
                console.log(err)
            })
    }
});

router.delete('/deleteAdminUnivPost/:id', reqLogin, async (req, res) => {
    const getPost = await UnivPost.findOne({ _id: req.params.id });
    const adminPost = await AdminPosts.findOne({ postId: req.params.id });

    if (getPost || adminPost) {

        // const hashtag = getPost.body.match(/#\w+/g);
        // const docHash = await HashtagPost.findOneAndUpdate({hashTagtext:hashtag},{
        //     $inc:{
        //      postCounts:-1
        //     }
        // },{new:true}).then(async(p)=>{
        //     if(p.postCounts===0){
        //         await HashtagPost.findByIdAndDelete(p._id).then((s)=>{
        //             console.log("Hashtag Deleted")
        //         })
        //     }
        // });


        getPost.remove()
            .then(async (result) => {
                await adminPost.remove()
                res.status(201).json(result);
                console.log("Removed");
            }).catch((err) => {
                console.log(err)
            })
    }
});





router.delete('/deleteUnivPost/:id', reqLogin, async (req, res) => {
    const getPost = await UnivPost.findOne({ _id: req.params.id });

    if (getPost && getPost.postedBy._id.toString() === req.user._id.toString()) {

        // const hashtag = getPost.body.match(/#\w+/g);
        // const docHash = await HashtagPost.findOneAndUpdate({hashTagtext:hashtag},{
        //     $inc:{
        //      postCounts:-1
        //     }
        // },{new:true}).then(async(p)=>{
        //     if(p.postCounts===0){
        //         await HashtagPost.findByIdAndDelete(p._id).then((s)=>{
        //             console.log("Hashtag Deleted")
        //         })
        //     }
        // });


        getPost.remove()
            .then(result => {
                res.status(201).json(result)
                console.log(result);
            }).catch((err) => {
                console.log(err)
            })
    }
});


router.get('/getUserDetailsById/:id', reqLogin, async (req, res) => {
    const getDetails = await User.findById(req.params.id);
    console.log(getDetails);
    if (getDetails) {
        res.status(201).json(getDetails);
    }
});


router.get('/getUnivUserPostById/:id', reqLogin, async (req, res) => {
    const getDetails = await User.findById(req.params.id);
    const getPosts = await UnivPost.find({ postedBy: getDetails })
    .sort('-createdAt')
    .populate("postedBy","email name university avatar _id")
    .populate("comments.commentedBy","name email _id avatar")

    if (getPosts) {
        res.status(201).json(getPosts);
    }
});



router.get('/getUserPostById/:id', reqLogin, async (req, res) => {
    const getDetails = await User.findById(req.params.id);
    const getPosts = await AllPost.find({ postedBy: getDetails })
    .sort('-createdAt')
    .populate("postedBy","email name university avatar _id")
    .populate("comments.commentedBy","name email _id avatar")

    if (getPosts) {
        res.status(201).json(getPosts);
    }
});

// router.post('/blockUser', reqLogin, async (req, res) => {
//     User.findByIdAndUpdate(req.body.blockingId, {
//         $push: {
//             blockedBy: req.user._id
//         },

//     }, { new: true }, (err, result) => {
//         if (err) {
//             res.status(422).json({ error: err })
//         } else {
//             User.findByIdAndUpdate(req.user._id, {
//                 $push: {
//                     blockedTo: req.body.blockingId
//                 }
//             }, {
//                 new: true
//             }).then((result) => {
//                 res.status(201).json(result)
//             }).catch((e) => {
//                 return res.status(422).json({ error: e })
//             })
//         }
//     });
// });

// router.get('/getBlockUsers', reqLogin, async (req, res) => {
//     await User.findById(req.user._id)
//         .populate("blockedTo", "name avatar").then((result) => {
//             res.json(result.blockedTo);
//         })
// });


// router.post('/unblockUser', reqLogin, async (req, res) => {
//     User.findByIdAndUpdate(req.body.blockingId, {
//         $pull: {
//             blockedBy: req.user._id
//         },

//     }, { new: true }, (err, result) => {
//         if (err) {
//             res.status(422).json({ error: err })
//         } else {
//             User.findByIdAndUpdate(req.user._id, {
//                 $pull: {
//                     blockedTo: req.body.blockingId
//                 }
//             }, {
//                 new: true
//             }).then((result) => {
//                 res.status(201).json(result)
//             }).catch((e) => {
//                 return res.status(422).json({ error: e })
//             })
//         }
//     });
// });

router.post('/searchuser', async (req, res) => {
    console.log(req.body);
    console.log("xd");
    let userPattern = new RegExp("^" + req.body.query)
    await User.find({ name: { $regex: userPattern } })
        .then(user => {
            res.json({ user });
            console.log(user);
        }).catch((e) => {
            console.log(e)
        })
});

router.post('/deleteUser', async (req, res) => {
    console.log("qbhvfjef");
    const getPost = await User.findOne({ _id: req.body.query });
    console.log(getPost);

    if (getPost) {
        getPost.remove()
            .then((result) => {
                res.status(201).json(result);
                console.log("Removed");
            }).catch((err) => {
                console.log(err)
            })
    }
});



router.post('/addMessage/:id', reqLogin, async (req, res) => {

    const ifExist = await Messg.find({ $and: { $in: { members: req.user._id }, $in: { members: req.params.id } } });

    if (ifExist) {
        const { _id } = ifExist;
        await Messg.findByIdAndUpdate(_id, {
            $push: {
                message: {
                    sentBy: req.user._id,
                    text: req.body.text,
                    sentAt: req.body.date
                }
            }
        })
    }

    else {

        const addingMessage = await Messg({
            $push: {
                members: req.user._id
            },
            $push: {
                members: req.params.id
            },
            $push: {
                message: {
                    sentBy: req.user._id,
                    text: req.body.text,
                    sentAt: req.body.date
                }
            }
        });

        await addingMessage.save().then((p) => {
            res.status(201).json("Message Sent")
        })
    }
});

// router.get('/getMessage/:id',reqLogin,async(req,res)=>{
//     try{
//     const thisMessages = await Messg.find({$and:{$in:{members:req.user._id},$in:{members:req.params.id}}});
//     if(thisMessages){
//         res.status(201).json(thisMessages);
//     }
// }catch(e){
//     res.status(401).json(e);
// }
// });

router.put('/deleteAllComment',reqLogin,async(req,res)=>{
    if(req.user.isAdmin){
    const pst = await AllPost.findByIdAndUpdate(req.body.postId,{
        $pull:{
            postComments:req.body.commentId
        }
    });

    if(pst){
        console.log("Comment Deleted");
    }
}
});


router.put('/deleteUnivComment',reqLogin,async(req,res)=>{
    if(req.user.isAdmin){
    const pst = await UnivPost.findByIdAndUpdate(req.body.postId,{
        $pull:{
            postComments:req.body.commentId
        }
    });

    if(pst){
        console.log("Comment Deleted");
    }
}
});


router.get('/getUserChats',reqLogin,async(req,res)=>{
    const UserChat = await User.findById(req.user._id)
    .populate("Chats","name avatar");
    console.log(UserChat);
    res.status(201).json(UserChat.Chats);
});

router.post('/addConversation',async(req,res)=>{
    let senderId = req.body.senderId;
    let receiverId = req.body.receiverId;

    const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId]  }})
    
    if(exist) {
        res.status(200).json('conversation already exists');
        return;
    }
    const newConversation = new Conversation({
        members: [senderId, receiverId]
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        res.status(500).json(error);
    }

});


router.post('/getConversation',async(req,res)=>{
    try {
        // console.log(req.body);
        const conversation = await Conversation.findOne({ members: { $all: [ req.body.sender, req.body.receiver] }});
        console.log(conversation);
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error);
    }
});


router.post('/addMessage',async(req,res)=>{
    const newMessage = new Message(req.body);
    console.log(req.body, newMessage)
    try {
        await newMessage.save();
        await Conversation.findByIdAndUpdate(req.body.conversationId, { message: req.body.text });
        res.status(200).json("Message has been sent successfully");
    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/getMessage/:id',async(req,res)=>{
    try {
        console.log(req.params.id)
        const messages = await Message.find({ conversationId: req.params.id });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }

});



router.get('/getUsers',async(req,res)=>{
    const users = await User.find({});
    res.status(201).json(users)
});


router.post('/forgotPassword',async(req,res)=>{
    const {email} = req.body;
    try{
        const user = await User.findOne({email});
        console.log(user);
        if(user){
            // const resetToken = user.createResetToken();
            const t = crypto.randomBytes(32).toString('hex');
            await Token({token:t,email:email}).save();

            const passwordLink = `${req.protocol}://${req.get('host')}/resetPassword/${t}`;
            trans.sendMail({
                from:"Email",
                to:email,
                subject:"Reset Password|College Dost",
                text:`Click This Link To Reset Password : <a href=${passwordLink}>Reset Password</a>`,
                html:`<h3>
                Click This Link To Reset Password : <a href=${passwordLink}>Reset Password</a>
                </h3>`
            }).then((s)=>{
                res.status(201).json(s)
            })
        }
    }catch(e){
        res.status(401).json("Error")
    }
});


router.post('/resetPassword/:token',async(req,res)=>{
    const token = req.params.token;
    console.log(token)
    const {password}=req.body;
    console.log(req.body)
    const t = await Token.findOne({token});
    console.log(t);
    if(t){
        console.log("T");
        const user = await User.findOneAndUpdate({email:t.email},{
            password:password
        });
        await Token.findOneAndDelete({token})
    // await user.resetPasswordHandler(password);
    // await user.save();
    res.status(201).json({
        message:"Password Changed Successfully"
    })
}
});


router.get('/user/verifyEmail',async(req,res)=>{
    const token = req.query.token;
    // console.log(token)
    var check = await Token.findOne({token});
    console.log(check)
    if(check){
        const user = await User.findOneAndUpdate({email:check.email},{
            confirmed:true
        });
        await Token.findOneAndDelete({token})
        console.log(user)
        res.status(201).json("Email Verified Successfully");
    }
});


module.exports = router;