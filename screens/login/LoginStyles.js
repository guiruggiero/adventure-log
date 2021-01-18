import { StyleSheet } from "react-native";

import { colors } from "../GlobalStyles";

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20
  },
    topView: {
      flex: 0.3,
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%"
    },
      logoImage: {
        alignItems: "center",
        justifyContent: "center",
        width: "90%",
        height: "90%",
        resizeMode: "contain"
      },
    middleView: {
      flex: 0.4,
      justifyContent: "center",
      alignItems: "center",
      width: "100%"
    },
      inputRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: 15
      },
        inputLabel: {
          flex: 0.3,
          justifyContent: "flex-end",
          paddingRight: 5,
          textAlign: "right",
          fontSize: 10
        },
        inputText: {
          flex: 0.5,
          borderColor: colors.gray,
          paddingLeft: 5,
          borderBottomWidth: 1,
          fontSize: 18
        },
      bottomView: {
        flex: 0.3,
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start"
      },
        buttonContainer: {
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderColor: colors.gray,
          borderRadius: 6,
          backgroundColor: colors.blue,
          width: 100,
          height: 50
        },
          buttonText: {
            textAlign: "center",
            color: "white"
          }
});