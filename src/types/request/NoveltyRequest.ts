
export interface NoveltyRequest {
    id:string, 
    fileId:number, 
    conceptId:number,
    settlementPeriodId:number, 
    value:number,
    quota:number,
    totalQuota:number,
    origin:string
}