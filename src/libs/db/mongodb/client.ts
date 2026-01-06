import mongoose from 'mongoose';
import env from '../../env';

mongoose
  .connect(env.DATABASE_URL_MONGODB)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión:', err));

export default mongoose;
