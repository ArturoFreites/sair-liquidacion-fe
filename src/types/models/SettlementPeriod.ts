export interface SettlementPeriod {
    id:number
    month:number,
    year:number,
    startDate:Date,
    endDate:Date,
    type:string,
    status:string,
    [key: string]: unknown;
}