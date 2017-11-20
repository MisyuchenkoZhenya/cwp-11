const filmRoutes = require('./filmRoutes');
const actorRoutes = require('./actorRoutes');

module.exports = (app) => {
    app.use("/api/films", filmRoutes);
    app.use("/api/actors", actorRoutes);
}