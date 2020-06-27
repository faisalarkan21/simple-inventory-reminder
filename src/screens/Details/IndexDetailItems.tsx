import {
  Container,
  Content,
  Form,
  Input,
  Item,
  Label,
  Textarea,
  Picker,
  Icon,
  Toast,
} from 'native-base';
import React, {Component} from 'react';
import ImagePicker from 'react-native-image-picker';
import {Button, Image, Text, View, StyleSheet} from 'react-native';
import InventoryService from '../../services/InventoryService';
import InventoryModel from '../../utils/InventoryModel';

export default class FormDetailItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filePath: {},
      name: '',
      photo: '',
      quantity: '',
      price: '',
      brand: '',
      description: '',
      priority: '2',
    };
  }
  chooseFile = () => {
    var options = {
      title: 'Select Image',
      // customButtons: [
      //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
      // ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        let source = response;
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState(
          {
            filePath: source,
          },
          () => {
            console.log(this.state.filePath);
          },
        );
      }
    });
  };

  onChangeInput = (e: string, name: string) => {
    this.setState({
      [name]: e,
    });
  };

  submitDetail = () => {
    const {
      name,
      photo,
      quantity,
      price,
      brand,
      description,
      priority,
    } = this.state;

    new InventoryService()
      .save(
        new InventoryModel({
          name,
          photo,
          quantity: parseInt(quantity, 10),
          price: parseInt(price, 10),
          brand,
          description,
          priority: parseInt(priority, 10),
        }),
      )
      .then(() => {
        new InventoryService().getAll().then(inventory => {
          console.log('inventory', inventory.length);

          // return inventory;
        });

        Toast.show({
          text: 'Success Save',
          type: 'success',
        });
      })
      .catch(() => {
        Toast.show({
          text: 'Error',
          type: 'danger',
        });
      });
  };

  render() {
    console.log('this.props-FormDetailItems', this.state);
    return (
      <Container>
        {/* <Header /> */}
        <Content>
          <Form>
            <Item stackedLabel>
              <Label>Name Item</Label>
              <Input onChangeText={e => this.onChangeInput(e, 'name')} />
            </Item>
            <Item stackedLabel last>
              <Label>Photo</Label>
              <Button
                title="Choose File / Take Photo"
                onPress={this.chooseFile.bind(this)}
              />
            </Item>
            <Item>
              <View style={styles.container}>
                <Image
                  source={{
                    uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
                  }}
                  style={{width: 100, height: 100}}
                />
                {/* <Image
                  source={{uri: this.state.filePath.uri}}
                  style={{width: 250, height: 250}}
                /> */}
                {/* <Text style={{alignItems: 'center'}}>
                  {this.state.filePath.uri}
                </Text> */}
              </View>
            </Item>
            <Item stackedLabel last>
              <Label>Quantity</Label>
              <Input
                keyboardType="numeric"
                onChangeText={e => this.onChangeInput(e, 'quantity')}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Price</Label>
              <Input
                keyboardType="numeric"
                onChangeText={e => this.onChangeInput(e, 'price')}
              />
            </Item>
            <Item stackedLabel last>
              <Label>Brand</Label>
              <Input onChangeText={e => this.onChangeInput(e, 'brand')} />
            </Item>
            <Item stackedLabel last>
              <Label>description</Label>
              <Textarea
                onChangeText={e => this.onChangeInput(e, 'description')}
                rowSpan={5}
                bordered
                placeholder="Textarea"
              />
            </Item>
            <Item stackedLabel last>
              <Label>Priority</Label>
              <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: 200}}
                selectedValue={this.state.priority}
                onValueChange={e => this.onChangeInput(e, 'priority')}>
                <Picker.Item label="High" value="0" />
                <Picker.Item label="Medium" value="1" />
                <Picker.Item label="Low" value="2" />
              </Picker>
            </Item>

            <Item stackedLabel last>
              <Button title="Save" onPress={this.submitDetail} />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
