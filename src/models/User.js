import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        validate: (pass) => {
            if (!pass?.length || pass.length < 6) {
                throw new Error('Password must be at least 6 characters');
            }
        }
    }
}, { timestamps: true });

// Intenta borrar el modelo si ya existe
if (mongoose.connection.models['User']) {
    delete mongoose.connection.models['User'];
}
userSchema.post('validate', function (User) {
    const notHashedPass = User.password;
    const salt =  bcrypt.genSaltSync(10);
    User.password = bcrypt.hashSync(notHashedPass, salt);
});
const User = model('User', userSchema);

export { User };
