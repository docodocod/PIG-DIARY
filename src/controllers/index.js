import express from "express";
const router=express.Router();

export function renderProfile(req, res) {
    res.render('profile', { title: '내 정보 - NodeTwitter' });
};

export function renderJoin(req, res){
    res.render('join', { title: '회원가입 - NodeTwitter' });
};

export async function renderMain(req, res) {
    res.render("main", {title: "main"});
}