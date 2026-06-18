const sendEmail = async (email, subject, html) => {
    try {
        console.log("Attempting to send email via Brevo...");
        console.log("Using BREVO_API_KEY:", process.env.BREVO_API_KEY ? "SET" : "NOT SET");

        const response = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "api-key": process.env.BREVO_API_KEY
            },
            body: JSON.stringify({
                sender: {
                    name: "Todo App",
                    email: process.env.EMAIL // This must be verified in Brevo
                },
                to: [
                    {
                        email: email
                    }
                ],
                subject: subject,
                htmlContent: html
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Brevo error:", errorData);
            throw new Error(`Brevo API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Email sent successfully! Message ID:", data.messageId);
    } catch (error) {
        console.log("Email sending failed!");
        console.error("Error message:", error.message);
        throw error;
    }
};

module.exports = sendEmail;