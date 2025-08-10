const mongose = require('mongoose');
const bycrypt = require('bcryptjs');

const UserSchema = new mongose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },

    otp: {
        type: String,
        required: false
    },

    otpExpiry: {
        type: Date,
        required: false
    },
}, {
    timestamps: true
})

    UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
        } catch (err) {
            return next(err);
        }
    }

    if (this.isModified('otp') && this.otp) { 
        try {
            const salt = await bcrypt.genSalt(10);
            this.otp = await bcrypt.hash(this.otp, salt);
        } catch (err) {
            return next(err);
        }
    }

    next();
});

const User = mongose.model('User', UserSchema);

module.exports = User;
