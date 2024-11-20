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
  
const callNotify = (title, mess, icone) => {
    new Notification(title, { body: mess, icon: icone, });
}

export const showNotification = (lastMessage, icon) => {
    const text = getMessage(lastMessage.last_message);
    const sender = lastMessage.title;
    console.log('общ');
    if (Notification.permission === "granted") {
      callNotify(sender, text, icon);
      console.log('1');
      return;
    }
    if (Notification.permission !== "denied") {
      Notification.requestPermission((permission) => {
        if (permission === "granted") {
          callNotify(sender, text, icon);
          console.log('2');
        }
      });
      console.log('3');
      return;
    }
  }