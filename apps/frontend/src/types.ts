import type { NextResponse } from 'next/server';
import { TypeApiResponse as TypeDomainApiResponse } from '@/domain/types/api';

export type TypeApiResponse<T extends Record<string, unknown>> = Promise<NextResponse<TypeDomainApiResponse<T>>>;
