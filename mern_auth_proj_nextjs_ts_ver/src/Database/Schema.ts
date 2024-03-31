import { Schema, model, models } from 'mongoose';

interface Quote { quote: String };

interface IUser {
    name: String;
    email: String;
    password: String;
    quotes?: Quote[];
};

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        quotes: []
    },
    {
        collection: 'user-data'
    }
);

const User = models.UserData || model<IUser>('UserData', UserSchema);

export default User;