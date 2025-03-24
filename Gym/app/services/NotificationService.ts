import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Register for push notifications
export const registerForPushNotificationsAsync = async () => {
  if (!Device.isDevice) {
    console.log('Must use physical device for push notifications');
    return;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!');
    return;
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  if (!projectId) {
    console.log('Project ID not found');
    return;
  }

  try {
    const { data: pushToken } = await Notifications.getExpoPushTokenAsync({ projectId });
    console.log('Expo Push Token:', pushToken);
    return pushToken;
  } catch (error) {
    console.error('Error getting Expo push token:', error);
  }
};

// ✅ Save incoming notifications to AsyncStorage
export const saveNotification = async (notification: Notifications.Notification) => {
  try {
    const storedNotifications = await AsyncStorage.getItem('notifications');
    const notifications = storedNotifications ? JSON.parse(storedNotifications) : [];

    // Add new notification
    const newNotification = {
      id: notification.request.identifier,
      title: notification.request.content.title,
      body: notification.request.content.body,
      date: new Date().toISOString(),
    };

    const updatedNotifications = [newNotification, ...notifications];
    await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  } catch (error) {
    console.error('Error saving notification:', error);
  }
};

// ✅ Notification listener
export const setupNotificationListener = () => {
  Notifications.addNotificationReceivedListener(async (notification) => {
    console.log('Notification received:', notification);
    await saveNotification(notification);
  });

  Notifications.addNotificationResponseReceivedListener(async (response) => {
    console.log('Notification response received:', response);
    await saveNotification(response.notification);
  });
};
