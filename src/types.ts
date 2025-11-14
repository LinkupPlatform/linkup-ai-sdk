import type { LinkupSearchResponse as LinkupSearchResponseType, SearchParams } from 'linkup-sdk';

/** @public */
export type LinkupSearchConfig = Pick<
  SearchParams,
  'depth' | 'includeImages' | 'includeDomains' | 'excludeDomains' | 'fromDate' | 'toDate'
> & { apiKey?: string };

/** @public */
export type LinkupSearchResponse = LinkupSearchResponseType<'searchResults'>;
