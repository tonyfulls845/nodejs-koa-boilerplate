import { MONGO_URI } from './config';
import { mongoose } from './models';

export * from './models';

//To use with migrations

mongoose.connect(MONGO_URI);
