import React from "react";
import { SafeAreaView, Text, View, Platform } from "react-native";
import StaticServer from "react-native-static-server";
import WebView from "react-native-webview";
import RNFS from "react-native-fs";

class App extends React.Component {
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
  }

  render() {
    if (!this.state.url) {
      return (
        <SafeAreaView>
          <Text>Hello World</Text>
        </SafeAreaView>
      );
    }
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView style={{ flex: 1 }} source={{ uri: this.state.url }} />
        <View style={{ flex: 0.1 }}>
          <Text>Place for admob</Text>
        </View>
      </SafeAreaView>
    );
  }
}

function getPath() {
  return Platform.OS === "android"
    ? RNFS.DocumentDirectoryPath + "/www"
    : RNFS.MainBundlePath + "/www";
}

async function moveAndroidFiles() {
  if (Platform.OS === "android") {
    await RNFS.mkdir(RNFS.DocumentDirectoryPath + "/www");
    const files = ["www/index.html", "www/game.js", "www/sprite.png"];
    await files.forEach(async file => {
      await RNFS.copyFileAssets(file, RNFS.DocumentDirectoryPath + "/" + file);
    });
  }
}

export default App;
