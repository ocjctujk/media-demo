// async loadFiles() {
//     const videoList = await Storage.get({ key: FILE_KEY });
//     this.files = JSON.parse(videoList.value) || [];
//   }

//   private converBlobTokBase64 = (blob: Blob) =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onerror = reject;
//       reader.onload = () => {
//         resolve(reader.result);
//       };
//       reader.readAsDataURL(blob);
//     });

//   private getMimeType(name: string) {
//     if (name.indexOf('pdf') >= 0) {
//       return 'application/pdf';
//     } else if (name.indexOf('png') >= 0) {
//       return 'image/png';
//     } else if (name.indexOf('mp4') >= 0) {
//       return 'video/mp4';
//     }
//   }

//   onOpen() {
//     let images = this.images;
//     this.imagePicker.getPictures({}).then(
//       function (results) {
//         for (var i = 0; i < results.length; i++) {
//           images.push(Capacitor.convertFileSrc(results[i]));
//         }
//       },
//       function (error) {
//         console.log('Error: ' + error);
//       }
//     );
//     this.images = images;
//   }





//   // onDownload() {
//   //   this.downloadUrl = '';

//   //   this.http
//   //     .get(this.downloadUrl, {
//   //       responseType: 'blob',
//   //       reportProgress: true,
//   //       observe: 'events',
//   //     })
//   //     .subscribe(async (event) => {
//   //       if (event.type === HttpEventType.DownloadProgress) {
//   //         this.downloadText = Math.round(
//   //           (100 * event.loaded) / event.total
//   //         ).toString();
//   //       } else if (event.type === HttpEventType.Response) {
//   //         this.downloadText = '';
//   //         const name = this.downloadUrl.substr(
//   //           this.downloadUrl.lastIndexOf('/') + 1
//   //         );
//   //         const base64 = (await this.converBlobTokBase64(event.body)) as string;

//   //         const savedFile = await Filesystem.writeFile({
//   //           path: name,
//   //           data: base64,
//   //           directory: Directory.Documents,
//   //         });

//   //         // const uriPath = await Filesystem.getUri(
//   //         //   {
//   //         //     directory: Directory.Documents,
//   //         //     path: name
//   //         //   }
//   //         // )

//   //         const path = savedFile.uri;
//   //         const mimetype = this.getMimeType(path);

//   //         this.fileOpener.open(path, mimetype).then(() => {
//   //           console.log('File is opened'), () => console.log('cant open file');
//   //         });

//   //         this.files.unshift(path);

//   //         Storage.set({
//   //           key: FILE_KEY,
//   //           value: JSON.stringify(this.files)
//   //         })

//   //       }
//   //     });
//   // }