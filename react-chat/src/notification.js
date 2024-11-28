const getMessage = (lastMessage) => {
    if (lastMessage.files.length > 0) {
      return "Фото"
    }
    else if (lastMessage.voice) {
      return "Голосовое сообщение"
    }
    else {
      return lastMessage.text
    }
  }
  
const callNotify = (title, mess) => {
    new Notification(title, { body: mess });
}

export const showNotification = (lastMessage) => {
    const text = getMessage(lastMessage);
    const sender = lastMessage.sender.username;
    console.log('общ');
    if (Notification.permission === "granted") {
      callNotify(sender, text);
      console.log('1');
      return;
    }
    if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          callNotify(sender, text);
          console.log('2');
        }
      });
      console.log('3');
      return;
    }
  }