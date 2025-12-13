export function mapEscrowEventToInternal(event) {
  // Escrow.com webhook events: payment_received, payment_disbursed, payment_refunded, etc. 7
  switch (event) {
    case "payment_received":
    case "payment_approved":
      return "FUNDED";

    case "payment_disbursed":
      return "RELEASED";

    case "payment_refunded":
      return "REFUNDED";

    // Dispute olayını Escrow.com ayrı event olarak vermeyebilir;
    // dispute senin tarafta owner açınca olur (DISPUTED), burada sadece sync edebilirsin.
    default:
      return "INITIATED";
  }
}
