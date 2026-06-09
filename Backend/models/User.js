import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxLength: 15,
        minLength: 5,
        trim: true
    },

    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true
    }
},{
    timeStamp:true
})

userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.compare = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;