const express = require("express");

const router = express.Router();

const Profile = require("../../models/Profile");

const passport = require("passport");

router.get("/test",(req,res) => {
    res.json({msg:"你好啊!"})
})
//创建朋友圈信息接口
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profilesFields = {}
    if (req.body.img) profilesFields.img = req.body.img;
    if (req.body.name) profilesFields.name = req.body.name;
    if (req.body.text) profilesFields.text = req.body.text;

    //处理多张图片'img1|img2'
    if (req.body.imgs) {
        profilesFields.imgs = req.body.imgs.split("|");
    }

    //存储数据
    new Profile(profilesFields).save()
        .then(profile => {
            res.json(profile)
        })
})
//下拉刷新
router.get("/latest",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.find()
        .sort({date: -1})
        .then(profile => {
            if (!profile) {
                res.status(200).json({msg: "没有任何数据!"});
            } else {
                // res.json(profile);
                let newProfiles = [];
                for (let i = 0; i < 4; i++) {
                    if (profile[i] != null) {
                        newProfiles.push(profile[i]);
                    }
                }
                res.json(newProfiles);
            }
        })
})

//上拉加载  GET api/profiles/:page/:size
router.get("/:page/:size",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.find()
        .sort({date:-1})
        .then(profiles => {
            if (!profiles) {
                res.status(200).json({msg:"没有任何数据!"})
            } else {
                let size = req.params.size;
                let page = req.params.page;
                let index = size * (page - 1);
                let newProfiles = [];
                for (let i = index;i < size * page; i++) {
                    if (profiles[i] != null) {
                        newProfiles.unshift(profiles[i]);
                    }
                }
                res.json(newProfiles);
            }
        })
})

module.exports = router;