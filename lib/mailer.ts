import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.NEXT_EMAIL_USER,
		pass: process.env.NEXT_EMAIL_PASS,
	},
});

interface mailProps {
    text: string,
    email: string,
    subject: string

}

export async function sendMailVoorAfspraak({text, email, subject}: mailProps){
 await transporter.sendMail({
 	from: '"INFO PSY LOUISE" <info@psylouise.com>',
 	to: "frederick.vdkerckhove@telenet.be",
 	subject: subject,
 	text: text,
	html: `<b>${text} Hello world HTML</b>`
 });
console.log("Sending email", text, subject, email)
}
