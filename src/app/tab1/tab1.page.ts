import { Component, OnInit } from '@angular/core';
import { ImagePicker } from '@awesome-cordova-plugins/image-picker/ngx';
import { File, FileEntry } from '@awesome-cordova-plugins/file/ngx';
import { PhotoViewer } from '@awesome-cordova-plugins/photo-viewer/ngx';
import { Capacitor } from '@capacitor/core';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import {
  FileTransfer,
  FileTransferError,
  FileTransferObject,
} from '@awesome-cordova-plugins/file-transfer/ngx';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Storage } from '@capacitor/storage';
export const FILE_KEY = 'files';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  images = [];
  files = [];
  downloadText = '';
  downloadUrl = '';
  downloadedImage;
  constructor(
    private imagePicker: ImagePicker,
    private file: File,
    private photoViewer: PhotoViewer,
    private transfer: FileTransfer,
    private platform: Platform,
    private fileOpener: FileOpener,
    private http: HttpClient
  ) {}

  fileTransfer: FileTransferObject = this.transfer.create();

  ngOnInit(): void {
    if (!this.imagePicker.hasReadPermission()) {
      this.imagePicker.requestReadPermission();
    }
  }

  onOpen() {
    let images = this.images;
    this.imagePicker.getPictures({}).then(
      function (results) {
        for (var i = 0; i < results.length; i++) {
          images.push(Capacitor.convertFileSrc(results[i]));
        }
      },
      function (error) {
        console.log('Error: ' + error);
      }
    );
    this.images = images;
  }

  onDownload() {
    let dataConnected;
    Network.getStatus().then(
      (data) => {
        dataConnected = data.connected;
        // alert('Get status' + dataConnected);
        if (!dataConnected) {
          alert('Data connected? ' + dataConnected);
          alert('App is Offline');
          return;
        }
        const uri =
          'https://file-examples.com/storage/fef12739526267ac9a2b543/2017/10/file_example_JPG_500kB.jpg';
        this.fileTransfer
          .download(uri, this.file.externalRootDirectory + 'file.jpg', true)
          .then(
            (entry) => {
              alert('Download Complete');
              console.log('Download complete' + entry.toURL());
              this.setDownloadedImage();
            },
            (error: FileTransferError) => {
              console.log('error');
              console.log(error);
              alert('Source' + error.source);
              alert('Body' + error.body);
              alert('target' + error.target);
              alert('Http status' + error.http_status);
            }
          );
      },
      (err) => {
        alert('error aavi');
      }
    );
  }
  setDownloadedImage() {
    let imagePath = this.file.externalRootDirectory + 'file.jpg';
    this.downloadedImage = Capacitor.convertFileSrc(imagePath);
  }
}
