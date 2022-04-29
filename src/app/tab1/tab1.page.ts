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
    this.imagePicker.hasReadPermission().then((hasPermission) => {
      if (!hasPermission) {
        this.imagePicker.requestReadPermission();
      }
    });
  }

  onOpen() {
    this.imagePicker.hasReadPermission().then((permission) => {
      if (permission) {
        this.imagePicker.getPictures({}).then(
          (results) => {
            for (var i = 0; i < results.length; i++) {
              this.images.push(Capacitor.convertFileSrc(results[i]));
            }
          },
          (error) => {
            console.log('Error: ' + error);
          }
        );
      }
    });
  }

  onDownload() {
    let dataConnected;
    Network.getStatus().then(
      (data) => {
        dataConnected = data.connected;
        // alert('Get status' + dataConnected);
        if (!dataConnected) {
          console.log('Data connected? ' + dataConnected);
          alert('App is Offline, please turn on the data');
          return;
        }

        this.downloadText = 'Downloading Image.....';
        const uri =
          'https://file-examples.com/storage/fef12739526267ac9a2b543/2017/10/file_example_JPG_500kB.jpg';
        this.fileTransfer
          .download(uri, this.file.dataDirectory + 'file.jpg', true)
          .then(
            (entry) => {
              this.downloadText = '';
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
              this.downloadText=''
            }
          );
      },
      (err) => {
        alert('error aavi');
      }
    );
  }
  setDownloadedImage() {
    let imagePath = this.file.dataDirectory + 'file.jpg';
    this.downloadedImage = Capacitor.convertFileSrc(imagePath);
  }
}
