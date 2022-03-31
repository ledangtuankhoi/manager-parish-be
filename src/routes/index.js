import homeRoute from "./homeRoute.js";
import authRoute from "./authRoute.js";
import personRoute from "./personRoute.js";
import holyNameRoute from "./holyNameRoute.js";
import { login, register } from "../app/controllers/authController.js";
import { Router } from "express";
const router = Router()

export default function (app) {
    app.use('/api/login',login);
    app.use('/api/register',register);
    app.use('/api/auth',authRoute);
    app.use('/api/person',personRoute);
    app.use('/api/holy-name',holyNameRoute);
    app.get('/api/test-handlebars',(req, res, next) => {
        res.render('test/index')
    });
    app.post('/acc',(req, res, next) => {
        res.json({user:req.body})
    });
    
    app.use("/", homeRoute);
};
