/**
 * Component. Toaster
 * @file
 */

import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Table, Button, Form, Input, Icon, Message, Segment, Dropdown } from 'semantic-ui-react'

class Toaster extends Component {
  handleSendCommand = command => () => {
    this.props.sendCommand({ command, url: this.props.data.url });
  };

  render() {
    const { url, works } = this.props.data;
    return (
      <Table.Row key={url}>
        <Table.Cell>Тостер</Table.Cell>
        <Table.Cell>{url}</Table.Cell>
        <Table.Cell>
          <div>Режим: <Icon name={works ? 'circle' : 'circle outline'} color={works ? 'green' : 'black'} /></div>
        </Table.Cell>
        <Table.Cell>
          <Dropdown text='Команди'>
            <Dropdown.Menu>
              <Dropdown.Item text='+ Включити тостер' onClick={this.handleSendCommand('on')} />
              <Dropdown.Item text='- Вимкнути тостер' onClick={this.handleSendCommand('off')} />
            </Dropdown.Menu>
          </Dropdown>
        </Table.Cell>
      </Table.Row>
    )
  }
}

export default connect(
  {
    sendCommand: signal`sendCommand`,
  },
  Toaster,
);
