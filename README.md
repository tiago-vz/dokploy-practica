# uni-quindio-dokploy-app

Aplicación Express.js para la práctica **Administración de Contenedores con Dokploy**
(Universidad del Quindío - Administración de Infraestructura de TI).

## Endpoints
| Ruta | Descripción |
|---|---|
| `/` | Mensaje de bienvenida |
| `/health` | Estado de salud |
| `/info` | Información del contenedor |
| `/db` | Prueba de conexión a MySQL (requiere variables `DB_*`) |

## Archivos
- `src/index.js` – aplicación
- `docker-compose.yml` – stack multi-servicio de la Fase 5
