export type Country = 'korea' | 'us';

export type TrademarkStatus = 
  | 'registered' 
  | 'underExamination' 
  | 'published' 
  | 'abandoned' 
  | 'cancelled' 
  | 'expired';

export interface Trademark {
  id: string;
  country: Country;
  productName: string;
  productNameEng?: string;
  applicationNumber: string;
  applicationDate: string;
  registrationNumber: string;
  registrationDate: string;
  status: TrademarkStatus;
  applicantName: string;
  niceClass: string;
  viennaCode: string;
  publicationNumber?: string;
  usClassCodeList?: string;
}

export interface SearchFilters {
  country: Country;
  searchTerm: string;
  applicationNumber: string;
  status: TrademarkStatus | 'all';
  startDate: string;
  endDate: string;
}