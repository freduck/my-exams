
const nodemailer = require('nodemailer');

class Email{

constructor(app,path){
this.app=app
this.path=path
}

sendResultEmail(){

this.app.post('/send-results', async (req, res) => {
    const { email, results } = req.body;

    // 1. Create a transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // or your preferred service
        auth: {
            user: 'delambocollege@gmail.com',
            pass: 'lvmc llts xyib jodz' // Use App Passwords for Gmail
        }
    });

    // 2. Define email options
    let mailOptions = {
        from: 'DE-LAMBO EXAMS" <delambocollege@gmail.com>',
        to: email,
        subject: 'Your Assessment Results',
        text: `Here are your results: \n\n ${results}`
    };

    // 3. Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Success');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});

}
}