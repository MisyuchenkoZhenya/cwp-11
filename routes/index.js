const filmRoutes = require('./api/films');
const actorRoutes = require('./api/actors');

module.exports = (app) => {
    app.use("/api/films", filmRoutes);
    app.use("/api/actors", actorRoutes);
}