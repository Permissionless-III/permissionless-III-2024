interface SnsWebSdk {
  init(accessToken: string, getNewAccessToken: () => Promise<string>): SnsWebSdkInstance;
}

interface SnsWebSdkInstance {
  withConf(conf: { lang: string }): this;
  on(event: 'onError', callback: (error: any) => void): this;
  onMessage(callback: (type: string, payload: any) => void): this;
  build(): SnsWebSdkInstance;
  launch(container: string): void;
}

declare const snsWebSdk: SnsWebSdk;

const getNewAccessToken = (): Promise<string> => {
  // Your implementation here
  return Promise.resolve("newAccessToken");
};

function launchWebSdk(accessToken: string) {
  let snsWebSdkInstance = snsWebSdk.init(
    accessToken,
    // token update callback, must return Promise
    getNewAccessToken
  )
    .withConf({
      // language of WebSDK texts and comments (ISO 639-1 format)
      lang: 'en',
    })
    .on('onError', (error: any) => {
      console.log('onError', error);
    })
    .onMessage((type: string, payload: any) => {
      console.log('onMessage', type, payload);
    })
    .build();

  // you are ready to go:
  // just launch the WebSDK by providing the container element for it
  snsWebSdkInstance.launch('#sumsub-websdk-container');
}
