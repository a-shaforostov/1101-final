/**
 * Component. AddDevice
 * @file
 */

import React, { Component } from 'react';
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Grid, Button, Form, Input, Icon, Message, Segment } from 'semantic-ui-react'

import './AddDevice.css';

class AddDevice extends Component {
  handleChange = path => e => {
    this.props.updateField({ path, value: e.target.value });
  };

  render() {
    const { newIp, newPort } = this.props;
    return (
      <Form className="">
        <div><strong>Додати новий пристрій</strong></div>
        <Form.Group>
          <Input icon={{name: 'asterisk', color: 'red'}} label="IP:" type="text" value={newIp} className="ip-input"
                 onChange={this.handleChange('data.newIp')}/>
          <Input icon={{name: 'asterisk', color: 'red'}} label="PORT:" type="text" value={newPort} className="port-input"
                 onChange={this.handleChange('data.newPort')}/>
          <Button color="green" onClick={this.props.addDevice}>
            <Icon name="plus" color="white"/>
          </Button>
        </Form.Group>
      </Form>
    )
  }
}

export default connect(
  {
    newIp: state`data.newIp`,
    newPort: state`data.newPort`,
    updateField: signal`updateField`,
    addDevice: signal`addDevice`,
  },
  AddDevice,
);
