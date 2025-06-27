export interface SettlementPeriodRequest {
    id:string
    month:number,
    year:number,
    startDate:Date,
    endDate:Date,
    type:string,
    status:string
}