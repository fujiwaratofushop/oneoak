// scripts/populateCountries.ts
import mongoose from 'mongoose';
import axios from 'axios';

const CountrySchema = new mongoose.Schema({
  name: String,
  continent: String,
  capital: String,
  currency: String,
  flag: String,
});

const Country = mongoose.model('Country', CountrySchema);

async function populateCountries() {
  await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.MONGODB_DBNAME}`);

  const { data } = await axios.get(
    'https://restcountries.com/v3.1/all?fields=name,flags,currencies,capital,region'
  );

  const formatted = data.map((country: any) => {
    const name = country.name?.common ?? 'Unknown';
    const continent = country.region ?? 'Unknown';
    const capital = Array.isArray(country.capital) ? country.capital[0] : 'Unknown';

    const currencyCode = country.currencies ? Object.keys(country.currencies)[0] : null;
    const currency = currencyCode
      ? `${country.currencies[currencyCode].name} (${country.currencies[currencyCode].symbol || ''})`
      : 'Unknown';

    const flag = country.flags?.png ?? '';

    return { name, continent, capital, currency, flag };
  });

  await Country.deleteMany(); // Clear old data
  await Country.insertMany(formatted);

  console.log(`✅ Inserted ${formatted.length} countries into MongoDB.`);
  mongoose.disconnect();
}

populateCountries().catch((err) => {
  console.error('❌ Error populating countries:', err);
});
