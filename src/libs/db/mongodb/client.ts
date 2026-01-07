import mongoose from 'mongoose';
import env from '../../env';

mongoose
  .connect(env.DATABASE_URL_MONGODB)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error in conection to MongoDB:', err));

export default mongoose;
