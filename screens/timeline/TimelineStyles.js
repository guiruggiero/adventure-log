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
    //     justifyContent: "center"
    //   },
    //   searchBar: {
    //     flex: 0.70,
    //     alignItems: "stretch",
    //     justifyContent: "center"
    //   },
    //   filterIcon: {
    //     flex: 0.15,
    //     alignItems: "stretch",
    //     justifyContent: "center"
    //   },
    body: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "stretch",
      marginHorizontal: 10
    },
      card: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 10, // between cards
        borderRadius: 5,
        elevation: 3, // Android
        shadowOpacity: 0.23, // iOS
        shadowRadius: 2.62, // iOS
        shadowOffset: {width: 0, height: 3} // iOS
      },
        iconDate: {
          flex: 0.15,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 15,
          marginLeft: 15
        },
          monthDay: {
            fontSize: 16,
            fontWeight: "bold"
          },
          year: {
            fontSize: 18
          },
        textContainer: {
          flex: 0.85,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          margin: 15
        },
          textSite: {
            fontSize: 28,
            fontWeight: "bold"
          },
          textLocation: {
            fontSize: 23
          },
    footer: {
      position: 'absolute',
      margin: 35,
      right: 0,
      bottom: 0
    },
      fab: {
        backgroundColor: colors.orange
      }
});