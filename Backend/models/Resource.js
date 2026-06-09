import mongoose from "mongoose";
import validator from "validator";

const ResourceSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 80,
        minLength: 5,
        required: true,
        trim: true
    }

    ,
    url: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        validate: {
            validator: (v) => validator.isURL(v, {
                protocols: ['http', 'https'],
                require_tld: true,
                require_protocol: true
            }),
            message: props => `${props.value} is not a valid URL!`
        }
    }

    ,
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ["frontend", "backend", "database", "linux", "devops", "ai", "security", "general", "fun"],
        index: true
    }
    ,

    description: {
        type: String,
        trim: true,
        maxLength: 100
    }
    ,

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true

    }
}, {
    timestamps: true
})

const Resource = mongoose.model("Resource", ResourceSchema);

export default Resource;