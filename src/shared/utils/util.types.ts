
export type PaylaodJWT = {
    id:string, 
    name:string , 
  }
export type StringObject = Record<string, unknown>;

export const HttpErrorStatus = {
  // Client Errors (400–499)
  BadRequest: 400, // Invalid request payload / params
  Unauthorized: 401, // Missing or invalid authentication
  Forbidden: 403, // Authenticated but not allowed
  NotFound: 404, // Resource doesn’t exist
  // InternalServerError: 500, // Generic server crash / bug

} as const;

export type HttpErrorStatusType = typeof HttpErrorStatus;

export type ErrorStatusCode = HttpErrorStatusType[keyof HttpErrorStatusType];

export type ApiStatusCode =
  | ErrorStatusCode
  | 200 // OK — Request succeeded
  | 201 // Created — Resource created successfully
  | 202 // Accepted — Request accepted, processing asynchronously
  | 204; // No Content — Successful but no response body