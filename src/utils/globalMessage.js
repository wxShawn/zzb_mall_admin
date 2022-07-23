// 全局消息盒子
class GMessage {
  // 容器样式
  #containerStyle = `
    position: absolute;
    top: 30px;
    left: 50%;
    transform: translateX(-50%);
    padding: 5px;
    overflow: hidden;
  `
  // 消息盒子样式
  #boxStyle = `
    margin-bottom: 10px;
    padding: 0 30px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    box-shadow: 0 0 5px #bbb;
    transition: margin-top 0.3s;
  `
  
  #container = {};

  constructor() {
    // 实例化对象时创建一个消息盒子容器并添加到body末尾
    this.#container = document.createElement('div');
    this.#container.setAttribute('style', this.#containerStyle);
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(this.#container);
  }

  // 创建消息
  #createMsg(msg, type) {
    // 生成消息盒子
    const msgBox = document.createElement('div');
    msgBox.setAttribute('style', this.#boxStyle);
    msg = document.createTextNode(`${type}: ${msg}`);
    msgBox.appendChild(msg);
    switch (type) {
      case 'info':
        msgBox.style.background = '#dbebfd';
        msgBox.style.color = '#208df3';
        break;
      case 'sucsses':
        msgBox.style.background = '#daf0e4';
        msgBox.style.color = '#18a058';
        break;
      case 'warn':
        msgBox.style.background = '#fdf0db';
        msgBox.style.color = '#f3a320';
        break;
      case 'error':
        msgBox.style.background = '#f7dee3';
        msgBox.style.color = '#d73050';
        break;
      default:
        break;
    }
    // 生成清除浮动的盒子
    const clear = document.createElement('div');
    clear.setAttribute('style', 'clear: both');
    // 添加至body中
    this.#container.appendChild(msgBox);
    this.#container.appendChild(clear);
    // 定时删除
    setTimeout(() => {
      // 通过减小顶部边距来实现消失动画
      msgBox.style.marginTop = '-50px';
      // 动画结束后删除DOM
      setTimeout(() => {
        this.#container.removeChild(msgBox);
        this.#container.removeChild(clear);
      }, 500);
    }, 3000); 
  }

  info(msg) {
    this.#createMsg(msg, 'info');
  }

  sucsses(msg) {
    this.#createMsg(msg, 'sucsses');
  }

  warn(msg) {
    this.#createMsg(msg, 'warn');
  }

  error(msg) {
    this.#createMsg(msg, 'error');
  }
}

const gMessage = new GMessage();

export default gMessage;