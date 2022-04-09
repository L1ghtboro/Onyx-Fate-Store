"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const targetBaseUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=4s";
router.get('/login', (req, res) => {
    res.redirect('../viewes/login.pug');
});
exports.default = router;
//# sourceMappingURL=login.js.map