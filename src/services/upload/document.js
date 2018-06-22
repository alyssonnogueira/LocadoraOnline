// const path = require('path');
// const fs = require('fs');
// const config = require('../../environments').files;
// const uuid = require('uuid/v4');
// const Media = require('../../models/media').model;
// var minio = require('minio');
//
// // Instantiate the minio client with the endpoint
// // and access keys as shown below.
// var minioClient = new minio.Client({
//     endPoint: 'play.minio.io',
//     port: 9000,
//     secure: true,
//     accessKey: 'Q3AM3UQ867SPQQA43P2F',
//     secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
// });
//
// module.exports = {
//     saveDocument: (originalName, id, buffer) => new Promise((resolve, reject) => {
//         // const fileName = uuid() + path.extname(originalName);
//         // const filePath = path.join(config.base, fileName);
//         // fs.writeFile(path.join(process.cwd(), filePath), buffer, err => {
//         //     if (err) return reject(err);
//         //     resolve(Media.create({ filepath: path.relative(config.base, filePath), mediaType: 1, postid: id, name: originalName, filesize: buffer.length })
//         //         .then(photo => photo.id))
//         // });
//
//         //res.locals.session.username
//         minioClient.bucketExists(config.base, function(err, exists) {
//             if (err) {
//                 // Make a bucket called rede.
//                 minioClient.makeBucket(config.base, 'us-east-1', function(err) {
//                     if (err) return console.log(err)
//
//                     console.log('Bucket created successfully in "us-east-1".')
//                 });
//             }
//             if (exists) {
//                 return console.log('Bucket exists.')
//             }
//         })
//
//         const fileName = uuid() + path.extname(originalName);
//
//         minioClient.putObject(config.base, fileName, buffer, buffer.length, function(err, etag) {
//             if (err) return reject(err); // err should be null
//             const fileNameThumbnail ='thumbnail_' + uuid() + '.jpg';
//             // self.processThumbnail(buffer).then(buffer => {
//             //     minioClient.putObject(config.base, fileNameThumbnail, buffer, buffer.length, function(err, etag) {
//             //         if (err) return reject(err); // err should be null
//             //     })
//             // });
//
//             resolve(Media.create({ filepath: fileName, mediaType: 4, postid: id, name: originalName, filesize: buffer.length, thumbnail: fileNameThumbnail })
//                 .then(file => file.id))
//         })
//
//     })
// }