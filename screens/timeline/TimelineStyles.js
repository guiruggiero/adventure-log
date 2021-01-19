import { StyleSheet } from "react-native";

import { colors } from "../GlobalStyles";

export const timelineStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "stretch",
    justifyContent: "flex-start"
  },
    // header: {
    //   flex: 0.15,
    //   flexDirection: "row",
    //   alignItems: "stretch",
    //   justifyContent: "center",
    //   width: "100%",
    //   padding: "2.5%"
    // },
    //   menuIcon: {
    //     flex: 0.15,
    //     alignItems: "stretch",
    //     justifyContent: "center",
    //   },
    //   searchBar: {
    //     flex: 0.70,
    //     alignItems: "stretch",
    //     justifyContent: "center",
    //   },
    //   filterIcon: {
    //     flex: 0.15,
    //     alignItems: "stretch",
    //     justifyContent: "center",
    //   },
    body: {
      flex: 0.85,
      alignItems: "stretch",
      justifyContent: "center",
      width: "100%",
      padding: "2.5%"
    },
      listContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch", // this turns out to be important!
        padding: 15
      },
        separator: {
          width: "100%", 
          height: 1, 
          backgroundColor: colors.blue
        },
        listLogContainer: {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10
        },
          listLogTextContainer: {
            flex: 0.9,
            flexDirection: "row",
            justifyContent: "flex-start"
          },
            listLogText: {
              fontSize: 18
            },
          listLogButtonContainer: {
            flex: 0.1,
            flexDirection: "row",
            justifyContent: "space-between"
          },
    footer: {
      flex: 0.15,
      justifyContent: "flex-start",
      alignItems: "center"
    },
      fab: {
        position: 'absolute',
        margin: 40,
        right: 0,
        bottom: 0,
        backgroundColor: colors.orange
      }
});