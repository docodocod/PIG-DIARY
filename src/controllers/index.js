import express from "express";
const router=express.Router();

export function renderJoin(req, res){
    res.render('join', { title: '회원가입 - NodeTwitter' });
};

export async function renderMain(req, res) {
    res.render("main", {title: "main"});
}