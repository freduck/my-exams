const answerSchema = new mongoose.Schema({
  userId: { type: Number, required: true },
  answers: [{
    questionId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'QuestionBank.questions' 
    },
    userAnswer: { type: String, required: true }
  }],
  submittedAt: { type: Date, default: Date.now }
});

const Answer = mongoose.model('Answer', answerSchema);


const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., 'Maths'
  questions: [{
    question: { type: String, required: true },
    options: [String],
    correct: { type: String, required: true }
  }]
});

const QuestionBank = mongoose.model('QuestionBank', questionBankSchema);



const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 1. Define Schemas (Based on our previous conversation)
const questionSchema = new mongoose.Schema({
    title: String,
    questions: [{ question: String, options: [String], correct: String }]
});
const Quiz = mongoose.model('Quiz', questionSchema);

const answerSchema = new mongoose.Schema({
    userId: Number,
    answers: [{ questionId: mongoose.Schema.Types.ObjectId, userAnswer: String }]
});
const Answer = mongoose.model('Answer', answerSchema);

// 2. The Route to Display Results
app.get('/results/:userId', async (req, res) => {
    try {
        const userAnswers = await Answer.findOne({ userId: req.params.userId });
        const quizData = await Quiz.findOne({ title: 'Maths' });

        if (!userAnswers || !quizData) {
            return res.status(404).send("Data not found");
        }

        // Map through answers and compare with question bank
        const detailedResults = userAnswers.answers.map(resp => {
            const originalQuestion = quizData.questions.id(resp.questionId);
            
            return {
                question: originalQuestion.question,
                userChoice: resp.userAnswer,
                correctChoice: originalQuestion.correct,
                isCorrect: resp.userAnswer === originalQuestion.correct
            };
        });

        res.json({
            userId: userAnswers.userId,
            score: detailedResults.filter(r => r.isCorrect).length,
            total: detailedResults.length,
            results: detailedResults
        });

    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));







<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Math Quiz - Pagination</title>
    <style>
        body { font-family: sans-serif; display: flex; justify-content: center; padding: 20px; background: #f4f4f9; }
        #quiz-container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 100%; max-width: 500px; }
        .hidden { display: none; }
        .option { display: block; margin: 10px 0; padding: 10px; border: 1px solid #ddd; border-radius: 5px; cursor: pointer; }
        .option:hover { background: #eef2ff; }
        .controls { margin-top: 20px; display: flex; justify-content: space-between; }
        button { padding: 10px 20px; cursor: pointer; border-radius: 5px; border: none; background: #4F46E5; color: white; }
        button:disabled { background: #ccc; }
    </style>
</head>
<body>

<div id="quiz-container">
    <h2 id="quiz-title">Loading...</h2>
    <div id="question-content">
        </div>
    
    <div class="controls">
        <button id="prev-btn" onclick="changeQuestion(-1)" disabled>Previous</button>
        <span id="page-info">Step 1 of 2</span>
        <button id="next-btn" onclick="changeQuestion(1)">Next</button>
    </div>
</div>

<script>
    // This data would normally come from your Node.js API (fetch('/api/questions'))
    const quizData = {
        title: 'Maths',
        questions: [
            { question: 'Find the value of x in 2x + 3x = x + 8', options: ['4','2','3','1'] },
            { question: 'Find the value of a in 2a + 3a = a + 8', options: ['4','2','3','1'] }
        ]
    };

    let currentIndex = 0;
    const userAnswers = [];

    function renderQuestion() {
        const q = quizData.questions[currentIndex];
        document.getElementById('quiz-title').innerText = quizData.title;
        
        let html = `<p><strong>${q.question}</strong></p>`;
        q.options.forEach(opt => {
            html += `<label class="option">
                <input type="radio" name="q${currentIndex}" value="${opt}" ${userAnswers[currentIndex] === opt ? 'checked' : ''} onchange="saveAnswer('${opt}')"> ${opt}
            </label>`;
        });
        
        document.getElementById('question-content').innerHTML = html;
        updateControls();
    }

    function saveAnswer(val) {
        userAnswers[currentIndex] = val;
    }

    function updateControls() {
        document.getElementById('prev-btn').disabled = currentIndex === 0;
        document.getElementById('next-btn').innerText = currentIndex === quizData.questions.length - 1 ? 'Submit' : 'Next';
        document.getElementById('page-info').innerText = `Step ${currentIndex + 1} of ${quizData.questions.length}`;
    }

    function changeQuestion(step) {
        if (currentIndex === quizData.questions.length - 1 && step === 1) {
            alert("Submitting answers: " + JSON.stringify(userAnswers));
            // Here you would use fetch() to POST userAnswers to your Node.js server
            return;
        }
        currentIndex += step;
        renderQuestion();
    }

    // Initial load
    renderQuestion();
</script>

</body>
</html>





<div id="timer-box" style="text-align: right; color: #d9534f; font-weight: bold; font-size: 1.2rem; margin-bottom: 10px;">
    Time Remaining: <span id="time-display">02:00</span>
</div>

<script>
    // ... (Keep existing quizData and currentIndex from previous step)
    
    let timeLeft = 120; // 2 minutes in seconds
    const timerDisplay = document.getElementById('time-display');

    function startTimer() {
        const timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                autoSubmit();
            } else {
                timeLeft--;
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            }
        }, 1000);
    }

    function autoSubmit() {
        alert("Time is up! Your answers are being submitted automatically.");
        submitQuiz();
    }

    async function submitQuiz() {
        // Logic to send data to your Node.js/MongoDB backend
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                userId: 1234, 
                answers: userAnswers 
            })
        });
        
        if (response.ok) {
            window.location.href = "/results-page";
        }
    }

    // Call startTimer when the page loads
    startTimer();
    renderQuestion();


