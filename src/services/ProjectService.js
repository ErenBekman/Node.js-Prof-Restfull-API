const BaseService = require('./BaseService');
const baseModel = require('../models/Projects');
class ProjectService extends BaseService {
   constructor() {
      super(baseModel);
   }
   list = (where) => {
      return baseModel.find(where || {}).populate({
         path: 'user_id',
         select: 'full_name email',
      });
   };
}
/*
 ? populete coklu kullanis : 
 ? baseModel.find(where || {}).populate([{
    path: "",
    select: ""
 },{
   path : "",
   populate: {
      path: "",
      select: ""
   }
 }, {
    path: "",
    select: ""
 }])
*/
module.exports = new ProjectService()
