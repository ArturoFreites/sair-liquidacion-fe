export type Bundle = {
    id:number,
    person:Person,
    socialReason:SocialReason,
    costCenter:CostCenter,
    bank:string,
    accountingFile:number,
    salatyFactor:number,
    cbu:string,
    createdAt:string,
}

export type Person = {
    id:number,
    name:string,
    lastName:string,
    dni:number,
    cuit:string,
    birthday:string
}

export type SocialReason = {
    id:number,
    name:string
}

export type CostCenter = {
    id:number,
    name:string
}