import  { PutObjectCommand,S3Client } from '@aws-sdk/client-s3';
import { buffer } from 'stream/consumers';
import uniqid from 'uniqid';
export async function POST(req) {
    const data = await req.formData();
    console.log(data);
    const file = data.get('file');
    if (file) {
        const s3Client = new S3Client({
            region: 'us-east-2',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            }
        });

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer  = Buffer.concat(chunks);

        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;

        await s3Client.send(new PutObjectCommand({
            Bucket: 'franciszeka-food-ordering',
            Key: newFileName,
            ACL : 'public-read',
            ContentType: file.type,
            Body: buffer,
        }))
        return Response.json({url: `https://franciszeka-food-ordering.s3.amazonaws.com/${newFileName}`})
    }
  return Response.json(true);
}