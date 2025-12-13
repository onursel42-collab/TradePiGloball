import axios from 'axios';

const ESCROW_API = 'https://api.escrow.com/2017-09-01';
const auth = {
  username: process.env.ESCROW_EMAIL,
  password: process.env.ESCROW_API_KEY
};

export async function createEscrow(payload) {
  const res = await axios.post(
    `${ESCROW_API}/transaction`,
    payload,
    { auth }
  );
  return res.data;
}
