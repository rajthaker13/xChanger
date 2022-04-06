// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Tournament, User, Stock, StockData, TournamentPerformance } = initSchema(schema);

export {
  Tournament,
  User,
  Stock,
  StockData,
  TournamentPerformance
};