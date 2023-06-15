import React from 'react';

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.username === 'example' && this.state.password === 'password') {
      // successful login
      this.setState({
        error: ''
      });
      console.log('Login successful');
    } else {
      // unsuccessful login
      this.setState({
        error: 'Invalid username or password'
      });
      console.log('Login failed');
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleInputChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default ClassComponent;
