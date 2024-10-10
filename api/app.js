require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDB = require('../config/db');  
const userRoutes = require('../routes/userRoutes');  
const employeeRoutes = require('../routes/employeeRoutes');  
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/emp', employeeRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));