import { Component } from '@angular/core';
import {
  StreamingAudioOptions,
  StreamingMedia,
} from '@awesome-cordova-plugins/streaming-media/ngx';
import { Network } from '@capacitor/network';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private streamMedia: StreamingMedia) {}

  playAudio() {
    let options: StreamingAudioOptions = {
      successCallback: () => {
        console.log('Audio played');
      },
      errorCallback: (e) => {
        alert(e);
        console.log(e);
        console.log('Error streaming');
      },
    };
    this.streamMedia.playAudio(
      'file:///storage/emulated/0/audiofile.mp3',
      options
    );
  }

  playOnlineAudio() {
    Network.getStatus().then(
      (data) => {
        let dataConnected = data.connected;
        // alert('Get status' + dataConnected);
        if (!dataConnected) {
          console.log('Data connected? ' + dataConnected);
          alert('App is Offline, please turn on the data');
          return;
        }

        let options: StreamingAudioOptions = {
          successCallback: () => {
            console.log('Audio played');
          },
          errorCallback: (e) => {
            alert(e);
            console.log(e);
            console.log('Error streaming');
          },
        };

        this.streamMedia.playVideo(
          'https://file-examples.com/storage/fef12739526267ac9a2b543/2017/11/file_example_MP3_700KB.mp3',
          options
        );
      },
      (error) => {
        console.log('Some error');
      }
    );
  }
}
