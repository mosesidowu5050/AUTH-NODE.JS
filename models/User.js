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
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }

    try{
        const salt = await bycrypt.genSalt(10);
        this.password = await bycrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const User = mongose.model('User', UserSchema);

module.exports = User;