const express = require('express');
const cors = require('cors');

const Anagram = require('./models/anagram');
const ContentOnly = require('./models/content_only');
const MCQ = require('./models/mcq');
const ReadAlong = require('./models/read_along');

const app = express();
const PORT = 5000;

require('./config/database')();
app.use(cors());

const getPaginatedData = async (Model, req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = {};

    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { solution: { $regex: search, $options: 'i' } },
            { 'blocks.text': { $regex: search, $options: 'i' } },
            { 'options.text': { $regex: search, $options: 'i' } }
        ];
    }

    try {
        const totalItems = await Model.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);
        const data = await Model.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.status(200).json({ data, totalPages });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

app.get('/api/anagrams', (req, res) => getPaginatedData(Anagram, req, res));
app.get('/api/content_only', (req, res) => getPaginatedData(ContentOnly, req, res));
app.get('/api/mcqs', (req, res) => getPaginatedData(MCQ, req, res));
app.get('/api/read_along', (req, res) => getPaginatedData(ReadAlong, req, res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});