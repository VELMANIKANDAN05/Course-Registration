const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/courseRegistration', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Create a schema for the course registration
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    course: String,
    reason: String
});

// Create a model for the registration
const Registration = mongoose.model('Registration', registrationSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve static files (like index.html)
app.use(express.static(__dirname));

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, course, reason } = req.body;

    const newRegistration = new Registration({ name, email, course, reason });

    newRegistration.save()
        .then(() => {
            res.status(200).send('Registration successful');
        })
        .catch((error) => {
            res.status(500).send('Error: ' + error);
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
