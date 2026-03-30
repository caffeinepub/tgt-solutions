import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuoteRequestInput {
    to: string;
    serviceType: ServiceType;
    from: string;
    name: string;
    email: string;
    message: string;
    phone: string;
}
export interface QuoteRequest {
    id: bigint;
    to: string;
    serviceType: ServiceType;
    from: string;
    name: string;
    email: string;
    message: string;
    phone: string;
    timestampNanos: bigint;
}
export enum ServiceType {
    lTLTruckLoad = "lTLTruckLoad",
    fullTruckLoad = "fullTruckLoad",
    customizedLogistic = "customizedLogistic"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteAllQuotes(): Promise<void>;
    deleteQuoteRequest(id: bigint): Promise<void>;
    deleteQuotesByEmail(email: string): Promise<void>;
    editQuote(id: bigint, input: QuoteRequestInput): Promise<void>;
    filterQuotesByDestinationCity(destinationCity: string): Promise<Array<QuoteRequest>>;
    filterQuotesByOriginCity(originCity: string): Promise<Array<QuoteRequest>>;
    filterQuotesByServiceType(serviceType: ServiceType): Promise<Array<QuoteRequest>>;
    getAllQuoteRequestsSorted(): Promise<Array<QuoteRequest>>;
    getCallerUserRole(): Promise<UserRole>;
    getQuoteCount(): Promise<bigint>;
    getQuoteRequests(pageSize: bigint, pageIndex: bigint): Promise<Array<QuoteRequest>>;
    getQuoteRequestsInTimeRange(startTimeNanos: bigint, endTimeNanos: bigint): Promise<Array<QuoteRequest>>;
    getQuotesForEmail(email: string): Promise<Array<QuoteRequest>>;
    getTopRecentQuotesByTimestamp(count: bigint): Promise<Array<QuoteRequest>>;
    isCallerAdmin(): Promise<boolean>;
    searchQuotesForTerm(term: string): Promise<Array<QuoteRequest>>;
    submitQuote(input: QuoteRequestInput): Promise<bigint>;
    updateServiceType(id: bigint, serviceType: ServiceType): Promise<void>;
}
