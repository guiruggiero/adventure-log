import { StyleSheet } from "react-native";

export const cameraStyles = StyleSheet.create({
  container: {
    flex: 1
  },
    camera: {
      flex: 1,
      backgroundColor: "transparent",
      flexDirection: "row"
    },
      flip: {
        flex: 0.1,
        alignSelf: "flex-end",
        alignItems: "center"
      },
        flipText: {
          fontSize: 18,
          marginBottom: 10,
          color: "white"
        }
});