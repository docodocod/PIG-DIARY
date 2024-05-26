const User=require("../models/user.js");
const Favorite=require("../models/favorite.js");

//팔로우
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

//팔로우 해제
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

//맛집 리스트 제거
exports.removeFavorite=async(req,res,next)=>{
    await Favorite.destroy({
        where:{id:req.body.favoriteId}
    });
    res.send("success");
};

//저장한 맛집 리스트 불러오기
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

exports.getMyProfile=async(req,res,next)=>{
    res.render("myProfile");
}

//한줄 자기 소개
exports.introduce=async(req,res,next)=> {
    try {
        const description = req.body.introduce;
        await User.update({introduce: description}, {where:{id:req.user.id}});
        res.send("success");
    } catch (err) {
        console.log(err)
    }
}

//닉네임 변경
exports.changeNick=async(req,res,next)=>{
    try{
        const changeNick=req.body.nick;
        console.log(changeNick);
        await User.update(
            {nick:changeNick},
            {where:{id:req.user.id}}
        );
        res.send("success");
    }catch(err){
        console.log(err);
        res.send("fail");
    }
}
//프로필 변경 이미지 미리보기
exports.previewMyImg=async(req,res,next)=>{
    console.log("files:"+req.file[0]);
    console.log("파일 이름 : ", req.file.filename);
    res.json(req.file.filename);
}

//프로필 이미지 저장
exports.saveProfileImg=async(req,res,next)=>{
    try {
        const changeImg = req.body.img;
        await User.update({profileImg: changeImg}, {where: {id:req.user.id}});
        res.send("success");
    }catch(err){
        console.log(err);
        res.send("fail");
    }
}
