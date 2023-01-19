import eventTypes from "../eventTypes.js";
import EventEmitter from "node:events";
import Notification from "../models/Notification.js";

const farmapEvents = new EventEmitter();

// save notification to db when someone follows a user ..
farmapEvents.on(eventTypes.followed, async (data) => {
  try {
    let res = data.data;

    let text = `${res.followed_by} followed you.`;
    let profile_pic = res.profile_pic

    const newNotification = new Notification({ text, user_id: res.user_id, profile_pic });

    await newNotification.save();
  } catch (error) {
    console.log(error);
  }
});

farmapEvents.on(eventTypes.upvoted, async (data) => {
  console.log(data)
})

export default farmapEvents;
