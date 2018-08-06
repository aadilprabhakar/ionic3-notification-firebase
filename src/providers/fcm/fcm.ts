import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class FcmProvider {

  constructor(
    public firebaseNative: Firebase,
    public afs: AngularFirestore,
    private platform: Platform
  ) {
    console.log('FcmProvider loaded');
  }

  async getToken(){
    let token;
    if(this.platform.is('android')){
      token = await this.firebaseNative.getToken();
    }

    return this.savetokenToFirestore(token);
  }

  private savetokenToFirestore(token){
    if(!token) return;

    const devicesRef = this.afs.collection('devices');

    const docData = {
      token,
      userId: 'testUser',
    }

    return devicesRef.doc(token).set(docData);

  }

  listentToNotifications(){
    return this.firebaseNative.onNotificationOpen();
  }

}
