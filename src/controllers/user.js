const User=require("../models/user.js");
const Favorite=require("../models/favorite.js");

exports.myProfileImg=(req, res)=>{ //이미지 업로드
    console.log(req.file);
    res.json({ myImg: `/img/${req.file.filename}` });
};

exports.myProfileImgEdit=async(req,res)=>{
    const editMyImg=req.body.myImg;
    console.log(req.file);
    await User.update({myImg:editMyImg},{where:{id:req.user.id}});
    console.log("프로필 이미지 수정 완료");
    res.direct("/");
}

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
exports.addFavorite=async(req,res,next)=>{
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

exports.removeFavorite=async(req,res,next)=>{
    const favoriteId=req.body.favoriteId;
    await Favorite.destroy({
        where:{id:favoriteId}
    });
    res.send("success");
};

//맛집 저장한거 불러오기
exports.favoriteList=async(req,res,next)=>{
    const myFavoriteList=await Favorite.findAll({where:{UserId:req.user.id}});
    res.send(myFavoriteList);
};

//맛집 리스트 추가
exports.aroundMyList=async(req,res,next)=>{
    const data=await Favorite.findAll({where:{UserId:req.user.id}});
    const userId=req.user.id;
    const lat=req.body.lat;
    const lng=req.body.lng;
    const parsingData=JSON.stringify(data);
    res.render("myFavoriteListMap",{
        Lists:parsingData,
        myPosition_lat:lat,
        myPosition_lng:lng,
        userId:userId,
    });
};
