
import Progress from './Progress';
import React from 'react';
import ReactDOM from 'react-dom';

let duration = 200;
let percent = 0;
let percentInterval;
let max = 88;
let div = null;

const style = "position: fixed;left: 0;right: 0;top: 0;width: 100%"

let gprogress = {};

gprogress.render = function () {
    ReactDOM.render(
        <Progress
            showInfo={false}
            percent={percent}
            color={"danger"}
            duration={duration}
            onFinish={this.finished}
            backgroundTransparency
        />,
        div
    )
}

gprogress.start = function () {
    div = document.createElement("div");
    document.body.appendChild(div);
    console.log(div)
    div.setAttribute("style",style); 
    this.render();
    this.progress();
}


gprogress.underway=function(){ 
    percentInterval = setInterval(() => {
        if (percent < max) {
            percent = Math.min(percent + Math.random() * 10, max);
        } else if (percent === max) {
            percent = max;
        }
        this.render();
    }, duration); 
}

 
gprogress.progress=function(){
    this.underway();
}

gprogress.finished=function() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    clearInterval(percentInterval);
    if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
    }
    percent=0;
}

gprogress.end=function(){
    percent=100;
    this.render(); 
} 

export default gprogress;