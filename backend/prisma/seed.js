const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create lessons with quizzes
  const lesson1 = await prisma.lesson.create({
    data: {
      title: 'Lesson 1: Introduction to Chess',
      content: 'Chess is a board game for two players. It is sometimes called international chess or Western chess to distinguish it from related games such as xiangqi (Chinese chess) and shogi (Japanese chess). Chess is an abstract strategy game which involves no hidden information and no elements of chance.',
      images: {
        create: [
          { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuSOP5ySvUmiw7gji_rQ7pKY9NvlNeK8d_Pg&s' },
          { url: 'https://www.vinkle.com/images/stories/300px-Staunton_chess_set.jpg' },
        ],
      },
      quiz: {
        create: {
          question: 'What is the goal in chess?',
          options: ['Capture all pieces', 'Checkmate the king', 'Protect the queen', 'Reach the last rank'],
          correct: 'Checkmate the king',
        },
      },
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: 'Lesson 2: Chess Piece Movements',
      content: 'Learn how pieces move on the board.',
      images: {
        create: [
          { url: 'https://media.istockphoto.com/id/134955466/photo/mans-hand-moves-white-knight-into-position-on-chessboard.jpg?s=612x612&w=0&k=20&c=0THrZYfetu-u_kyDv1ZHTHkWpRsKCldWah3iTxhI0-Y=' },
          { url: 'https://images.chesscomfiles.com/proxy/d1lalstwiwz2br.cloudfront.net/images_users/tiny_mce/pete/phpcQzStd/http/8491391575.jpeg' },
        ],},
      quiz: {
        create: {
          question: 'How does a knight move?',
          options: ['Diagonally', 'In an L-shape', 'Only forward', 'Sideways'],
          correct: 'In an L-shape',
        },
      },
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());












//   images: {
//     create: [
//       { url: 'https://media.geeksforgeeks.org/wp-content/uploads/20230831120007/file.png' },
//       { url: 'https://content.instructables.com/FVA/FWCE/FD80BVWN/FVAFWCEFD80BVWN.jpg?auto=webp&frame=1&width=320&md=MjAxNC0wNS0yMyAwMTowNToxMC4w' },
//     ],
//   },

//   images: {
//     create: [
//       { url: 'https://media.istockphoto.com/id/134955466/photo/mans-hand-moves-white-knight-into-position-on-chessboard.jpg?s=612x612&w=0&k=20&c=0THrZYfetu-u_kyDv1ZHTHkWpRsKCldWah3iTxhI0-Y=' },
//       { url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbhafXUVnh_JFFGQfa68HSrbEARNfhXGAehA&s' },
//     ],}