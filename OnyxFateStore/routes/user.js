"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
router.get('/', (req, res) => {
    res.send("respond with a resource");
});
router.get('/history', (req, res) => {
    //profile.pug -> history.pug
    //Don't need to check if logged
    //Browse User transaction history and if have income+
});
router.get('/profile', (req, res) => {
    //Check if logged - render profile.pug
    //if not - send to BRAZIL
    res.send('Profile page');
});
exports.default = router;
//# sourceMappingURL=user.js.map