let duration = 120; // 2 minutes in seconds
let endTime = localStorage.getItem('quizEndTime');

if (!endTime) {
    // If no end time exists, set it to (Current Time + Duration)
    endTime = Date.now() + (duration * 1000);
    localStorage.setItem('quizEndTime', endTime);
}

function startTimer() {
    const timerInterval = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.round((endTime - now) / 1000);

        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            localStorage.removeItem('quizEndTime'); // Clean up
            autoSubmit();
        } else {
            const minutes = Math.floor(remainingTime / 60);
            const seconds = remainingTime % 60;
            document.getElementById('time-display').innerText = 
                `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }
    }, 1000);
}





app.post('/api/submit', async (req, res) => {
    try {
        const { userId, answers } = req.body;
        const quizRecord = await Answer.findOne({ userId, status: 'in-progress' });

        if (!quizRecord) return res.status(404).send("No active quiz session found.");

        const allowedDuration = 120 * 1000; // 2 minutes in milliseconds
        const currentTime = Date.now();
        const timeElapsed = currentTime - quizRecord.startTime.getTime();

        // Server-side check: Add a 5-second "grace period" for network lag
        if (timeElapsed > (allowedDuration + 5000)) {
            return res.status(403).json({ 
                error: "Submission rejected: Time limit exceeded.",
                timeTaken: Math.round(timeElapsed / 1000) + " seconds"
            });
        }

        // If time is valid, save the answers
        quizRecord.answers = answers;
        quizRecord.status = 'completed';
        await quizRecord.save();

        res.json({ message: "Quiz submitted successfully!" });

    } catch (err) {
        res.status(500).send(err.message);
    }
});



const PDFDocument = require('pdfkit');
const fs = require('fs');

function generateCertificate(userName, score, total) {
    const doc = new PDFDocument({ layout: 'landscape', size: 'A4' });

    // Stream the PDF to a file (or directly to the browser response)
    doc.pipe(fs.createWriteStream(`${userName}_certificate.pdf`));

    // Draw a border
    doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();

    // Add Content
    doc.moveDown(5);
    doc.fontSize(40).font('Helvetica-Bold').fillColor('#4F46E5').text('CERTIFICATE OF COMPLETION', { align: 'center' });
    
    doc.moveDown(2);
    doc.fontSize(20).fillColor('black').text('This is to certify that', { align: 'center' });
    
    doc.moveDown(1);
    doc.fontSize(30).font('Helvetica-Bold').text(userName, { align: 'center' });

    doc.moveDown(1);
    doc.fontSize(18).font('Helvetica').text(`Has successfully completed the Maths Quiz with a score of:`, { align: 'center' });
    
    doc.moveDown(1);
    doc.fontSize(25).font('Helvetica-Bold').text(`${score} / ${total}`, { align: 'center' });

    doc.moveDown(4);
    doc.fontSize(12).text(`Date: ${new Date().toLocaleDateString()}`, { align: 'left', indent: 50 });

    doc.end();
}



app.get('/download-certificate', (req, res) => {
    const doc = new PDFDocument({ layout: 'landscape' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');
    doc.pipe(res); // Sending directly to the browser
    // ... add certificate content here ...
    doc.end();
});







<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Admin - Create Quiz</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f2f5; padding: 40px; }
        .admin-container { max-width: 800px; margin: auto; background: white; padding: 30px; border-radius: 12px; shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .question-block { border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; margin-bottom: 20px; background: #fafafa; }
        input, textarea, select { width: 100%; padding: 10px; margin: 8px 0; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        .btn { padding: 12px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .btn-add { background: #10b981; color: white; margin-bottom: 20px; }
        .btn-submit { background: #4F46E5; color: white; width: 100%; font-size: 1.1rem; }
        h3 { margin-top: 0; color: #333; border-bottom: 2px solid #4F46E5; display: inline-block; }
    </style>
</head>
<body>

<div class="admin-container">
    <h1>Create New Quiz</h1>
    <input type="text" id="quiz-title" placeholder="Quiz Title (e.g. Maths Level 1)" style="font-size: 1.2rem; font-weight: bold;">
    
    <div id="questions-wrapper">
        </div>

    <button type="button" class="btn btn-add" onclick="addQuestionBlock()">+ Add Question</button>
    <button type="button" class="btn btn-submit" onclick="submitQuiz()">Save Quiz to Database</button>
</div>

<script>
    let questionCount = 0;

    function addQuestionBlock() {
        questionCount++;
        const wrapper = document.getElementById('questions-wrapper');
        const div = document.createElement('div');
        div.className = 'question-block';
        div.innerHTML = `
            <h3>Question ${questionCount}</h3>
            <textarea class="q-text" placeholder="Enter question text..."></textarea>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <input type="text" class="opt" placeholder="Option 1">
                <input type="text" class="opt" placeholder="Option 2">
                <input type="text" class="opt" placeholder="Option 3">
                <input type="text" class="opt" placeholder="Option 4">
            </div>
            <input type="text" class="q-correct" placeholder="Correct Answer (must match one of the options exactly)">
            <textarea class="q-explanation" placeholder="Explain the solution..."></textarea>
        `;
        wrapper.appendChild(div);
    }

    async function submitQuiz() {
        const title = document.getElementById('quiz-title').value;
        const blocks = document.querySelectorAll('.question-block');
        const questions = [];

        blocks.forEach(block => {
            const options = Array.from(block.querySelectorAll('.opt')).map(input => input.value);
            questions.push({
                question: block.querySelector('.q-text').value,
                options: options,
                correct: block.querySelector('.q-correct').value,
                explanation: block.querySelector('.q-explanation').value
            });
        });

        const payload = { title, questions };

        // Sending to your Node.js route
        const response = await fetch('/api/questions/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert("Quiz created successfully!");
            window.location.reload();
        } else {
            alert("Error creating quiz. Check console.");
        }
    }

    // Add first block by default
    addQuestionBlock();




    <div id="results-container" class="container">
    <div class="score-card">
        <h1 id="status-title">Congratulations!</h1>
        <div class="circular-progress">
            <span id="score-percentage">85%</span>
        </div>
        <p id="score-text">You scored 2 out of 2</p>
        
        <button id="download-btn" onclick="downloadPDF()" class="hidden">
            Download Certificate
        </button>
    </div>

    <div class="breakdown">
        <h3>Question Breakdown</h3>
        <div id="questions-list">
            </div>
    </div>
</div>

<style>
    .score-card { text-align: center; padding: 20px; background: #fff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    .circular-progress { width: 120px; height: 120px; border-radius: 50%; border: 10px solid #4F46E5; display: flex; align-items: center; justify-content: center; margin: 20px auto; font-size: 1.5rem; font-weight: bold; }
    .correct { color: #059669; background: #ecfdf5; padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 5px solid #059669; }
    .wrong { color: #dc2626; background: #fef2f2; padding: 10px; border-radius: 8px; margin-bottom: 10px; border-left: 5px solid #dc2626; }
</style>
</script>

</body>
</html>

</script>