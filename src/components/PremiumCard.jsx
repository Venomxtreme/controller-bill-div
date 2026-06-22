import Animated, {
    FadeInDown,
} from "react-native-reanimated";

export default function PremiumCard({

  children,

  delay = 0,

  style,

}) {

  return (

    <Animated.View

      entering={
        FadeInDown
          .delay(delay)
          .duration(700)
      }

      style={style}
    >
      {children}
    </Animated.View>
  );
}