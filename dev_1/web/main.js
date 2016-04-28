var App = React.createClass({

  getInitialState: function () {
    return {
        message : "",
        savedMessages: []
    };
  },

  updateMessage: function(_message) {
    this.setState({ message: _message});
  },

  saveMessage: function(message) {
      var messages = this.state.savedMessages.concat(message);
      this.setState({ savedMessages: messages });
  },

  render: function() {
    return (
      <div>
        <MessageInput onChange={this.updateMessage}
                      onSave={this.saveMessage} />
        <Message message={this.state.message}
            savedMessages={this.state.savedMessages} />
      </div>
    );
  }
});

var MessageInput = React.createClass({
    _onChange: function(e) {
        this.props.onChange(e.target.value);
    },

    _onKeyDown: function (e) {
        if (e.keyCode === 13) {
            this.props.onSave(e.target.value);
            e.target.value = "";
        }
    },

    render: function() {
        return <input type="text" onChange={this._onChange}
                                  onKeyDown={this._onKeyDown} />;
    }
});

var Message = React.createClass({
  render: function() {
    var key = 0;
    var messages = this.props.savedMessages.map(
        function (message) {
            return <li key={key++}>{message}</li>;
        }
    );
    return (
        <div>
            <p>{this.props.message}</p>
            <ul>{messages}</ul>
        </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('app-container')
);