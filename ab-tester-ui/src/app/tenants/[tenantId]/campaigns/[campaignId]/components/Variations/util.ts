import type { TypeVariationData } from '@digital-retail/ab-tester-types/campaign';

const variationsWithDistributedTraffic = (variations: TypeVariationData[]) => {
  if (variations.length === 0) return variations;
  const distributedTraffic = Math.floor(100 / variations.length);
  variations.forEach((variation) => {
    variation.traffic = distributedTraffic;
  });

  variations[0].traffic += 100 - distributedTraffic * variations.length;

  return variations;
};

export { variationsWithDistributedTraffic };
