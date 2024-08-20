const app = require('./app');
const sequelize = require('./utils/connection');
const BASE_URL = "/api/v1/actors";
const PORT = process.env.PORT || 8080;

app.get(BASE_URL, async (req, res) => {
    try {
        const result = await someDatabaseQuery();
        console.log(result); // Esto imprimirá el resultado de la consulta
        res.status(200).json(result);
    } catch (error) {
        console.error(error); // Esto imprimirá el error en la consola
        res.status(500).send('Internal Server Error');
    }
});

const main = async () => {
    try {
        await sequelize.sync();
        console.log("DB connected");
        app.listen(PORT, () => {
            console.log(`👉 Server running on port ${PORT}`);
            console.log(`👉 Link http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

main();
