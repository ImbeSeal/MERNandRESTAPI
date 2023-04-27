const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const FoodModel = require("./models/Food");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect(
  "mongodb+srv://newuser:passwordnew123@crud.jrilyqj.mongodb.net/food?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/insert", async (req, res) => {
  const foodName = req.body.foodName;
  const days = req.body.days;
  const food = new FoodModel({ foodName: foodName, daysSinceEaten: days });

  try {
    await food.save();
    res.send("inserted data");
  } catch (err) {
    console.log(err);
  }
});

app.get("/read", async (req, res) => {
  try {
    const data = await FoodModel.find({});
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/update", async (req, res) => {
  const id = req.body.id;
  const newFoodName = req.body.newFoodName;
  try {
    const result = await FoodModel.updateOne(
      { _id: id },
      { foodName: newFoodName }
    );
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Server running on port 3001...");
});
