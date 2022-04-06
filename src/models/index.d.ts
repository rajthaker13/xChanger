import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Stock {
  readonly id?: string | null;
  readonly stockName?: string | null;
  readonly stockData?: (StockData | null)[] | null;
  readonly amtInvested?: number | null;
  readonly numShares?: number | null;
  constructor(init: ModelInit<Stock>);
}

export declare class StockData {
  readonly ask?: number | null;
  readonly askSize?: number | null;
  readonly averageAnalystRating?: string | null;
  readonly averageDailyVolume10Day?: number | null;
  readonly averageDailyVolume3Month?: number | null;
  readonly bidSize?: number | null;
  readonly bookValue?: number | null;
  readonly currency?: string | null;
  readonly customerPriceAlertConfidence?: string | null;
  readonly displayName?: string | null;
  readonly dividendDate?: number | null;
  readonly earningsTimestamp?: number | null;
  readonly earningsTimestampEnd?: number | null;
  readonly earningsTimestampStart?: number | null;
  readonly epsCurrentYear?: number | null;
  readonly epsForward?: number | null;
  readonly epsTrailingTwelveMonths?: number | null;
  readonly esqPopulated?: boolean | null;
  readonly exchange?: string | null;
  readonly exchangeDataDelayedBy?: number | null;
  readonly exchangeTimezoneName?: string | null;
  readonly exchangeTimezoneShortName?: string | null;
  readonly fiftyDayAverage?: number | null;
  readonly fiftyDayAverageChange?: number | null;
  readonly fiftyDayAverageChangePercent?: number | null;
  readonly fiftyTwoWeekHigh?: number | null;
  readonly fiftyTwoWeekHighChange?: number | null;
  readonly fiftyTwoWeekHighChangePercent?: number | null;
  readonly fiftyTwoWeekLow?: number | null;
  readonly fiftyTwoWeekLowChange?: number | null;
  readonly fiftyTwoWeekLowPercent?: number | null;
  readonly fiftyTwoWeekRange?: number | null;
  readonly financialCurrency?: string | null;
  readonly firstTradeDateMilliseconds?: number | null;
  readonly forwardPE?: number | null;
  readonly fullExchangeName?: string | null;
  readonly gmtOffSetMilliseconds?: number | null;
  readonly language?: string | null;
  readonly longName?: string | null;
  readonly market?: string | null;
  readonly marketCap?: number | null;
  readonly marketState?: string | null;
  readonly messageBoardId?: string | null;
  readonly pageViewGrowthWeekly?: number | null;
  readonly postMarketChange?: number | null;
  readonly postMarketChangePercent?: number | null;
  readonly postMarketPrice?: number | null;
  readonly postMarketTime?: number | null;
  readonly priceEpsCurrentYear?: number | null;
  readonly priceHint?: number | null;
  readonly priceToBook?: number | null;
  readonly quoteSourceName?: string | null;
  readonly quoteType?: string | null;
  readonly region?: string | null;
  readonly regularMarketChange?: number | null;
  readonly regularMarketChangePercent?: number | null;
  readonly regularMarketDayHigh?: number | null;
  readonly regularMarketDayLow?: number | null;
  readonly regularMarketDayRange?: string | null;
  readonly regularMarketOpen?: number | null;
  readonly regularMarketPreviousClose?: number | null;
  readonly regularMarketPrice?: number | null;
  readonly regularMarketTime?: number | null;
  readonly regularMarketVolume?: number | null;
  readonly sharesOutstanding?: number | null;
  readonly shortName?: string | null;
  readonly sourceInterval?: number | null;
  readonly symbol?: string | null;
  readonly tradeable?: boolean | null;
  readonly trailingAnnualDividendRate?: number | null;
  readonly trailingAnnualDividendYield?: number | null;
  readonly trailingPE?: number | null;
  readonly triggerable?: boolean | null;
  readonly twoHundredDayAverage?: number | null;
  readonly twoHundredDayAverageChange?: number | null;
  readonly twoHundredDayAverageChangePercent?: number | null;
  readonly typeDisp?: string | null;
  readonly bid?: number | null;
  constructor(init: ModelInit<StockData>);
}

export declare class TournamentPerformance {
  readonly id?: string | null;
  readonly user_id?: string | null;
  readonly tourney_id?: string | null;
  readonly portfolio?: Stock | null;
  constructor(init: ModelInit<TournamentPerformance>);
}

type TournamentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Tournament {
  readonly id: string;
  readonly name?: string | null;
  readonly buy_in?: number | null;
  readonly pot_total?: number | null;
  readonly num_users?: number | null;
  readonly max_users?: number | null;
  readonly tourney_image?: string | null;
  readonly leaderboard?: TournamentPerformance | null;
  readonly start_time?: number | null;
  readonly end_time?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Tournament, TournamentMetaData>);
  static copyOf(source: Tournament, mutator: (draft: MutableModel<Tournament, TournamentMetaData>) => MutableModel<Tournament, TournamentMetaData> | void): Tournament;
}

export declare class User {
  readonly id: string;
  readonly username?: string | null;
  readonly followers?: (string | null)[] | null;
  readonly following?: (string | null)[] | null;
  readonly level?: number | null;
  readonly firstName?: string | null;
  readonly lastName?: string | null;
  readonly watchList?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}