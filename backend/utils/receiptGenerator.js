const generateReceipt = ({ mentorName, sessionDate, amount, payoutStatus }) => {
  return `
    Receipt
    =======
    Mentor: ${mentorName}
    Date: ${new Date(sessionDate).toLocaleDateString()}
    Amount Paid: $${amount}
    Status: ${payoutStatus}
    Thank you for your valuable session!
  `;
};

module.exports = generateReceipt;
