import users from "./data/users.js";
import products from "./data/products.js";
import Product from "./model/productModel.js";
import User from "./model/userModel.js";
import Order from "./model/orderModel.js";
import connectDB from "./config/db.js";

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProduct = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProduct);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`Data Import failed : ${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
  } catch (error) {
    console.log(`Data Destroy failed : ${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
