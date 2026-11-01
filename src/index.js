const express = require('express');
const os = require('os');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    mensaje: '¡Aplicación desplegada con Dokploy!',
    institucion: 'Universidad del Quindío',
    programa: 'Ingeniería de Sistemas y Computación',
    curso: 'Administración de Infraestructura de TI',
    plataforma: 'Dokploy PaaS',
    app: process.env.APP_NAME || 'webapp-uni-quindio',
    version: process.env.APP_VERSION || '1.0.0',
    fecha: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.status(200).json({
    estado: 'saludable',
    uptime: process.uptime(),
    version: process.version,
    plataforma: 'Dokploy'
  });
});

app.get('/info', (req, res) => {
  res.json({
    node_version: process.version,
    platform: process.platform,
    arch: process.arch,
    hostname: os.hostname(),
    memory: {
      total: Math.round(os.totalmem() / 1024 / 1024) + ' MB',
      free: Math.round(os.freemem() / 1024 / 1024) + ' MB'
    }
  });
});

// Prueba de conexión a la base de datos MySQL creada en Dokploy (Fase 4)
app.get('/db', async (req, res) => {
  if (!process.env.DB_HOST) {
    return res.status(503).json({ conectado: false, error: 'Variables DB_* no configuradas' });
  }
  try {
    const mysql = require('mysql2/promise');
    const conn = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      connectTimeout: 5000
    });
    const [rows] = await conn.query('SELECT VERSION() AS version, DATABASE() AS base_datos, NOW() AS hora');
    await conn.end();
    res.json({ conectado: true, host: process.env.DB_HOST, ...rows[0] });
  } catch (err) {
    res.status(500).json({ conectado: false, error: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${port}`);
  console.log(`Plataforma: Dokploy PaaS`);
});
