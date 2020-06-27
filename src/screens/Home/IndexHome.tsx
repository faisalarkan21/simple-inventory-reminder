import {
  Body,
  Button,
  Container,
  Content,
  Fab,
  Left,
  List,
  ListItem,
  Right,
  Text,
  Thumbnail,
} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import InventoryService from '../../services/InventoryService';
import {formatDate} from '../../utils/Moment';
import {formatCurrency} from '../../utils/Currency';
import {priorityKeys} from '../../utils/Keys';

export default class TestRealm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listInventory: [],
      active: false,
    };
  }

  componentDidMount() {
    this.willBlurListener = this.props.navigation.addListener('focus', () => {
      this.renderInventory();
    });
  }

  componentWillUnmount() {
    this.willBlurListener();
  }

  handleRedirect = (type: string) => {
    const {navigation} = this.props;


    console.log('type', type)
    if (!this.state.active) {
      return;
    }

    navigation.navigate('Details Item', {type});
  };

  renderInventory = () => {
    let tempListInventory = [];
    new InventoryService().getAll().then(inventory => {
      inventory.forEach(v => {
        console.log('tempListInventory', v);
        tempListInventory.push(
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={{uri: 'Image URL'}} />
            </Left>
            <Body>
              <Text>{v.name}</Text>
              <Text note numberOfLines={1}>
                {formatDate(v.updatedAt)}
              </Text>
              <Text note numberOfLines={1}>
                Price : {formatCurrency(v.price)}
              </Text>
              <Text note numberOfLines={1}>
                Quantity : {v.quantity}
              </Text>
              <Text note numberOfLines={1}>
                Priority : {priorityKeys(v.priority)}
              </Text>
            </Body>
            <Right>
              <Button onPress={() => this.handleRedirect('edit')} transparent>
                <Text>Edit</Text>
              </Button>
            </Right>
          </ListItem>,
        );
      });

      // return inventory;
      this.setState({
        listInventory: tempListInventory,
      });
    });
  };

  render() {
    console.log('renderInventory', this.props, this.state);
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
