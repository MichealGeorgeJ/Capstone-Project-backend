import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  libraryId: {
    type: String,
    required: [true, "Library ID is required"]
  },
  isbn: {
    type: String,
    required: [true, "ISBN is required"]
  },
  returnStatus: {
    type: Boolean,
    default: false
  },
  renewalStatus: {
    type: Boolean,
    default: false
  },
  issueDate: {
    type: Date,
    default: new Date()
  },
  dueDate: {
    type: Date,
    default: function() {
      const dueDate = new Date(this.issueDate);
      dueDate.setDate(dueDate.getDate() + 15);
      return dueDate;
    }
  }
}, {
  collection: 'issuedbooks',
  versionKey: false
});

const IssuedBookModel = mongoose.model('IssuedBook', bookSchema);

export default IssuedBookModel;