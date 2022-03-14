import React, {Component} from "react";

class TOC extends Component {
    shouldComponentUpdate(newProps, newState) {
      if(this.props.data === newProps.data){//바뀐게 없으면
        return false;
      }
      return true;
    }
    render() {
        console.log('TOC render')
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i < data.length){
            lists.push(
            <li key={data[i].id}>
                <a
                 href={"/content/"+data[i].id}
                 data-id={data[i].id}
                 onClick={function(e){
                     e.preventDefault();
                     this.props.onChangePage(e.target.dataset.id);//target은 이벤트가 일어난 tag를 가리키고 data-어쩌고는 .dataset.어쩌고로 접근 가능
                 }.bind(this)}
                 >{data[i].title}</a>
            </li>);
            i = i+1;
        }

        //onClick()을 아래처럼 적어도 o
                //  onClick={function(id, e){
                //     e.preventDefault();
                //     this.props.onChangePage(e.target.dataset.id);//target은 이벤트가 일어난 tag를 가리키고 data-어쩌고는 .dataset.어쩌고로 접근 가능
                // }.bind(this, data[i].id)}

       return (
        <nav>
          <ul>
            {lists}
          </ul>
        </nav>
      );
    }
  }
  

  export default TOC;