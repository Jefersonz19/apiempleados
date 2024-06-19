
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');


// Registrar nuevo usuario
const register = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Verificar si el usuario ya existe
      const existingUserQuery = 'SELECT * FROM USUARIOS WHERE username = $1';
      const existingUserResult = await pool.query(existingUserQuery, [username]);
  
      if (existingUserResult.rows.length > 0) {
        return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
      }
  
      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertar nuevo usuario en la base de datos
      const insertUserQuery = 'INSERT INTO USUARIOS (username, password) VALUES ($1, $2) RETURNING *';
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

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password son requeridos' });
    }

    try {
    const result = await pool.query('SELECT * FROM USUARIOS WHERE username = $1', [username]);
    const user = result.rows[0];

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Credenciales inválidas' });
        }
    } catch (error){
        console.error(err);
        res.status(500).json({ error: 'Error en el logueo' });
    }
};

module.exports = { register, login };