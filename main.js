const express = require("express");
require("./mongoose");
const User = require("./user");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.post("/", async (req, res) => {
  const users = new User(req.body);
  await users.save();
  res.send(users);
});
app.get("/getUserGreaterThan", async (req, res) => {
  const users = await User.find({ salary: { $gt: 1000000 } });
  res.send(users);
});
app.get("/getUserGreaterThanOrEqual", async (req, res) => {
  const users = await User.find({ salary: { $gte: 2000000 } });
  res.send(users);
});
app.get("/matchTheId", async (req, res) => {
  const users = await User.find({ _id: { $eq: 1 } });
  res.send(users);
});
app.get("/valueIsIn", async (req, res) => {
  const users = await User.find({ name: { $in: "landry" } });
  res.send(users);
});
app.get("/valueNotIn", async (req, res) => {
  const users = await User.find({ name: { $nin: "landry" } });
  res.send(users);
});
app.get("/andOperator", async (req, res) => {
  const users = await User.find({
    $and: [{ name: "eric" }, { salary: { $gte: 1000000, $lte: 4000000 } }],
  });
  res.send(users);
});
app.get("/orOperator", async (req, res) => {
  const users = await User.find({ $or: [{ name: "eric" }, { name: "jules" }] });
  res.send(users);
});
app.get("/norOperator", async (req, res) => {
  const users = await User.find({
    $nor: [{ name: "eric" }, { name: "jules" }],
  });
  res.send(users);
});
app.get("/notOperator", async (req, res) => {
  const users = await User.find({ salary: { $not: { $gte: 4000000 } } });
  res.send(users);
});
app.get("/matchStage", async (req, res) => {
  const users = await User.aggregate([{ $match: { age: { $gte: 21 } } }]);
  res.send(users);
});
app.get("/groupStage", async (req, res) => {
  const users = await User.aggregate([
    { $group: { _id: { age: "$age", married: "$married" } } },
  ]);
  res.send(users);
});
app.get("/matchAndGroupStage", async (req, res) => {
  const users = await User.aggregate([
    { $match: { age: { $gte: 21 } } },
    { $group: { _id: { age: "$age", married: "$married" } } },
  ]);
  res.send(users);
});
app.get("/countStage", async (req, res) => {
  const users = await User.aggregate([{ $count: "total" }]);
  res.send(users);
});
app.get("/matchAndGroupAndCountStage", async (req, res) => {
  const users = await User.aggregate([
    { $match: { age: { $gte: 21 } } },
    { $group: { _id: { age: "$age", married: "$married" } } },
    { $count: "total" },
  ]);
  res.send(users);
});
app.get("/matchAndGroupAndSortStage", async (req, res) => {
  const users = await User.aggregate([
    { $match: { age: { $gte: 19 } } },
    //   {$group:{"_id": {age: "$age", married: "$married"}}},
    { $sort: { name: 1 } },
  ]);
  res.send(users);
});
app.get("/projectStage", async (req, res) => {
  const users = await User.aggregate([
    { $project: { _id: 0, isNewAge: "$age", name: 1 } },
  ]);
  res.send(users);
});
app.get("/limitStage", async (req, res) => {
  const users = await User.aggregate([
    { $limit: 3 },

    { $group: { _id: "$age" } },
    { $sort: { _id: 1 } },
  ]);
  res.send(users);
});
app.get("/unWindStage", async (req, res) => {
  const users = await User.aggregate([
    { $unwind: "$likes" },
    { $project: { name: 1, likes: 1 } },
  ]);
  res.send(users);
});
app.get("/sumAccumulator", async (req, res) => {
  const users = await User.aggregate([
    { $unwind: "$likes" },
    { $group: { _id: "$likes", total: { $sum: "$_id" } } },
  ]);
  res.send(users);
});
app.get("/outStage", async (req, res) => {
  const users = await User.aggregate([
    { $unwind: "$likes" },
    { $group: { _id: "$likes", total: { $sum: "$_id" } } },
    { $out: "outCollection" },
  ]);
  res.send(users);
});
app.listen(PORT, () => {
  console.log(`listen on ${PORT} port`);
});
