import { StyleSheet } from "react-native";

import { colors } from "../GlobalStyles";

export const diveStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
    header: {
      flex: 0.05,
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
      padding: 10,
    },
      headerText: {
        fontSize: 22,
      },
    body: {
      flex: 0.8,
      alignItems: "stretch",
      justifyContent: "center",
      width: "100%",
    },
      // imageContainer: { // FLAG
      //   flex: 0.3,
      //   justifyContent: "flex-start",
      // },
      fieldsContainer: {
        flex: 1, // 0.7
        justifyContent: "flex-start",
      },
        fieldRow: {
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          paddingVertical: 5
        },
          fieldLabel: {
            flex: 0.6,
            justifyContent: "flex-start",
            textAlign: "right",
            fontSize: 20
          },
          fieldBox: {
            borderColor: colors.outline,
            borderWidth: 1,
            width: "70%", 
            height: 40, 
            fontSize: 20,
            padding: 5,
          },
    footer: {
      flex: 0.15,
      justifyContent: "flex-start",
      alignItems: "center",
    },
      footerButtonContainer: {
        flexDirection: "row",
        justifyContent: "space-around"
      },
        footerButton: {
          flex: 0.2,
          borderRadius: 12,
          borderColor: colors.outline,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          marginHorizontal: "5%",
          backgroundColor: colors.primaryDark
        },
          footerButtonText: {
            textAlign: "center",
            color: "white"
          }
});