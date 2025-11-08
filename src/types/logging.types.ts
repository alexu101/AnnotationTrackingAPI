export interface ErrorLog {
    method: string,
    path: string,
    statusCode: number,
    errorType: string,
    stack: string | undefined
}