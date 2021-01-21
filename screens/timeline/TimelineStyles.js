import { StyleSheet } from "react-native";

import { colors } from "../GlobalStyles";

export const timelineStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: "#FFFFFF"
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
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      marginHorizontal: "1%"
    },
      card: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 20,
        padding: 30,
        // backgroundColor: colors.gray,
        borderRadius: 2,
        elevation: 3, // Android
        shadowOpacity: 0.23, // iOS
        shadowRadius: 2.62, // iOS
        shadowOffset: { width: 0, height: 2 } // iOS
      },
        iconDate: {
          flex: 0.2,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        },
          icon: {

          },
          date: {

          },
        textContainer: {
          flex: 0.8,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        },
          textSite: {
            flex: 0.7,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 18
          },
          textLocation: {
            flex: 0.3,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 12
          },
    fab: {
      position: 'absolute',
      margin: 35,
      right: 0,
      bottom: 0,
      backgroundColor: colors.orange
    }
});