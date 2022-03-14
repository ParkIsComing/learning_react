import React, {Component} from "react";

class UpdateContent extends Component {
    constructor(props){
      super(props);
      this.state={
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc
      }
      this.inputFormHandler = this.inputFormHandler.bind(this);
    }
    inputFormHandler(e) {
      this.setState({
        [e.target.name]:e.target.value
      });
    }
     render() {
        return (
            <article>
              <h2>Update</h2>
              <form action="/create_process" method="post" 
              onSubmit={function(e) {
                e.preventDefault();
                this.props.onSubmit(
                  this.state.id,
                  this.state.title,
                  this.state.desc
                );
              }.bind(this)}>
                <input type="hidden" name="id" value={this.state.id}></input>
                <p><input 
                  type="text" 
                  name="title" 
                  placeholder="title"
                  value={this.state.title}//props로 넣으면 안되니까 컴포넌트 내에 this.state 또 만들어서 state로 할당
                  onChange={this.inputFormHandler}
                  ></input></p>
                <p><textarea
                   name="desc" 
                   placeholder="description"
                   value={this.state.desc}
                   onChange={this.inputFormHandler}
                   ></textarea></p>
                <p><input type="submit"></input></p>
              </form>
            </article>
      );
    }
  }

  export default UpdateContent;