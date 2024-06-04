const mongoose =require('mongoose')

// Define section schema

  const sectionSchema = new mongoose.Schema({
    title: {
      type: String,
      minlength: 3,
      maxlength: 25,
      trim: true,

      required: true,
    },
    ID: {
      type: String,
      minlength: 4,
      maxlength: 5,
      unique: true,
      required: true,
    },
    numberOfHours: {
      type: Number,
      required: true,
    },
     
    addedBy: {
        type: [mongoose.Types.ObjectId],
        // required: true,
  
        ref: "prof-profAssist",
      },
    fileUrl: {
        type: Object,
        default: {
          url: "https://th.bing.com/th/id/R.152c34a899b6bf22d4da6c91b74403dd?rik=ELN9t4jt5Z7dhA&pid=ImgRaw&r=0",
          publidId: null,
        },
      }, // Store Cloudinary URL
  });
  module.exports= mongoose.model('Section', sectionSchema)

  
  