import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {HelperText,Avatar,TextInput, Button, Card, Title, Paragraph } from 'react-native-paper';



class InformationComponent extends Component {
  render() {
    return (
      <Card>
    <Card.Title subtitle="What to Dine?" />
    <Card.Content>
      <Title>What to Dine</Title>
      <Paragraph>Menu item here</Paragraph>
    </Card.Content>
    <Paragraph>Paragraph</Paragraph>
    <Card.Actions>
      <Button>Save</Button>
    </Card.Actions>
  </Card>

    )
  }
}

const Screen = () => (
  <Container style={styles.container}>
    <Content contentContainerStyle={styles.content}>
      <AppLogo />
      <Form style={styles.form}>
        <Item floatingLabel last>
          <Label>Username</Label>
          <Input />
        </Item>
      </Form>
    </Content>
  </Container>
);

export default class App extends Component {

  constructor(props) {
      super(props)

      this.state = {
        'text':''
      }
  }
  render() {
    return (
      <View>
      <Screen/>
          <InformationComponent/>
      <View>
      <Title styles={styles.welcome}>Weight(In LB):</Title>
      <TextInput
        mode="outlined"
        label='Weight'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
      <HelperText
          type="error"
          visible={!this.state.text.includes('@')}
        >
          Email address is invalid!
        </HelperText>
      <Title>Height(In Cm):</Title>
      <TextInput
        label='Height'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
      <Title>Sex(M or F):</Title>
      <TextInput
        label='Sex'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
      <Title>Active or InActive</Title>
      <TextInput
        label='Active or InActive'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
      </View>

      <Button onPress={() => console.log('Pressed')}>
    Calculate 
  </Button>

      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});



const styles2 = StyleSheet.create({
  container: {},
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  form: {
    width: '100%'
  },
  item: {}
});