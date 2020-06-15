import {
  Button,
  Container,
  Content,
  Fab,
  List,
  ListItem,
  Text,
} from 'native-base';

import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import InventoryService from '../../services/InventoryService';

export default class TestRealm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listInventory: [],
      active: false,
    };
  }

  componentDidMount() {
    // new InventoryService().save(new InventoryModel({
    //   name: 'string',
    //   photo: 'string',
    //   quantity: 1,
    //   price: 1,
    //   brand: 'string',
    //   description: 'string',
    //   priority: 1,
    // }))

    this.renderInventory();
  }

  handleRedirect = (type: string) => {
    const {navigation} = this.props;

    if (!this.state.active) {
      return;
    }

    navigation.navigate('Details Item', {type});
  };

  renderInventory = () => {
    let tempListInventory = [];
    new InventoryService().getAll().then(inventory => {
      inventory.forEach(v => {
        tempListInventory.push(
          <ListItem>
            <Text>{v.name}</Text>
          </ListItem>,
        );
      });
      console.log('tempListInventory', tempListInventory);

      // return inventory;
      this.setState({
        listInventory: tempListInventory,
      });
    });
  };

  render() {
    console.log('renderInventory', this.props);

    return (
      <>
        <Container>
          <Content>
            <List>
              {this.state.listInventory.map(v => {
                return v;
              })}
            </List>
          </Content>
        </Container>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#1976d2'}}
          position="bottomRight"
          onPress={() => this.setState({active: !this.state.active})}>
          <Icon name="gear" size={20} />
          <Button
            onPress={() => this.handleRedirect('minus')}
            style={{backgroundColor: '#DD5144'}}>
            <Icon name="minus" size={20} />
          </Button>
          <Button
            onPress={() => this.handleRedirect('plus')}
            style={{backgroundColor: '#689f38'}}>
            <Icon name="plus" size={20} />
          </Button>
        </Fab>
      </>
    );
  }
}
