const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// app.get('/api/lessons', async (req, res) => {
//     const lessons = await prisma.lesson.findMany({
//       include: { images: true }, // Include multiple images
//     });
//     res.json(lessons);
//   });

app.get("/api/lesson/:id", async (req, res) => {
  const { id } = req.params;
  const lesson = await prisma.lesson.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(lesson);
});

app.post("/api/progress", async (req, res) => {
  const { userId, lessonId, quizScore, completed } = req.body;

  // Ensure user exists
  let user = await prisma.user.findUnique({ where: { id: parseInt(userId) } });

  if (!user) {
    user = await prisma.user.create({
      data: { username: `Guest${userId}` }, // Create a guest user
    });
  }

  // Insert progress
  const progress = await prisma.progress.create({
    data: {
      userId: user.id,
      lessonId: parseInt(lessonId),
      quizScore,
      completed,
    },
  });

  res.json(progress);
});

app.get("/api/lessons", async (req, res) => {
  const lessons = await prisma.lesson.findMany({
    include: { images: true, quiz: true }, // Include quiz data
  });
  res.json(lessons);
});

// Submit quiz response
app.post("/api/quiz/submit", async (req, res) => {
  const { userId, lessonId, selectedAnswer } = req.body;

  const lesson = await prisma.lesson.findUnique({
    where: { id: parseInt(lessonId) },
    include: { quiz: true },
  });

  if (!lesson || !lesson.quiz) {
    return res.status(400).json({ error: "Quiz not found" });
  }

  const isCorrect = selectedAnswer === lesson.quiz.correct;
  const score = isCorrect ? 1 : 0;

  const progress = await prisma.progress.create({
    data: {
      userId: parseInt(userId),
      lessonId: parseInt(lessonId),
      quizScore: score,
      completed: true,
    },
  });

  res.json({ isCorrect, score });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
