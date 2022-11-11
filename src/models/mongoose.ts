import { Mongoose } from 'mongoose';

export const mongoose = new Mongoose();

// For access in Jest in share between tests
globalThis.mongoose = mongoose;
