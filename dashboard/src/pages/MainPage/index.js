/**
 * Component. Public page
 * @file
 */

import React, { Component, Fragment } from "react";
import { connect } from "@cerebral/react";
import { state, signal } from 'cerebral/tags';
import { Grid, Button, Form, Input, Icon, Message, Segment } from 'semantic-ui-react'

import './MainPage.css';

class MainPage extends Component {
  handleChange = path => e => {
    this.props.updateField({ path, value: e.target.value });
  };

  render() {
    const { page, login, isConnected, sessionId, jira, error } = this.props;
    const url = `${window.location.origin}/${sessionId}`;
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
                {
                  <Form className="observer__login">
                    <Form.Field>
                      <Input icon={{name: 'asterisk', color: 'red'}} label="Ім'я ведучого:" type="text" value={login}
                             onChange={this.handleChange('data.login')}/>
                    </Form.Field>
                    <div><b>Інтеграція з Jira:</b></div>
                    <Form.Field>
                      <Input label="Jira url:" type="text" value={jira} onChange={this.handleChange('data.jira')}/>
                    </Form.Field>
                    <Form.Field>
                      <Input label="Логін:" type="text" value={jira} onChange={this.handleChange('data.jira')}/>
                    </Form.Field>
                    <Form.Field>
                      <Input className="pass__input" label="Пароль:" type="password" value={jira}
                             onChange={this.handleChange('data')}/>
                    </Form.Field>
                  </Form>
                }
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
    isConnected: state`data.isConnected`,
    updateField: signal`updateField`,
  },
  MainPage,
);
