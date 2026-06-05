// const router = express.Router();


const QuestionBank = require('.././models/QuestionBank');
const path = require ('path');
const SScore = require('.././models/Score');
const Test= require('.././models/Student_Test');
class ExamController{
    constructor(app,path){
        this.app = app
        this.path = path

    }
    startExam(){
        this.app.get('/start-exam', async function(req,resp){
resp.sendFile(path.join(__dirname,'.././views/exam-page.html'));
});
    }


    showExam(){
        this.app.get('/exam',async function(req,res){
 // app.get('/api/question-banks', async (req, res) => {
const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const title = req.query.title; // Get the title from query params
  const skip = (page - 1) * limit;

  const filter = title ? { title: title } : {}; // Filter by title if provided

  const questionBanks = await QuestionBank.find(filter)
    .skip(skip)
    .limit(limit)
    .exec();
  const total = await QuestionBank.countDocuments(filter);
  const pages = Math.ceil(total / limit);

  res.json({ questionBanks, pages, page,total });
});
    }
    SubmitExam(){
        this.app.post('/api/submit-exam', async (req, res) => {
         const   title = req.body.subject;
         console.log(req.body)
            const filter = title ? { title: title } : {};
  try {
    const answers = req.body.userAnswers;
    const questionBanks = await QuestionBank.find(filter);
    let score = 0;
    let totalQuestions = 0;
    let type = req.body.type;
    questionBanks.forEach((qb) => {
      qb.questions.forEach((q, index) => {
        totalQuestions++;
        const userAnswer = answers[`${qb._id}-${index}`];
        console.log(userAnswer);
        console.log(q.correct,userAnswer);
        if (userAnswer === q.correct) {
          score++;
        }
      });
    });

    const result = {
        student_name:req.body.student_name,
      score,
      totalQuestions,
      percentage: (score / totalQuestions) * 100,
    };
  let s = await SScore.create({student_name:result.student_name,subject:req.body.subject,score:result.score,totalQuestions:totalQuestions,percentage:result.percentage});
    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error submitting exam' });
  }
});
    }
addQuestion(){
    this.app.get('/add-question', async (req,resp)=>{
  await  resp.sendFile(this.path.join(__dirname , '.././views/admin/add-questions.html'));
});
}

saveQuestion(){
    this.app.post('/create', async (req,resp)=>{
const {title,questions,questionType}= req.body
console.log(req.body);
let q = await QuestionBank.create({title:title,questions:questions,type:questionType})
    resp.status(200).json({message:'Question Added'});
    // console.log(req.body);
   let p = QuestionBank.find({});
   console.log(p.questions);
});
}
addScore(){
    this.app.get('/add-score', (req,resp)=>{
        resp.sendFile(this.path.join(__dirname,'.././views/add-score.html'));
    });
    // console.log();
}
getScore(){
    this.app.get('/student-score', async (req,resp)=>{
        resp.sendFile(this.path.join(__dirname,'.././views/students/get-scores.html'))
    });
}
showScore(){
    this.app.post('/get-score', async (req,resp)=>{
        console.log(req.body.name);
        const doc2 = await SScore.findOne({student_name: req.body.name});
        let s = await SScore.find({student_name:req.body.name},'subject score totalQuestions percentage type -_id');
        console.log(s)
        resp.json({score:s})
    })
}
}

module.exports = ExamController;















// app.get('/results/:userId', async (req, res) => {
//     try {
//         const userAnswers = await Answer.findOne({ userId: req.params.userId });
//         const quizData = await Quiz.findOne({ title: 'Maths' });

//         if (!userAnswers || !quizData) {
//             return res.status(404).send("Data not found");
//         }

//         // Map through answers and compare with question bank
//         const detailedResults = userAnswers.answers.map(resp => {
//             const originalQuestion = quizData.questions.id(resp.questionId);
            
//             return {
//                 question: originalQuestion.question,
//                 userChoice: resp.userAnswer,
//                 correctChoice: originalQuestion.correct,
//                 isCorrect: resp.userAnswer === originalQuestion.correct
//             };
//         });

//         res.json({
//             userId: userAnswers.userId,
//             score: detailedResults.filter(r => r.isCorrect).length,
//             total: detailedResults.length,
//             results: detailedResults
//         });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.post('/api/submit', async (req, res) => {
//     try {
//         const { userId, answers } = req.body;
//         const quizRecord = await Answer.findOne({ userId, status: 'in-progress' });

//         if (!quizRecord) return res.status(404).send("No active quiz session found.");

//         const allowedDuration = 120 * 1000; // 2 minutes in milliseconds
//         const currentTime = Date.now();
//         const timeElapsed = currentTime - quizRecord.startTime.getTime();

//         // Server-side check: Add a 5-second "grace period" for network lag
//         if (timeElapsed > (allowedDuration + 5000)) {
//             return res.status(403).json({ 
//                 error: "Submission rejected: Time limit exceeded.",
//                 timeTaken: Math.round(timeElapsed / 1000) + " seconds"
//             });
//         }

//         // If time is valid, save the answers
//         quizRecord.answers = answers;
//         quizRecord.status = 'completed';
//         await quizRecord.save();

//         res.json({ message: "Quiz submitted successfully!" });

//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });





// })



// router.post('/api/questions/add-to-quiz/:id', async (req, res) => {
//     try {
//         const quizId = req.params.id;
//         const { question, options, correct, explanation } = req.body;

//         // 1. Validation: Ensure all fields are present
//         if (!question || !options || !correct) {
//             return res.status(400).json({ error: "Missing required question fields." });
//         }

//         // 2. Use $push to add the question to the array
//         const updatedQuiz = await QuestionBank.findByIdAndUpdate(
//             quizId,
//             { 
//                 $push: { 
//                     questions: { question, options, correct, explanation } 
//                 } 
//             },
//             { new: true, runValidators: true } // Return the updated document
//         );

//         if (!updatedQuiz) {
//             return res.status(404).json({ error: "Quiz category not found." });
//         }

//         res.status(200).json({
//             message: "Question added successfully!",
//             totalQuestions: updatedQuiz.questions.length,
//             quiz: updatedQuiz
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Server error while adding question." });
//     }
// });

