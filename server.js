const express = require('express');
const xlsx = require('xlsx');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public')); // Serve static files from the public directory

app.get('/data', (req, res) => {
    try {
        const workbook = xlsx.readFile(path.join(__dirname, 'public', 'contributions.xlsx'));
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        console.log(data); // Log the data to the console
        res.json(data); // Send the data back as JSON
    } catch (error) {
        console.error('Error reading the Excel file:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});