import { Component } from '@angular/core';
import { VideoPlayer } from '@awesome-cordova-plugins/video-player/ngx';
import {
  StreamingMedia,
  StreamingVideoOptions,
} from '@awesome-cordova-plugins/streaming-media/ngx';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  constructor(
    private videoPlayer: VideoPlayer,
    private streamMedia: StreamingMedia
  ) {}

  playVideo() {
    this.videoPlayer
      .play('file:///storage/emulated/0/videofile.mp4', {
        scalingMode: 0,
      })
      .then(() => {
        console.log('video completed');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  playOnlineVideo() {
    Network.getStatus().then(
      (data) => {
        let dataConnected = data.connected;
        // alert('Get status' + dataConnected);
        if (!dataConnected) {
          console.log('Data connected? ' + dataConnected);
          alert('App is Offline, please turn on the data');
          return;
        }

        let options: StreamingVideoOptions = {
          successCallback: () => {
            console.log('Video played');
          },
          errorCallback: (e) => {
            alert(e);
            console.log(e);
            console.log('Error streaming');
          },
          orientation: 'landscape',
          shouldAutoClose: true,
          controls: true,
        };
        this.streamMedia.playVideo(
          'https://file-examples.com/storage/fef12739526267ac9a2b543/2017/04/file_example_MP4_640_3MG.mp4',
          options
        );
      },
      (eror) => {
        console.log('Some error');
      }
    );
  }
}
