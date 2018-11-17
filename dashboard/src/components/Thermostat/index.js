/**
 * Component. Thermostat
 * @file
 */

import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Table, Button, Form, Input, Icon, Message, Segment, Dropdown } from 'semantic-ui-react'

class Thermostat extends Component {
  handleSendCommand = command => () => {
    this.props.sendCommand({ command, url: this.props.data.url });
  };

  handleRemove = () => {
    this.props.remove({ url: this.props.data.url });
  };

  render() {
    const { url, floorHeating, airConditioning, floorTemp, airTemp, floorTarget, airTarget, pending } = this.props.data;
    return (
      <Table.Row key={url}>
        <Table.Cell>
          Термостат
          {
            pending &&
            <Icon loading name='asterisk' />
          }
        </Table.Cell>
        <Table.Cell>{url}</Table.Cell>
        <Table.Cell>
          <div>Режим пола: <Icon name={floorHeating ? 'circle' : 'circle outline'} color={floorHeating ? 'green' : 'black'} /></div>
          <div>Режим кондиціонування: <Icon name={airConditioning ? 'circle' : 'circle outline'} color={airConditioning ? 'green' : 'black'} /></div>
          <div>Температура пола: {floorTemp}</div>
          <div>Температура повітря: {airTemp}</div>
          <div>Бажана температура пола: {floorTarget}</div>
          <div>Бажана температура повітря: {airTarget}</div>
        </Table.Cell>
        <Table.Cell>
          <Dropdown text='Команди'>
            <Dropdown.Menu>
              <Dropdown.Item text='+ Включити обігрів пола' onClick={this.handleSendCommand('floorOn')} />
              <Dropdown.Item text='- Вимкнути обігрів пола' onClick={this.handleSendCommand('floorOff')} />
              <Dropdown.Item text='+ Включити кондиціонування' onClick={this.handleSendCommand('airOn')} />
              <Dropdown.Item text='- Вимкнути кондиціонування' onClick={this.handleSendCommand('airOff')} />
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
  Thermostat,
);
