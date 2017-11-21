const filmRoutes = require('./api/films');
const actorRoutes = require('./api/actors');
const express = require('express');

module.exports = (app) => {
    app.use("/api/films", filmRoutes);
    app.use("/api/actors", actorRoutes);
    app.use("/images/actors", express.static("public/images/actors", { redirect: "/images/error" }));
    app.use("/images/*", express.static("public/images/error/notFound.gif"));
}