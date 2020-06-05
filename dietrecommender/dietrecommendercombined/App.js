import React from 'react';
import { StyleSheet, Text, View, Container, Form, Item, Input, Content, Label } from 'react-native';
import InputComponent from './InputComponent'



export default function App() {
  return (
    <View style={styles.container}>
     <InputComponent/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


