import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import { CountryModel } from '../../../app/models/Country';
import Fuse from 'fuse.js';
import { FUZZINESS } from '@/constants/constants';

//using Fuse.js
//since dataset is small

export async function GET(req: NextRequest) {
  await connectDB();
  const { searchParams } = req.nextUrl;
  const name = searchParams.get('name') || '';
  const continent = searchParams.get('continent');

  const filter: any = {};
  if (continent) filter.continent = continent;

  const countries = await CountryModel.find(filter).select('name flag continent capital').lean();

  if (!name) {
    return NextResponse.json(countries.slice(0, 10));
  }

  const fuse = new Fuse(countries, {
    keys: ['name'],
    threshold: FUZZINESS, // Adjust for fuzziness level (0.0 = exact, 1.0 = very fuzzy)
  });

  const fuzzyResults = fuse.search(name).map(result => result.item).slice(0, 10);

  return NextResponse.json(fuzzyResults);
}
