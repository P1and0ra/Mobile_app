const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 8001;
const uri = "mongodb+srv://didkivskiyd:KWQ1GiLDfei0u28m@cluster0.zyegnn8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";



app.use(express.json());

// MongoDB connection
mongoose.connect(uri, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  // Define a User schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});
// Create a User model
const User = mongoose.model('User', userSchema);
// Registration endpoint
app.post('/register', async (req, res) => {
  console.log('Received registration request:', req.body);
  const {username, password, email}= req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: 'All fields are required' });
    }
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user =new User({
      username,
      password: hashedPassword,
      email
    });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' }); 
  }
  catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const wordSchema = new mongoose.Schema({
  en: { type: String, required: true },
  pl: { type: String, required: true },
});
const Word = mongoose.model('Word', wordSchema, 'words');
// Эндпоинт для получения случайного слова
app.get('/random-word', async (req, res) => {
  try {
    const [randomWord] = await Word.aggregate([{ $sample: { size: 1 } }]);
    if (!randomWord) {
      return res.status(404).json({ message: 'No words found' });
    }
    res.json(randomWord);
  } catch (error) {
    console.error('Error fetching random word:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


const verificationCodes = {};

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  verificationCodes[email] = code;
  console.log(`Verification code for ${email}: ${code}`);
  //функция с помощью которой отпправляем код на почту, а точнее указываем почту, с которой отправляем
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'croissant.ko@gmail.com',
      pass: 'vncr hfhs urfi jghy',
    },
  })
  //Функция для отправки кода на почту
  await transporter.sendMail({
    from: 'croissant.ko@gmail.com',
    to: email,
    subject: 'Password Reset Code',
    text: `Your password reset code is: ${code}`
  });
  res.json({ message: 'Verification code sent to your email' });
});

//Функция для проверки кода который мы отправили на почту
app.post('/verify-code', async (req, res) => {
  const {email, code} = req.body;
  //Проверям что поле для почты и кода не пустые
  if (verificationCodes[email] === code) {
    delete verificationCodes[email];
    res.json({ message: 'Code verified successfully' });
  }
  res.status(400).json({message: 'invalid code'});
});
//функция для сброса пароля
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body; //Получаем почту и новый пароль из формы запроса
  if (!email || !newPassword) {
    return res.status(400).json({ message: 'Email and new password are required' });
  }
  //пробегаемся по базе данных и ищем пользователя с указанной почтой
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    //Если пользователь найден, то хешируем новый пароль и сохраняем его в базе данных
    user.password = hashedPassword;
    console.log(`Password reset for ${email}`);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  const {username, password} = req.body;
  if (!username || !password) {
    return res.status(400).json({message: "all fields are required"});
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({message: 'user not found'})
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    res.json({message: 'login successful'})
  } catch (error) {
    console.log('login error', error)
    res.status(500).json({ message: 'internal server error'});
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
