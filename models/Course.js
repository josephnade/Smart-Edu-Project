const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    slug: {
        type: String,
        unique: true,
    },
    path: {
        type: String,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

CourseSchema.pre("save", function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
        trim: true,
    });
    next();
})

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;