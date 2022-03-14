import React, {Component} from 'react';
import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import Control from './components/Control';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';



class App extends Component {
  constructor(props) {//render() 보다 먼저 실행
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id:1,
      subject: {title: 'WEB', sub: 'World Wide Web!'},
      welcome: {title:'Welcome', desc: 'Hello, React'},
      contents: [
        {id:1, title:'HTML', desc: 'HTML is for information'},
        {id:2, title:'CSS', desc: 'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }

  getReadContent(){
    var i = 0;
      while(i < this.state.contents.length){
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          return data;
        }
        i = i + 1;
      }
  }
  getContent() {
    var _title, _desc, _article= null;
     if(this.state.mode ===  'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if(this.state.mode === 'read'){
        var _content = this.getReadContent();
        _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else if(this.state.mode === 'create'){
      _article = <CreateContent onSubmit={
        function(_title, _desc) {
          //setState()를 사용해 새로운 content추가
          this.max_content_id = this.max_content_id+1;
          //원본데이터를 바꾸지 않으면서 state에 추가하는 방법 
          // var _contents = this.state.contents.concat({id: this.max_content_id, title:_title, desc:_desc})
          var _contents = Array.from(this.state.contents);
          _contents.push({id: this.max_content_id, title:_title, desc: _desc});
          this.setState(
            {contents: _contents,
             mode: 'read',
             selected_content_id: this.max_content_id
            });
          
        }.bind(this)
      }></CreateContent>
    }
    else if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function(_id, _title, _desc) {//setState()를 사용해 새로운 content추가
          //원본데이터를 바꾸지 않으면서 state에 추가하는 방법 
          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length){
            if(_contents[i].id === _id) {
              _contents[i] = {id:_id, title:_title, desc:_desc};
              break;
            }
            i = i + 1;
          }
          this.setState(
            {contents: _contents, mode: 'read'}
          );
          
        }.bind(this)
      }></UpdateContent>
    }

    return _article;

  }

  render() {
    return (
      <div className='App'>
        <Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}
          onChangePage = {function() {
            this.setState({mode: 'welcome'});
          }.bind(this)}
        >
        </Subject>  
        <TOC 
          onChangePage={function(id){
            this.setState({
              mode:'read',
              selected_content_id: Number(id)//id가 문자열로 전달되어서 숫자로 바꿔줌
            });
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>
        <Control
          onChangeMode={function(_mode){//create, update, delete 중 클릭한 게 delte이면 if부분으로, 아니면 else부분으로 mode만 바꿔줌
            if(_mode === 'delete'){
              if(window.confirm('Seriously?')){
                var _content = Array.from(this.state.contents);//contents배열 복제
                var i = 0;
                while(i<_content.length){
                  if(_content[i].id === this.state.selected_content_id){
                    _content.splice(i,1);
                    break;
                  }
                  i = i+1;
                }
                this.setState({contents: _content, mode: 'welcome'});
                alert('deleted');
              }
            }
            else{
              this.setState({
                mode: _mode
              });
            }
            
          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;
