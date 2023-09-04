// Requiring important modules
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const nodemailer = require('nodemailer');


app.use(express.static('./FrontEnd'));
// to convert the data into json object
app.use(express.json());

// Creating transporter using nodemailer
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: 'false',
        auth: {
            user: 'devshubham9455@gmail.com',
            pass: 'qcgddsyeiinstcwc',
        }
    }
);

// Creating customized Email template
function customizeSOP(parcel) {

    // checking some fields
    if(parcel.studiedCanada === 'No'){
        parcel.canadianInstitute = 'N/A'
        parcel.canadianProgram = 'N/A'
    }

    if(parcel.tuitionPaid === 'No'){
        parcel.tuitionFee = 0;
    }

    if(parcel.gicDone === 'No'){
        parcel.gicAmount = 0;
    }

    // Generate the customized SOP based on the user's data
    const sopText = `
        Dear <strong>${parcel.fullName}</strong>,
        <br>
        <br>

        Thank you for providing your information. We are pleased to provide you with a customized Statement of Purpose (SOP) based on your details.
        <br>
        <br>

        Here are some of your key details:
        <br>
        <ol start = "1">
            <li><strong>Email:</strong> ${parcel.email}</li>
            <li><strong>Name:</strong> ${parcel.fullName}</li>
            <li><strong>Age:</strong> ${parcel.age}</li>
            <li><strong>Highest Level of Education:</strong> ${parcel.educationLevel}</li>
            <li><strong>Institute name:</strong> ${parcel.educationInstitute}</li>
            <li><strong>Study field:</strong> ${parcel.educationInstitute}</li>
            <li><strong>Work experience:</strong> ${parcel.workExperience}</li>
            <li><strong>Ever studied in Canada:</strong> ${parcel.studiedCanada}</li>
            <li><strong>Institute Name:</strong> ${parcel.canadianInstitute}</li>
            <li><strong>Program in which you enrolled:</strong> ${parcel.canadianProgram}</li>
            <li><strong>Country from which you're applying:</strong> ${parcel.applyingCountry}</li>
            <li>
                <strong>English scores</strong>
                <ul>
                    <li><strong>Reading:</strong> ${parcel.listeningScore}</li>
                    <li><strong>Reading:</strong> ${parcel.readingScore}</li>
                    <li><strong>Speaking:</strong> ${parcel.speakingScore}</li>
                    <li><strong>Writing:</strong> ${parcel.writingScore}</li>
                </ul>
            </li>
            <li><strong>Did you pay your First year fee:</strong> ${parcel.tuitionPaid}</li>
            <li><strong>How much did you pay:</strong> ${parcel.tuitionFee}</li>
            <li><strong>Did you do a GIC:</strong> ${parcel.gicDone}</li>
            <li><strong>How much did you pay for GIC:</strong> ${parcel.gicAmount}</li>
        </ol>

        <strong>Your future goals:</strong><br>
        ${parcel.futureGoals}
        <br>
        <br>

        We look forward to assisting you in your journey to achieve your goals in Canada.
        <br>
        <br>

        Sincerely,<br>
        XYZ
    `;

    return sopText;
}

app.post('/', (req, res) => {
    const parcel = req.body;

    // Define the email content
    const mailOptions = {
        from: 'devshubham9455@gmail.com',
        to: parcel.email, // Using the user's provided email
        subject: 'Your Customized SOP',
        html: `${customizeSOP(parcel)}`
    };

    // Sending the email using transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({
                status: 'error',
                message: 'Error sending email'
            });
        }
        else {
            // console.log('Email sent:', info.response);
            res.status(200).send({
                status: 'received',
                message: 'Email sent successfully'
            });
        }
    });


    res.status(200).send({
        status: 'received'
    })
});

// defining the port on which the app should listen
app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});