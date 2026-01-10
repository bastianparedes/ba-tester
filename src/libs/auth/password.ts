import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function getPasswordHashed(password: string) {
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

export const isPasswordCorrect = async ({ password, passwordHash }: { password: string; passwordHash: string }) => {
  return await bcrypt.compare(password, passwordHash);
};
