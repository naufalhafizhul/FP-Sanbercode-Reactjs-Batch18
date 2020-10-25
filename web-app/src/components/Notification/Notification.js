import { notification } from 'antd';

const Notification = (notifType, title, description) => {
    notification[notifType]({
        message: title,
        description: description,
        duration: 3,
        onClick: () => {
            console.log('Notification Clicked!');
        },
    });
};

export default Notification;