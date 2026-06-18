import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/schoolDB"; // change this
await mongoose.connect(MONGODB_URI);
console.log("Connected to MongoDB");

// 2. Define Schemas & Models
const studentSchema = new mongoose.Schema({
  studentId: String,
  name: String
});

const testSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  testScore: Number
});

const examSchema = new mongoose.Schema({
  studentId: String,
  subject: String,
  examScore: Number
});

const Student = mongoose.model("Student", studentSchema, "students");
const Test = mongoose.model("Test", testSchema, "students_test");
const Exam = mongoose.model("QuestionBank", examSchema, "questionbanks");
class Result{

 getStudentResultsGrouped() {
  try {
    const result = await Exam.aggregate([
      // Join test score
      {
        $lookup: {
          from: "students_test",
          let: { sid: "$studentId", sub: "$subject" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$studentId", "$$sid"] },
                    { $eq: ["$subject", "$$sub"] }
                  ]
                }
              }
            }
          ],
          as: "testData"
        }
      },
      { $unwind: { path: "$testData", preserveNullAndEmptyArrays: true } },

      // Join student name
      {
        $lookup: {
          from: "students",
          localField: "studentId",
          foreignField: "studentId",
          as: "student"
        }
      },
      { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },

      // Calculate total score and grade per subject
      {
        $addFields: {
          testScore: "$testData.testScore",
          totalScore: {
            $add: ["$examScore", { $ifNull: ["$testData.testScore", 0] }]
          }
        }
      },
      {
        $addFields: {
          grade: {
            $switch: {
              branches: [
                { case: { $gte: ["$totalScore", 70] }, then: "A" },
                { case: { $gte: ["$totalScore", 60] }, then: "B" },
                { case: { $gte: ["$totalScore", 50] }, then: "C" },
                { case: { $gte: ["$totalScore", 45] }, then: "D" },
                { case: { $gte: ["$totalScore", 40] }, then: "E" }
              ],
              default: "F"
            }
          }
        }
      },

      // Group by student
      {
        $group: {
          _id: "$studentId",
          name: { $first: "$student.name" },
          subjects: {
            $push: {
              subject: "$subject",
              examScore: "$examScore",
              testScore: "$testScore",
              totalScore: "$totalScore",
              grade: "$grade"
            }
          },
          averageScore: { $avg: "$totalScore" }
        }
      },

      // Clean up output
      {
        $project: {
          _id: 0,
          studentId: "$_id",
          name: 1,
          subjects: 1,
          averageScore: { $round: ["$averageScore", 2] }
        }
      },

      // Sort by name
      { $sort: { name: 1 } }
    ]);

    return result;
  } catch (err) {
    console.error("Aggregation error:", err);
    throw err;
  }
}
endThings(){

const results = await getStudentResultsGrouped();
console.log(JSON.stringify(results, null, 2));

// 5. Close connection
await mongoose.disconnect();
}
}
// 4. Run it

module.exports=Result;