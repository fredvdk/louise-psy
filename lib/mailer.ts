import { formatDate } from '@/lib/utils';
import nodemailer from 'nodemailer';
import type { Afspraak } from '@/types/reservatie';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NEXT_EMAIL_USER,
		pass: process.env.NEXT_EMAIL_PASS,
	},
});



export async function sendMailVoorAfspraak(afspraak: Afspraak): Promise<{ success: boolean; error?: string }> {
	try {
		if (!process.env.NEXT_EMAIL_USER || !process.env.NEXT_EMAIL_PASS) {
			return { success: false, error: 'Email configuration missing' };
		}

		if (!afspraak.client_email?.email) {
			return { success: false, error: 'Client email not provided' };
		}

		const htmlContent = generateAfspraakEmailHTML(afspraak);

		const result = await transporter.sendMail({
			from: '"INFO PSY LOUISE" <info@psycholooglouise.be>',
			to: afspraak.client_email.email,
			bcc: 'frederick.vdkerckhove@telenet.be',
			subject: 'Notificatie afspraak bij psycholoog Louise',
			html: htmlContent,
		});

		console.log('Email sent successfully', result.messageId);
		return { success: true };
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		console.error('Email sending failed:', errorMessage);
		return { success: false, error: errorMessage };
	}
}

export function generateAfspraakEmailHTML(afspraak: Afspraak): string {
	const clientName = afspraak.profiles?.full_name || afspraak.client_email.email;
	const formattedDate = formatDate(new Date(afspraak.date))

	const baseHTML = `
		<!DOCTYPE html>
		<html lang="nl">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				body {
					font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
					color: #333;
					background-color: #f5f5f5;
					margin: 0;
					padding: 0;
				}
				.container {
					max-width: 600px;
					margin: 20px auto;
					background-color: white;
					border-radius: 8px;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
					overflow: hidden;
				}
				.header {
					background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
					color: white;
					padding: 30px;
					text-align: center;
				}
				.header h1 {
					margin: 0;
					font-size: 24px;
					font-weight: 600;
				}
				.content {
					padding: 30px;
					line-height: 1.6;
				}
				.greeting {
					font-size: 16px;
					margin-bottom: 20px;
				}
				.details-box {
					background-color: #f9f9f9;
					border-left: 4px solid #667eea;
					padding: 15px;
					margin: 20px 0;
					border-radius: 4px;
				}
				.detail-item {
					display: flex;
					justify-content: space-between;
					padding: 8px 0;
					border-bottom: 1px solid #eee;
				}
				.detail-item:last-child {
					border-bottom: none;
				}
				.detail-label {
					font-weight: 600;
					color: #667eea;
					width: 40%;
				}
				.detail-value {
					text-align: right;
					width: 60%;
				}
				.status-confirmed {
					color: #22c55e;
					font-weight: 600;
				}
				.status-pending {
					color: #f59e0b;
					font-weight: 600;
				}
				.status-free {
					color: #ef4444;
					font-weight: 600;
				}
				.footer {
					background-color: #f5f5f5;
					padding: 20px;
					text-align: center;
					font-size: 12px;
					color: #666;
				}
				.footer p {
					margin: 5px 0;
				}
				.cta-button {
					display: inline-block;
					background-color: #667eea;
					color: white;
					padding: 12px 24px;
					text-decoration: none;
					border-radius: 4px;
					margin-top: 15px;
					font-weight: 600;
				}
			</style>
		</head>
		<body>
			<div class="container">
				${getHeaderByStatus(afspraak.status)}
				<div class="content">
					${getContentByStatus(afspraak, clientName, formattedDate)}
				</div>
				<div class="footer">
					<p><strong>Psy Louise</strong></p>
					<p>info@psylouise.com</p>
					<p>© 2026 Psy Louise. Alle rechten voorbehouden.</p>
				</div>
			</div>
		</body>
		</html>
	`;

	return baseHTML;
}

function getHeaderByStatus(status: 'confirmed' | 'pending' | 'free'): string {
	const headers = {
		confirmed: '<div class="header"><h1>✓ Afspraak Bevestigd</h1></div>',
		pending: '<div class="header"><h1>⏳ Afspraak Aanvraag Ontvangen</h1></div>',
		free: '<div class="header"><h1>✕ Afspraak Geannuleerd</h1></div>',
	};
	return headers[status];
}

function getContentByStatus(
	afspraak: Afspraak,
	clientName: string,
	formattedDate: string
): string {
	const baseDetails = `
		<div class="details-box">
			<div class="detail-item">
				<span class="detail-label">Datum:</span>
				<span class="detail-value">${formattedDate}</span>
			</div>
			<div class="detail-item">
				<span class="detail-label">Tijd:</span>
				<span class="detail-value">${afspraak.time}</span>
			</div>
			<div class="detail-item">
				<span class="detail-label">Status:</span>
				<span class="detail-value status-${afspraak.status}">${getStatusText(afspraak.status)}</span>
			</div>
		</div>
	`;

	const contentMap = {
		confirmed: `
			<div class="greeting">
				<p>Hallo ${clientName},</p>
				<p>Goed nieuws! Uw afspraak met Psy Louise is bevestigd. We kijken ernaar uit om u te zien!</p>
			</div>
			${baseDetails}
			<p>Als u vragen hebt of de afspraak moet verplaatsen, kunt u ons bereiken via email of telefoon.</p>
			<p>Tot ziens!</p>
		`,
		pending: `
			<div class="greeting">
				<p>Hallo ${clientName},</p>
				<p>Dank u wel voor uw afspraakverzoek. We hebben uw aanvraag ontvangen en zullen deze zo spoedig mogelijk beoordelen.</p>
			</div>
			${baseDetails}
			<p>U ontvangt binnenkort een bevestigingsmail wanneer uw afspraak is goedgekeurd. Bedankt voor uw geduld!</p>
			<p>Met vriendelijke groeten,<br>Psy Louise</p>
		`,
		free: `
			<div class="greeting">
				<p>Hallo ${clientName},</p>
				<p>Uw afspraak is geannuleerd. Deze afspraakslot is nu weer beschikbaar voor anderen.</p>
			</div>
			${baseDetails}
			<p>Mocht u later opnieuw een afspraak willen maken, kunt u terug op ons platform boeken.</p>
			<p>Met vriendelijke groeten,<br>Psy Louise</p>
		`,
	};

	return contentMap[afspraak.status];
}

function getStatusText(status: 'confirmed' | 'pending' | 'free'): string {
	const statusTexts = {
		confirmed: 'Bevestigd',
		pending: 'In afwachting van goedkeuring',
		free: 'Geannuleerd',
	};
	return statusTexts[status];
}
