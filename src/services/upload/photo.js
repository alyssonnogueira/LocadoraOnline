// const path = require('path');
// const fs = require('fs');
// const config = require('../../environments').files;
// const uuid = require('uuid/v4');
// const Media = require('../../models/media').model;
// const User = require('../../models/user').model;
// const sharp = require('sharp');
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
// fs.mkdir(config.base, () => { });
//
// var self = module.exports = {
//     process: buffer => {
//         return sharp(buffer)
//             .background('white')
//             .resize(1000, 1000)
//             .withoutEnlargement()
//             .min()
//             .flatten()
//             .jpeg({
//                 quality: 100
//             })
//             .toBuffer()
//     },
//     processThumbnail: buffer => {
//         return sharp(buffer)
//             .background('white')
//             .resize(200, 200)
//             .withoutEnlargement()
//             .min()
//             .flatten()
//             .jpeg({
//                 quality: 100
//             })
//             .toBuffer()
//     },
//     processProfilePicture: buffer => {
//         return sharp(buffer)
//             .background('white')
//             .resize(600, 600)
//             .embed()
//             .flatten()
//             .jpeg({
//                 quality: 100
//             })
//             .toBuffer()
//     },
//     savePhoto: (originalName, id, buffer) => new Promise((resolve, reject) => {
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
//         const fileName = uuid() + '.jpg';
//
//         minioClient.putObject(config.base, fileName, buffer, buffer.length, function(err, etag) {
//             if (err) return reject(err); // err should be null
//             const fileNameThumbnail ='thumbnail_' + uuid() + '.jpg';
//             self.processThumbnail(buffer).then(buffer => {
//                 minioClient.putObject(config.base, fileNameThumbnail, buffer, buffer.length, function(err, etag) {
//                     if (err) return reject(err); // err should be null
//                 })
//             });
//
//             resolve(Media.create({ filepath: fileName, mediaType: 1, postid: id, name: originalName, filesize: buffer.length, thumbnail: fileNameThumbnail })
//                 .then(photo => photo.id))
//         })
//
//     }),
//     saveProfilePicture: (user, buffer) => new Promise((resolve, reject) => {
//
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
//         const fileName = user + '.jpg';
//
//         minioClient.putObject(config.base, fileName, buffer, buffer.length, function(err, etag) {
//             if (err) return reject(err); // err should be null
//             resolve(User.update({
//                 picture: fileName
//             }, {
//                 where: {
//                     username: user
//                 }
//             }).then(() => relative));
//         })
//         // const fileName = user + '.jpg';
//         // const filePath = path.join(config.base, fileName);
//         // fs.writeFile(path.join(process.cwd(), filePath), buffer, err => {
//         //     if (err) return reject(err);
//         //     const relative = path.relative(config.base, filePath);
//         //     resolve(User.update({
//         //         picture: relative
//         //     }, {
//         //             where: {
//         //                 username: user
//         //             }
//         //         }).then(() => relative));
//         // })
//     }),
//     saveProfileCover: (user, buffer) => new Promise((resolve, reject) => {
//
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
//         const fileName = user + '_cover.jpg';
//
//         minioClient.putObject(config.base, fileName, buffer, buffer.length, function(err, etag) {
//             if (err) return reject(err); // err should be null
//             resolve(User.update({
//                 cover: fileName
//             }, {
//                 where: {
//                     username: user
//                 }
//             }).then(() => relative));
//         })
//         // const fileName = user + '_cover.jpg';
//         // const filePath = path.join(config.base, fileName);
//         // fs.writeFile(path.join(process.cwd(), filePath), buffer, err => {
//         //     if (err) return reject(err);
//         //     const relative = path.relative(config.base, filePath);
//         //     resolve(User.update({
//         //         cover: relative
//         //     }, {
//         //             where: {
//         //                 username: user
//         //             }
//         //         }).then(() => relative));
//         // })
//     })
// }