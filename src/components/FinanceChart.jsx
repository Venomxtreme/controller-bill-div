import {
  Dimensions,
} from "react-native";

import {
  BarChart,
} from "react-native-chart-kit";

import {
  useTheme,
} from "../hooks/useTheme";

export default function FinanceChart({
  data,
}) {

  const screenWidth = Dimensions.get("window").width;

  const { theme, darkMode } = useTheme();

  return (
    <BarChart
      data={data}
      width={screenWidth - 40}
      height={220}
      yAxisLabel="R$ "
      chartConfig={{
        decimalPlaces: 0,

        backgroundGradientFrom:
          theme.card,

        backgroundGradientTo:
          theme.card,

        color: (opacity = 1) =>
          `rgba(37, 99, 235, ${opacity})`,

        labelColor: (opacity = 1) =>
          darkMode
            ? `rgba(255,255,255,${opacity})`
            : `rgba(0,0,0,${opacity})`,
      }}

      style={{
        marginVertical: 20,
        borderRadius: 16,
      }}
    />
  );
}