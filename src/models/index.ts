import mongoose from 'mongoose';

import { MONGO_URI } from '../config';

mongoose.connect(MONGO_URI);

export * from './User';
export * from './Post';
export * from './Role';
