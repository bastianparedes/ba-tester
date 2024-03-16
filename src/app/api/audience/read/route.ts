import { and, asc, desc, ilike, inArray, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import drizzle from '../../../../../lib/drizzle';
import { Audience } from '../../../../../lib/drizzle/schema';

type Body = {
  args: {
    name: string;
    order: 'asc' | 'desc';
    orderBy: 'id' | 'name' | 'status' | 'lastModifiedDate';
    page: number;
    quantity: number;
    statusList: ('active' | 'deleted')[];
  };
};

const POST = async (request: Request) => {
  const { args }: Body = await request.json();
  const nameToUseInFilter = '%' + args.name.trim().split('').join('%') + '%';

  const sort = {
    asc,
    desc
  }[args.order];

  const audiences = await drizzle
    .select()
    .from(Audience)
    .where(
      and(
        ilike(Audience.name, nameToUseInFilter),
        inArray(Audience.status, args.statusList)
      )
    )
    .orderBy(sort(Audience[args.orderBy]))
    .limit(args.quantity)
    .offset(args.page * args.quantity);

  const [{ count: countAsString }] = await drizzle
    .select({
      count: sql<number>`count(*)`
    })
    .from(Audience)
    .where(
      and(
        ilike(Audience.name, nameToUseInFilter),
        inArray(Audience.status, args.statusList)
      )
    );

  return NextResponse.json({
    response: {
      audiences,
      count: Number(countAsString)
    },
    success: true
  });
};

export { POST };
