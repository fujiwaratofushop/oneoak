import mongoose, { Schema, model, models } from 'mongoose';

const CountrySchema = new Schema({
  name: String,
  capital: String,
  flag: String,
  currency: String,
  continent: String,
  population: Number,
  region: String,
});

export const CountryModel = models.Country || model('Country', CountrySchema);
