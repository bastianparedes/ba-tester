import { and, asc, desc, inArray, like, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import drizzle from '../../../../../lib/drizzle';
import { Campaign } from '../../../../../lib/drizzle/schema';

type Body = {
  args: {
    name: string;
    order: 'asc' | 'desc';
    orderBy: 'id' | 'name' | 'status' | 'lastModifiedDate';
    page: number;
    quantity: number;
    statusList: ('inactive' | 'active' | 'deleted')[];
  };
};

const POST = async (request: Request) => {
  const { args }: Body = await request.json();
  const nameToUseInFilter = '%' + args.name.trim().split('').join('%') + '%';

  const sort = {
    asc,
    desc
  }[args.order];

  console.log(args.name, nameToUseInFilter, args.statusList);

  const campaigns = await drizzle
    .select()
    .from(Campaign)
    .where(
      and(
        like(Campaign.name, nameToUseInFilter),
        inArray(Campaign.status, args.statusList)
      )
    )
    .orderBy(sort(Campaign[args.orderBy]))
    .limit(args.quantity)
    .offset(args.page * (args.quantity ?? 0));

  const [{ count: countAsString }] = await drizzle
    .select({
      count: sql<number>`count(*)`
    })
    .from(Campaign)
    .where(
      and(
        like(Campaign.name, nameToUseInFilter),
        inArray(Campaign.status, args.statusList)
      )
    );

  return NextResponse.json({
    response: {
      campaigns,
      count: Number(countAsString)
    },
    success: true
  });
};

export { POST };
