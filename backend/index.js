require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(express.json());
app.use(cors());

const diaryRoutes = require('./routes/diaries');
app.use('/api/diary', diaryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
