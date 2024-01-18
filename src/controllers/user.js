const User=require("../models/user.js");
const Favorite=require("../models/favorite.js");

exports.follow=async(req, res, next)=>{
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            await user.addFollowing(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

exports.unfollow=async(req, res, next)=>{
    try {
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            await user.removeFollowing(parseInt(req.params.id, 10));
            res.send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};

//맛집 저장하기
exports.favorite=async(req,res,next)=>{
    const {placeName,roadAddressName,addressName,placeUrl,userId,phone,lng,lat}=req.body;
    await Favorite.create({
        placeName,
        roadAddressName,
        addressName,
        phone,
        placeUrl,
        lng,
        lat,
        UserId:userId,
    });
    res.send("success");
}

//맛집 저장한거 불러오기
exports.favoriteList=async(req,res,next)=>{
    const myFavoriteList=await Favorite.findAll({where:{UserId:req.user.id}});
    console.log(myFavoriteList);
    res.send(myFavoriteList);
};

exports.aroundMyList=async(req,res,next)=>{
    const data=await Favorite.findAll({where:{UserId:req.user.id}});
    const lat=req.body.lat;
    const lng=req.body.lng;
    const parsingData=JSON.stringify(data);
    res.render("myFavoriteListMap",{
        Lists:parsingData,
        myPosition_lat:lat,
        myPosition_lng:lng,
    });
};
