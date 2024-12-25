import mongoose from "mongoose";

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://suman:wZeWGUiZIDKJx11Y@aviramam24.pl3ct.mongodb.net/aviramamdata"
  );
};

export default connectDB;
