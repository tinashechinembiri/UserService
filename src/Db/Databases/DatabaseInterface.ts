export interface DatabaseInterface {
    connection(connection_String : string) : Promise<void>; 
}