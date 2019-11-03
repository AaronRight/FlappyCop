import React from "react";
import { SafeAreaView, Text, View, Platform } from "react-native";
//import StaticServer from "react-native-static-server";
import WebView from "react-native-webview";
//import RNFS from "react-native-fs";
import { AdMobBanner } from "react-native-admob";

class App extends React.Component {
  /*
  state = {
    url: null
  };
  async componentDidMount() {
    moveAndroidFiles();
    let path = getPath();
    this.server = new StaticServer(8080, path);
    this.server.start().then(url => {
      this.setState({ url });
    });
  }

  componentWillUnmount() {
    if (this.server && this.server.isRunning()) {
      this.server.stop();
    }
  }*/

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          style={{ flex: 1 }}
          source={{ uri: "file:///android_asset/index_single.html" }}
        />
        <View
          style={{
            flex: 0.1,
            alignItems: "center",
            backgroundColor: "#505050"
          }}
        >
          <AdMobBanner
            adSize="banner"
            adUnitID="ca-app-pub-5301941670325634/7440877684"
            didFailToReceiveAdWithError={this.bannerError}
            onAdFailedToLoad={error => console.error(error)}
          />
        </View>
      </SafeAreaView>
    );
  }
}
/*
function getPath() {
  return Platform.OS === "android"
    ? RNFS.DocumentDirectoryPath + "/www"
    : RNFS.MainBundlePath + "/www";
}

async function moveAndroidFiles() {
  if (Platform.OS === "android") {
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + "/www");
    const files = [
      "www/index.html",
      "www/game.js",
      "www/sprite.png",
      "www/Teko-Bold.ttf"
    ];
    await files.forEach(async file => {
      await RNFS.copyFileAssets(file, RNFS.DocumentDirectoryPath + "/" + file);
    });
  }
}*/

export default App;
