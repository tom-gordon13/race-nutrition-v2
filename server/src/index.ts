import express, { Express, Request, Response } from 'express';

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Basic route
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the API' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 