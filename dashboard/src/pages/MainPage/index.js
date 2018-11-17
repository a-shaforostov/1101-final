/**
 * Component. Public page
 * @file
 */

import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Grid, Button, Form, Input, Icon, Message, Segment, Table } from 'semantic-ui-react'

import './MainPage.css';

import AddDevice from '../../components/AddDevice';
import Kettle from '../../components/Kettle';
import Thermostat from '../../components/Thermostat';
import Toaster from '../../components/Toaster';

class MainPage extends Component {
  handleChange = path => e => {
    this.props.updateField({ path, value: e.target.value });
  };

  render() {
    const { page, isConnected, error, devices } = this.props;
    return (
      page === 'main' &&
      <Grid centered>
        <Grid.Column>
          <Segment>
            {
              error &&
              <Message negative size='small'>
                <Message.Header>Сталася прикра помилка</Message.Header>
                <p>{error}</p>
              </Message>
            }
            {
              isConnected &&
              <Fragment>
                <AddDevice />
                <div><strong>Пристрої</strong></div>
                <Table celled padded>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Тип</Table.HeaderCell>
                      <Table.HeaderCell>Пристрій (Ім'я)</Table.HeaderCell>
                      <Table.HeaderCell>Стан</Table.HeaderCell>
                      <Table.HeaderCell>Команди</Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {
                      Object.entries(devices).map(([key, value]) => {
                        switch (value.type) {
                          case 'kettle': {
                            return (<Kettle data={{
                              ...value,
                              url: key,
                            }} />);
                          }
                          case 'thermostat': {
                            return (<Thermostat data={{
                              ...value,
                              url: key,
                            }} />);
                          }
                          case 'toaster': {
                            return (<Toaster data={{
                              ...value,
                              url: key,
                            }} />);
                          }
                          default: return null;
                        }
                      })
                    }
                  </Table.Body>
                </Table>

              </Fragment>
            }

          </Segment>
        </Grid.Column>
      </Grid>
    )
  }
}

export default connect(
  {
    page: state`data.page`,
    error: state`data.error`,
    devices: state`data.devices`,
    isConnected: state`data.isConnected`,
    updateField: signal`updateField`,
    getDevices: signal`getDevices`,
  },
  MainPage,
);
