import { eq } from 'drizzle-orm';
import type { NextApiRequest, NextApiResponse } from 'next';

import drizzle from '../../../../lib/drizzle';
import { Audience } from '../../../../lib/drizzle/schema';
import type { AudienceExtendedWithoutDate } from '../../../../types/databaseObjects';
import { validateRequirementsAudience } from '../../../../types/jsonValidators';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { audience }: { audience: AudienceExtendedWithoutDate } = JSON.parse(
    req.body
  );
  const requirementsAreValid = await validateRequirementsAudience(
    audience.requirements
  );
  if (!requirementsAreValid) return res.json({ success: false });

  const idAudience = audience.id;
  if (idAudience === undefined) {
    await drizzle.transaction(async (tx) => {
      await tx
        .insert(Audience)
        .values({
          name: audience.name.trim(),
          requirements: audience.requirements,
          status: audience.status
        })
        .returning();
    });
  } else {
    await drizzle.transaction(async (tx) => {
      await tx
        .update(Audience)
        .set({
          lastModifiedDate: Audience.lastModifiedDate.default,
          name: audience.name.trim(),
          requirements: audience.requirements,
          status: audience.status
        })
        .where(eq(Audience.id, idAudience));
    });
  }

  return res.json({ success: true });
};

const config = {
  api: {
    bodyParser: true
  }
};

export { config };
export default handler;
