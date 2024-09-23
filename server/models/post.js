import mongoose from "mongoose";
// flight detay apısınden gelen  veriler için model olsuturuldu
const post = new mongoose.Schema({
  name:{type:String},
  surname:{type:String},
  email:{ type: String },
  depature:{ type: String },
  aircraftType: { type: String },
  airline:{ type: String },
  schedule: { type: String },
  scheduleDate: { type: String },
  actual: { type: String },
  actualDate: { type: String },
  price: { type: String }

});
export default mongoose.model("Post", post);
