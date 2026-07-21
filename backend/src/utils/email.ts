import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export const sendOrderConfirmationEmail = async (userEmail: string, orderNumber: string, grandTotal: number) => {
  try {
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_mock_key') {
      console.log(`[MOCK EMAIL] Order confirmation sent to ${userEmail} for order ${orderNumber}`);
      return true;
    }

    const data = await resend.emails.send({
      from: 'QuickEats <orders@quickeats.com>',
      to: [userEmail],
      subject: `Your QuickEats Order Confirmed! (#${orderNumber})`,
      html: `
        <div>
          <h2>Thanks for your order!</h2>
          <p>Your order <strong>#${orderNumber}</strong> has been successfully placed.</p>
          <p><strong>Total Paid:</strong> $${grandTotal.toFixed(2)}</p>
          <p>The restaurant is preparing your food now. You can track your order in the app.</p>
          <br/>
          <p>Enjoy your meal,</p>
          <p><strong>The QuickEats Team</strong></p>
        </div>
      `,
    });

    return data;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};
