
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');


// Registrar nuevo usuario
const register = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const existingUserQuery = 'SELECT * FROM users WHERE username = $1';
      const existingUserResult = await pool.query(existingUserQuery, [username]);
  
      if (existingUserResult.rows.length > 0) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertar nuevo usuario en la base de datos
      const insertUserQuery = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
      const newUserResult = await pool.query(insertUserQuery, [username, hashedPassword]);
      const newUser = newUserResult.rows[0];
  
      // Enviar respuesta con el nuevo usuario
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Iniciar sesión
  const login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Buscar el usuario en la base de datos
      const userQuery = 'SELECT * FROM users WHERE username = $1';
      const userResult = await pool.query(userQuery, [username]);
  
      if (userResult.rows.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
  
      const user = userResult.rows[0];
  
      // Comparar la contraseña ingresada con la contraseña hasheada
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
  
      // Generar token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Enviar respuesta con el token
      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  module.exports = { register, login };