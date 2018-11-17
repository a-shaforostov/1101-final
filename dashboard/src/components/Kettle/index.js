/**
 * Component. Kettle
 * @file
 */

import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Table, Button, Form, Input, Icon, Message, Segment, Dropdown } from 'semantic-ui-react'

class Kettle extends Component {
  handleSendCommand = command => () => {
    this.props.sendCommand({ command, url: this.props.data.url });
  };

  handleRemove = () => {
    this.props.remove({ url: this.props.data.url });
  };

  render() {
    const { url, works, temperature, amount, pending } = this.props.data;
    return (
      <Table.Row key={url}>
        <Table.Cell>
          Чайник
          {
            pending &&
            <Icon loading name='asterisk' />
          }
        </Table.Cell>
        <Table.Cell>{url}</Table.Cell>
        <Table.Cell>
          <div>Режим: <Icon name={works ? 'circle' : 'circle outline'} color={works ? 'green' : 'black'} /></div>
          <div>Кількість води: {amount}</div>
          <div>Температура: {temperature}</div>
        </Table.Cell>
        <Table.Cell>
          <Dropdown text='Команди'>
            <Dropdown.Menu>
              <Dropdown.Item text='+ Включити чайник' onClick={this.handleSendCommand('on')} />
              <Dropdown.Item text='- Вимкнути чайник' onClick={this.handleSendCommand('off')} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
        <Table.Cell>
          <Button color="red" onClick={this.handleRemove}>
            <Icon name={"remove"} color="white" />
          </Button>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default connect(
  {
    sendCommand: signal`sendCommand`,
    remove: signal`remove`,
  },
  Kettle,
);
