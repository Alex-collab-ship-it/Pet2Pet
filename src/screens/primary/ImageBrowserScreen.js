import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageBrowser } from 'expo-image-picker-multiple';

export default class ImageBrowserScreen extends Component {


  _getHeaderLoader = () => (
    <ActivityIndicator size='small' style={{ marginRight: 40 }} color={'#0fad89'}/>
  )
  ;

  imagesCallback = (callback) => {
    const { navigation } = this.props;
    this.props.navigation.setOptions({
      headerRight: () => this._getHeaderLoader()
    });

    callback.then(async (photos) => {
      const cPhotos = [];
      let i = 0
      for(let photo of photos) {
        const pPhoto = await this._processImageAsync(photo.uri);
        cPhotos.push({
          uri: pPhoto.uri,
          name: `image.jpeg`,
          type: `image/jpeg`,
          key: i
        })
        i += 1
      }
      navigation.navigate('CreatePetModal', {photos: cPhotos, closable: true });
    })
    .catch((e) => console.log(e));
  };

  async _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: { width: 1000 }}],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  _renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return <TouchableOpacity style={{ marginRight: 20 }} onPress={onSubmit}>
      <Text style={{ fontSize: 20, fontFamily: 'Inter', color: '#0fad89' }}>Готово!</Text>
    </TouchableOpacity>
  }

  updateHandler = (count, onSubmit) => {
    this.props.navigation.setOptions({
      title: `Выбрано ${count}`,
      headerRight: () => this._renderDoneButton(count, onSubmit)
    });
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  render() {
    const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;

    return (
      <SafeAreaView style={[styles.flex, styles.container]}>
        <ImageBrowser
          max={5}
          onChange={this.updateHandler}
          callback={this.imagesCallback}
          renderSelectedComponent={this.renderSelectedComponent}
          emptyStayComponent={emptyStayComponent}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1
  },
  container: {
    position: 'relative'
  },
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0fad89'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});
