const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

const s3 = new AWS.S3({
    region: 'eu-central-1',
    accessKeyId: keys.accessKeyId,
    // secretAccessKey: keys.secretAccessKey,
    credentials: {
        accessKeyId: keys.accessKeyId,
        secretAccessKey: keys.secretAccessKey
    }
})

module.exports = app => {
    app.get('/api/upload', requireLogin, async (req, res) => {
        const key = `${req.user.id}/${uuid()}.jpeg`;

        s3.getSignedUrl('putObject', {
            Bucket: 'my-blog-bucket-4534634545',
            ContentType: 'image/jpeg',
            Key: key
        }, (err, url) => res.send({ key, url }))


        
            // s3.createPresignedPost({
            //   Bucket: 'my-blog-bucket-4534634545',
            //   Fields: { key:key },
            //   Conditions: [
            //     ["content-length-range", 0, 10 * 1024 * 1024]
            //   ],
            //   Expires: 3600,
            // }, (err, preSigned) => res.send({ preSigned }));
    })


    
}

// Key:635539939711130c839d6dc6/e5458060-579e-11ed-bd99-b14a77e96521.jpeg
// bucket:my-blog-bucket-4534634545
// X-Amz-Algorithm:AWS4-HMAC-SHA256
// X-Amz-Credential:AKIA4OERLFHFRE36NOUT/20221029/us-east-1/s3/aws4_request
// X-Amz-Date:20221029T153228Z
// Policy:eyJleHBpcmF0aW9uIjoiMjAyMi0xMC0yOVQxNjozMjoyOFoiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MF0seyJLZXkiOiI2MzU1Mzk5Mzk3MTExMzBjODM5ZDZkYzYvZTU0NTgwNjAtNTc5ZS0xMWVkLWJkOTktYjE0YTc3ZTk2NTIxLmpwZWcifSx7ImJ1Y2tldCI6Im15LWJsb2ctYnVja2V0LTQ1MzQ2MzQ1NDUifSx7IlgtQW16LUFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IlgtQW16LUNyZWRlbnRpYWwiOiJBS0lBNE9FUkxGSEZSRTM2Tk9VVC8yMDIyMTAyOS91cy1lYXN0LTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMjEwMjlUMTUzMjI4WiJ9XX0=
// X-Amz-Signature:126fa7c7668223ab0d332f42e68aba9a7ae6d02596c20c127824e8008925977b

// key:635539939711130c839d6dc6/bc0886e0-57a1-11ed-89e0-292e4f2f406f.jpeg
// bucket:my-blog-bucket-4534634545
// X-Amz-Algorithm:AWS4-HMAC-SHA256
// X-Amz-Credential:AKIA4OERLFHFRE36NOUT/20221029/eu-central-1/s3/aws4_request
// X-Amz-Date:20221029T155247Z
// Policy:eyJleHBpcmF0aW9uIjoiMjAyMi0xMC0yOVQxNjo1Mjo0N1oiLCJjb25kaXRpb25zIjpbWyJjb250ZW50LWxlbmd0aC1yYW5nZSIsMCwxMDQ4NTc2MF0seyJrZXkiOiI2MzU1Mzk5Mzk3MTExMzBjODM5ZDZkYzYvYmMwODg2ZTAtNTdhMS0xMWVkLTg5ZTAtMjkyZTRmMmY0MDZmLmpwZWcifSx7ImJ1Y2tldCI6Im15LWJsb2ctYnVja2V0LTQ1MzQ2MzQ1NDUifSx7IlgtQW16LUFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IlgtQW16LUNyZWRlbnRpYWwiOiJBS0lBNE9FUkxGSEZSRTM2Tk9VVC8yMDIyMTAyOS9ldS1jZW50cmFsLTEvczMvYXdzNF9yZXF1ZXN0In0seyJYLUFtei1EYXRlIjoiMjAyMjEwMjlUMTU1MjQ3WiJ9XX0=
// X-Amz-Signature:0ce627e64d5da16a9a4ce3e7905c8184e2dc7d90cfc899e1f478bd100c3cba05