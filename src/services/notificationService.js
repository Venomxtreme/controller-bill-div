import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotifications() {
  await Notifications.requestPermissionsAsync();
}

export async function scheduleDespesaNotification(
  titulo,
  vencimento
) {
  const dataVencimento =
    new Date(vencimento);

  const umDiaAntes =
    new Date(dataVencimento);

  umDiaAntes.setDate(
    umDiaAntes.getDate() - 1
  );

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Despesa próxima do vencimento 💸",
      body: `${titulo} vence amanhã`,
    },

    trigger: umDiaAntes,
  });
}