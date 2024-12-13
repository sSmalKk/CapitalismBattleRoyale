/**
 * Blog.js
 * @description :: model of a database collection Blog
 */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
let idValidator = require('mongoose-id-validator');
const myCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: myCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema(
  {

    title:{
      type:String,
      required:true
    },

    alternativeHeadline:{
      type:String,
      required:false
    },

    image:{
      type:String,
      required:false
    },

    publishDate:{
      type:Date,
      required:true
    },

    author:{
      name:{
        type:String,
        required:true
      },
      image:{
        type:String,
        required:false
      },
      email:{
        type:String,
        required:false
      }
    },

    publisher:{
      name:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:false
      },
      logo:{
        type:String,
        required:false
      }
    },

    articleSection:{
      type:String,
      required:false
    },

    articleBody:{
      type:String,
      required:true
    },

    description:{
      type:String,
      required:false
    },

    slug:{
      type:String,
      required:true
    },

    url:{
      type:String,
      required:true
    },

    isDraft:{
      type:Boolean,
      default:false
    },

    isDeleted:{
      type:Boolean,
      default:false
    },

    isActive:{
      type:Boolean,
      default:true
    },

    createdAt:{
      type:Date,
      default:'Date.now'
    },

    updatedAt:{
      type:Date,
      default:'Date.now'
    },

    updatedBy:{
      type:Schema.Types.ObjectId,
      ref:'user',
      required:false
    },

    addedBy:{
      type:Schema.Types.ObjectId,
      ref:'user',
      required:true
    },

    reference:[{
      _id:false,
      autor:{
        type:String,
        required:true
      },
      titulo:{
        type:String,
        required:true
      },
      subtitulo:{
        type:String,
        required:false
      },
      edicao:{
        type:String,
        required:false
      },
      local:{
        type:String,
        required:false
      },
      editora:{
        type:String,
        required:false
      },
      ano:{
        type:Number,
        required:true
      },
      paginas:{
        type:String,
        required:false
      },
      doi:{
        type:String,
        required:false
      },
      isbn:{
        type:String,
        required:false
      },
      link:{
        type:String,
        required:false
      },
      data_acesso:{
        type:Date,
        required:false
      },
      img:{
        type:String,
        required:false
      }
    }]
  }
  ,{ 
    timestamps: { 
      createdAt: 'createdAt', 
      updatedAt: 'updatedAt' 
    } 
  }
);
schema.index({ 'title':1 },{ 'name':'index_title' });
schema.index({ 'publishDate':-1 },{ 'name':'index_publishdate' });
schema.pre('save',async function (next){
  // 'this' refers to the current document about to be saved
  const record = this;
  // create slug using title
  let slug = record.title.toLowerCase();
  slug = slug.replace(/\s+/g,'-');
  // Replace and then store it
  record.slug = slug;
  next();
});
    
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  next();
});

schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals:true });
  object.id = _id;
     
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);
const Blog = mongoose.model('Blog',schema);
module.exports = Blog;