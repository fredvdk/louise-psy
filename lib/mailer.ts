import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
	host: process.env.NEXT_EMAIL_HOST,
	port: 587,
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
	from: 'info@psycholooglouise.be',
	to: email,
	subject: subject,
	text: text,
});
}
