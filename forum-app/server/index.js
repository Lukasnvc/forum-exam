require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;
const URI = process.env.URI;

const client = new MongoClient(URI, {
  connectTimeoutMS: 10000,
  maxIdleTimeMS: 10000,
});

app.use(cors());
app.use(express.json());

// +
app.post("/register", async (req, res) => {
  try {
    if (req.body.name && req.body.last_name && req.body.email && req.body.password) {
      const con = await client.connect();
      const data = await con.db("forum").collection("users").insertOne({
        name: req.body.name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        liked_posts: [],
        disliked_posts: [],
      });
      await con.close();
      res.send(data);
    } else {
      res.status(400).send("bad request");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.post("/login", async (req, res) => {
  try {
    if (req.body.email && req.body.password) {
      const con = await client.connect();
      const data = await con
        .db("forum")
        .collection("users")
        .aggregate([
          {
            $match: { email: req.body.email, password: req.body.password },
          },
          {
            $lookup: {
              from: "questions",
              localField: "_id",
              foreignField: "user_id",
              as: "questions",
            },
          },
          {
            $lookup: {
              from: "answers",
              localField: "_id",
              foreignField: "user_id",
              as: "answers",
            },
          },
          {
            $project: {
              password: 0,
            },
          },
        ])
        .toArray();
      await con.close();
      if (data.length !== 0) {
        res.send(data);
      } else {
        res.status(400).send("No such user");
      }
    } else {
      res.status(400).send("Bad request");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.get("/user/:id", async (req, res) => {
  try {
    const key = req.params.id;
    const con = await client.connect();
    const data = await con
      .db("forum")
      .collection("users")
      .aggregate([
        {
          $match: { _id: new ObjectId(key) },
        },
        {
          $lookup: {
            from: "questions",
            localField: "_id",
            foreignField: "user_id",
            as: "questions",
          },
        },
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "user_id",
            as: "answers",
          },
        },
        {
          $project: {
            password: 0,
          },
        },
      ])
      .toArray();
    // await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.get("/questions", async (req, res) => {
  try {
    const con = await client.connect();
    const data = await con
      .db("forum")
      .collection("questions")
      .aggregate([
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "question_id",
            as: "answers",
          },
        },
      ])
      .toArray();
    // await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.get("/question/:id", async (req, res) => {
  try {
    const key = req.params.id;
    const con = await client.connect();
    const data = await con
      .db("forum")
      .collection("questions")
      .aggregate([
        { $match: { _id: new ObjectId(key) } },
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "question_id",
            as: "answers",
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $project: {
            _id: "$_id",
            date: "$date",
            title: "$title",
            question: "$question",
            edited: "$edited",
            user: {
              _id: "$user_id",
            },
            answers: "$answers",
          },
        },
        { $unwind: "$user" },
        { $unwind: "$user._id" },
      ])
      .toArray();

    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.post("/questions", async (req, res) => {
  try {
    if (req.body.question && req.body.user_id) {
      const con = await client.connect();
      const data = await con
        .db("forum")
        .collection("questions")
        .insertOne({
          date: new Date().toLocaleString("lt", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
          title: req.body.title,
          question: req.body.question,
          user_id: new ObjectId(req.body.user_id),
          edited: false,
        });
      await con.close();
      res.send(data);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.patch("/questions/:id", async (req, res) => {
  const key = req.params.id;
  try {
    if (req.body.question && req.body.title) {
      const con = await client.connect();
      const data = await con
        .db("forum")
        .collection("questions")
        .updateOne(
          { _id: new ObjectId(key) },
          {
            $set: {
              title: req.body.title,
              question: req.body.question,
              edited: true,
            },
          }
        );
      await con.close();
      res.send(data);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.delete("/questions/:id", async (req, res) => {
  const key = req.params.id;
  try {
    const con = await client.connect();
    const data = await con
      .db("forum")
      .collection("questions")
      .deleteOne({ _id: new ObjectId(key) });
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// app.get("/questions/:id/answers", async (req, res) => {
//   try {
//     const key = req.params.id;
//     const con = await client.connect();
//     const data = await con
//       .db("forum")
//       .collection("answers")
//       .aggregate([
//         {
//           $match: { question_id: new ObjectId(key) },
//         },
//       ])
//       .toArray();
//     await con.close();
//     res.send(data);
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// });

// +
app.post("/questions/:id/answers", async (req, res) => {
  try {
    if (req.body.answer && req.body.user_id) {
      const key = req.params.id;
      const con = await client.connect();
      const data = await con
        .db("forum")
        .collection("answers")
        .insertOne({
          answer: req.body.answer,
          question_id: new ObjectId(key),
          user_id: new ObjectId(req.body.user_id),
          edited: false,
        });
      await con.close();
      res.send(data);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.patch("/answers/:id", async (req, res) => {
  const key = req.params.id;
  try {
    if (req.body.answer) {
      const con = await client.connect();
      const data = await con
        .db("forum")
        .collection("answers")
        .updateOne(
          { _id: new ObjectId(key) },
          {
            $set: {
              answer: req.body.answer,
              edited: true,
            },
          }
        );
      await con.close();
      res.send(data);
    } else {
      res.status(400).send("Bad request");
    }
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.delete("/answers/:id", async (req, res) => {
  const key = req.params.id;
  try {
    const con = await client.connect();
    const data = await con
      .db("forum")
      .collection("answers")
      .deleteOne({ _id: new ObjectId(key) });
    await con.close();
    res.send(data);
  } catch (err) {
    res.status(500).send({ err });
  }
});

// +
app.patch("/user/:id/posts/:post_id/likes", async (req, res) => {
  if (req.body.type && req.params.post_id) {
    const userId = req.params.id;
    const postId = req.params.post_id;
    const newLikedPost = { postId: new ObjectId(postId), type: req.body.type };
    try {
      const con = await client.connect();
      const user = await con
        .db("forum")
        .collection("users")
        .updateOne({ _id: new ObjectId(userId) }, { $push: { liked_posts: newLikedPost } });

      await con.close();
      res.send(user);
    } catch (err) {
      res.status(500).send({ err });
    }
  } else {
    res.status(400).send("bad request");
  }
});

// app.get("/user/:id/posts", async (req, res) => {
//   const userId = req.params.id;
//   try {
//     const con = await client.connect();
//     const user = await con
//       .db("forum")
//       .collection("users")
//       .findOne({ _id: new ObjectId(userId) });

//     const likedQuestions = user.liked_posts.filter((post) => post.post_type === "question");
//     const dislikedQuestions = user.disliked_posts.filter((post) => post.post_type === "question");
//     const likedAnswers = user.liked_posts.filter((post) => post.post_type === "answer");
//     const dislikedAnswers = user.disliked_posts.filter((post) => post.post_type === "answer");

//     const data = {
//       liked_questions: likedQuestions,
//       disliked_questions: dislikedQuestions,
//       liked_answers: likedAnswers,
//       disliked_answers: dislikedAnswers,
//     };

//     await con.close();
//     res.send(data);
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// });

// app.patch("/user/:id/posts", async (req, res) => {
//   const userId = req.params.id;
//   const { likedPosts, dislikedPosts } = req.body;

//   try {
//     const con = await client.connect();
//     const collection = con.db("forum").collection("users");

//     const user = await collection.findOne({ _id: new ObjectId(userId) });
//     user.liked_posts = user.liked_posts.filter((postId) => likedPosts.includes(postId));
//     user.disliked_posts = user.disliked_posts.filter((postId) => dislikedPosts.includes(postId));

//     const result = await collection.updateOne(
//       { _id: new ObjectId(userId) },
//       { $set: { liked_posts: user.liked_posts, disliked_posts: user.disliked_posts } }
//     );
//     await con.close();
//     res.send(result);
//   } catch (err) {
//     res.status(500).send({ err });
//   }
// });

app.listen(PORT, () => {
  console.log(`Forum is running on ${PORT} port`);
});
