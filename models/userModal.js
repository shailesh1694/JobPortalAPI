import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import validator from "validator";
import Jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({

    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: [true, "Email Already Exist !"],
        validate: validator.isEmail
    }, password: {
        required: true,
        type: String,
        minlength: 6
    }, mobile: {
        required: true,
        type: String,
        unique: [true, "Mobile Already Exist"]
    }
    , birth: {
        type: Date,
        max: `${new Date().toLocaleDateString("fr-CA")}`,
        default: Date.now,
        required: true
    }
    , gender: {
        required: true,
        type: String
    }
}, { timestamps: true }
);

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.createJWt = function () {
    return Jwt.sign({ userId: this._id }, "Shailesh@1994$16&10&Mittal", 
    // { expiresIn: '300s' }
    )
}

userSchema.methods.comparePassword = async function (userPassword) {
    const ismatch = await bcrypt.compare(userPassword, this.password)
    return ismatch;
}

export default mongoose.model("RegUser", userSchema)