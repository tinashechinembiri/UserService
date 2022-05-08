import env from'dotenv'; 
env.config(); 
export default {
    port: 1337, 
    host:'localhost', 
    db:'', 
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
    refreshTokenPrivateKey: 'REFRESH_PRIVATE_KEY',
    accessTokenPublicKey:"accessTokenPublicKey", 
    refreshTokenPublicKey:"refreshTokenPublicKey", 
    hashsalts :14, 
    Access_Refresh_Token_Life : '2d', 
    Access_Token_Life: '5m'


}; 
