const express = require("express");
const app = express();

app.use(express.json({ extended: false }));
const fs = require('fs');
const jwt = require('jsonwebtoken');

app.get('/appStoreConnectToken', async (req, res) => {
    try{
        const privateKey = fs.readFileSync('AuthKey_WTZPJL3789.p8'); // this is the file you can only download once and should treat like a real, very precious key.
        const apiKeyId = 'WTZPJL3789';
        const issuerId = '7f5deff3-b390-4625-8375-207103b7d8e4';
        let now = Math.round((new Date()).getTime() / 1000); // Notice the /1000 
        let nowPlus20 = now + 1199; // 1200 === 20 minutes;
    
        const payload = {
            'iss': issuerId,
            'iat': now,
            'exp': nowPlus20,
            'aud': 'appstoreconnect-v1',
        };
    
    
        const signOptions = {
            'algorithm': 'ES256',
            header: {
                'alg': 'ES256',
                'kid': apiKeyId,
                'typ': 'JWT'
            }
        };
    
    
        let token = jwt.sign(payload, privateKey, signOptions);
        return res.json({ token: token });
    }catch(e){
        return res.json({ token: e});
    }
 
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));
