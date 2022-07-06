import { client } from './../../utils/client';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const USER = req.body;
    /// create user in sanity database
    client
      .createIfNotExists(USER)
      .then(() => res.status(200).json('Login success'));
  }
}
