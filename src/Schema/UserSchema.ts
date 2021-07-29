import { IUserModel } from '../Interface/IUserModel';
import mongoose from "mongoose";
import validator from 'validator';
import { encrypt } from '../Service/EncryptDecrypt';
const schema = mongoose.Schema;
let definition: any = new schema<IUserModel>(
    {
        email: {
            type: schema.Types.String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            validate: (value) => {
                return validator.isEmail(value)
            }
        },
        first_name: {
            type: schema.Types.String,
            required: true,
            trim: true,
        },
        last_name: {
            type: schema.Types.String,
            required: true,
            trim: true,
        },
        password: {
            type: schema.Types.String,
            required: true,
            validate: (value) => {
                return validator.isStrongPassword(value)
            },
            set: (value: string): string => {
                return encrypt(value);
            }
        },
        gender: {
            type: schema.Types.String,
            enum: ['0', 'M', 'F'],
            default: null
        },
        age: {
            type: schema.Types.Number,
            min: 0,
            default: 0
        },
    },
    {
        timestamps: true
    }
);

// UserSchema.pre('save', (next) => {
//     beforeSaveHook(this);
//     next();
// });
//to-do : create enum file where all enum files exists
definition.virtual('Gender').get((value) => {
    const mapping = {
        'O': 'Others',
        'M': 'Male',
        'F': 'Female',
    }
    return mapping[value];
});
const UserSchema = mongoose.model<IUserModel>('user', definition);

export default UserSchema;