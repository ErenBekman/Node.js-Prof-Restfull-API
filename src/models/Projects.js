const Mongoose = require('mongoose');
const logger = require('../scripts/logger/Project');
const ProjectSchema = new Mongoose.Schema(
   {
      name: String,
      age: Number,
      user_id: {
         type: Mongoose.Types.ObjectId,
         ref: 'user',
      },
      /*
    statuses: [String],
    iscompleted: Boolean,
    comments: [
        {
            value: String,
            user_id: {
                type: Mongoose.Types.ObjectId,
                ref : "user"
            }
        }
    ]
    */
   },
   { timestamps: true, versionKey: false }
);

// hooks
// ProjectSchema.pre('save', (next, doc) => {
//     console.log('before : ', doc)
//     next()
// })

ProjectSchema.post('save', (doc) => {
   // console.log('after : ', object)
   logger.log({
      level: 'info',
      message: doc,
   });
});

module.exports = Mongoose.model('project', ProjectSchema);
