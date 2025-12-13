import axios from "axios";

const BASE_URL = process.env.ESCROWCOM_BASE_URL || "https://api.escrow.com/2017-09-01"; // 9
const ESCROW_EMAIL = process.env.ESCROWCOM_EMAIL;
const ESCROW_API_KEY = process.env.ESCROWCOM_API_KEY;

export async function escrowApiFetchTransaction(transactionId) {
  // Escrow API docs examples use HTTP Basic auth: "email-address:your-api-key"
  const url = `${BASE_URL}/transaction/${transactionId}`;
  const resp = await axios.get(url, {
    auth: { username: ESCROW_EMAIL, password: ESCROW_API_KEY },
    timeout: 8000,
  });
  return resp.data;
}
