import { StyleSheet } from "react-native";

import { colors } from "../GlobalStyles";

export const timelineStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
    body: {
      flex: 0.85,
      alignItems: "stretch",
      justifyContent: "center",
      width: "100%",
      padding: "5%",
    },
      listContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch", // this turns out to be important!
        padding: 15,
      },
        separator: {
          width: "100%", 
          height: 1, 
          backgroundColor: colors.blue
        },
        listDiveContainer: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
        },
          listDiveTextContainer: {
            flex: 0.9,
            flexDirection: "row",
            justifyContent: "flex-start",
          },
            listDiveText: {
              fontSize: 18,
            },
          listDiveButtonContainer: {
            flex: 0.1,
            flexDirection: "row",
            justifyContent: "space-between",
          },
    footer: {
      flex: 0.15,
      justifyContent: "flex-start",
      alignItems: "center",
    },
});