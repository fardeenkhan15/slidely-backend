"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3000;
// Middleware to parse request body
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
// In-memory data storage (replace with database later)
let submissions = [];
// Load submissions from the JSON file
try {
    const data = fs_1.default.readFileSync('db.json', 'utf8');
    submissions = JSON.parse(data) || [];
}
catch (err) {
    console.error('Error reading db.json:', err);
    submissions = [];
}
app.get('/ping', (req, res) => {
    res.send(true);
});
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    console.log('Received form data:', req.body);
    // Validate the form data
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        res.status(400).send('Missing required fields');
        return;
    }
    // Process the form data
    const submission = { name, email, phone, github_link, stopwatch_time };
    console.log('Processed submission:', submission);
    // Save the submission to the in-memory storage
    submissions.push(submission);
    // Save the submissions to the JSON file
    try {
        fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Error writing to db.json:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index, 10);
    if (isNaN(index) || index < 0 || index >= submissions.length) {
        res.sendStatus(400); // Bad request
        return;
    }
    res.json(submissions[index]);
});
// Edit submission at a specific index
app.put('/edit/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Validate index and data
    if (isNaN(index) || index < 0 || index >= submissions.length) {
        res.status(400).send('Invalid index');
        return;
    }
    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        res.status(400).send('Missing required fields');
        return;
    }
    // Update the submission
    submissions[index] = { name, email, phone, github_link, stopwatch_time };
    // Save the updated submissions to the JSON file
    try {
        fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Error writing to db.json:', error);
        res.status(500).send('Internal Server Error');
    }
});
// Delete submission at a specific index
app.delete('/delete/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    // Validate index
    if (isNaN(index) || index < 0 || index >= submissions.length) {
        res.status(400).send('Invalid index');
        return;
    }
    // Remove the submission from the array
    submissions.splice(index, 1);
    // Save the updated submissions to the JSON file
    try {
        fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
        res.sendStatus(200);
    }
    catch (error) {
        console.error('Error writing to db.json:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/search', (req, res) => {
    const email = req.query.email;
    // Validate email parameter
    if (!email) {
        res.status(400).send('Email parameter is required');
        return;
    }
    // Search for submission by email
    const foundSubmissions = submissions.filter(submission => submission.email === email);
    if (foundSubmissions.length === 0) {
        res.status(404).send('No submissions found with the provided email');
    }
    else {
        res.json(foundSubmissions);
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
