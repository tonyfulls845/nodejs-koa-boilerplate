import { Mongoose } from 'mongoose';

import { MONGO_URI } from '../config';

export const mongoose = new Mongoose();
export const mongooseConnection = mongoose.connect(MONGO_URI);
