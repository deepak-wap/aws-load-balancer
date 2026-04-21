import { model, Schema } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    isEmailVerified: { 
        type: Boolean, 
        default: false 
    },
    phone: { 
        type: String, 
        default: null 
    },
    countryCode: { 
        type: String, 
        default: null 
    },
    isPhoneVerified: { 
        type: Boolean, 
        default: false 
    },
    password: { 
        type: String,
        default: null
    },
    isActive: { 
        type: Boolean, 
        default: true 
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
}, { timestamps: true });

const UserModel = model("User", userSchema);

export default UserModel;