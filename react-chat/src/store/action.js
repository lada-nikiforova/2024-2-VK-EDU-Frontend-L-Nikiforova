import { Centrifuge } from 'centrifuge';

let centrifuge;
let subscriptions = {};
const access_token = localStorage.getItem('access_token');
const headers = {
    'Authorization': `Bearer ${access_token}`,
};

export const connectToCentrifugo = (id, onMessageReceived) => {
    centrifuge = new Centrifuge('wss://vkedu-fullstack-div2.ru/connection/websocket/', {
      getToken: (ctx) =>
        new Promise((resolve, reject)  => {
            // console.log('Запрос токена:', JSON.stringify(ctx));
        fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/connect/', {
            
            body: JSON.stringify(ctx),
            method: 'POST',
            headers: headers,
        })
        .then((res) => {
            if (!res.ok) {
              throw new Error('Не удалось получить токен подключения');
            }
            return res.json();})
        .then((data) => { resolve(data.token)})
        .catch((err) => { reject(err)})
    })
    });

    console.log(access_token);
    centrifuge.connect();
    centrifuge.on('connect', (ctx) => console.log('Connected to Centrifugo', ctx));
    centrifuge.on('disconnect', (ctx) => console.log('Disconnected:', ctx));
    centrifuge.on('error', (err) => console.error('Centrifugo error:', err));

    const subscription = centrifuge.newSubscription(id, {
        getToken: (ctx) =>
          new  Promise((resolve, reject) =>
          fetch('https://vkedu-fullstack-div2.ru/api/centrifugo/subscribe/', {
            body: JSON.stringify(ctx),
            method: 'POST',
            headers: headers,
          })
          .then((res) => res.json())
          .then((data) => resolve(data.token))
          .catch((err) => reject(err))
      )
    });
    subscription.on('subscribe', (ctx) => {
        console.log('Subscribed successfully:', ctx);
    });
    subscription.on('publication', function (ctx) {
        if (onMessageReceived) {
            const { event, message } = ctx.data;
            console.log('dannye: ', ctx.data)
            onMessageReceived(event, message);
        }
    });
    subscription.subscribe();    
};

export const disconnectFromCentrifugo = () => {
  if (centrifuge) {
    Object.values(subscriptions).forEach((subscription) => {
      subscription.unsubscribe();
      subscription.removeAllListeners();
    });

    subscriptions = {};
    centrifuge.disconnect();
    centrifuge = null;
  }
};
