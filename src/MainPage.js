import React from 'react';
import ReactDOM from 'react-dom';

class  MainPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    componentDidMount() {
        //TODO 这里请求异步更新数据
    }

    componentWillUnmount() {
    // TODO 消失的时候执行
    }
}

export  default  MainPage;
