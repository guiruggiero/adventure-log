import React from "react";
import { TextInput, Text, View, Image, TouchableOpacity, KeyboardAvoidingView, Alert} from "react-native";

import { loginStyles } from "./LoginStyles";
import { getDataModel } from "../../DataModel";

export class Login extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();

    this.state = {
      mode: "login",
      emailInput: "",
      displayNameInput: "",
      passwordInput: "",
      passwordCheckInput: ""
    }
  }

  // execute every time the screen receives focus
  componentDidMount = () => {
    this.focusUnsubscribe = this.props.navigation.addListener("focus", this.onFocus);
  }
  onFocus = () => {
    this.dataModel.loadLogs();
  }
  componentWillUnmount = () => {
    this.focusUnsubscribe();
  }

  onCreateAccount = async () => {
    // pending:
    //    check that this is a valid email
    //    check password rules
    //    check that passwords match
    //    check that displayName isn't empty

    // check that user doesn't already exist
    let users = this.dataModel.getUsers();
    for (let user of users) {
      if (user.email === this.state.emailInput) {
        Alert.alert(
          "Duplicate user",
          "User " + this.state.emailInput + " already exists",
          [{text: "OK", style: "OK"}]
        );

        return;
      } 
    }
    
    // if user doesn't exists
    let newUser = await this.dataModel.addUser(
      this.state.emailInput,
      this.state.passwordInput,
      this.state.displayNameInput
    );

    this.dataModel.cleanLogs(); // wipe data model clean
    this.props.navigation.navigate("Timeline", { // Home
      currentUser: newUser
    });
  }

  onLogin = () => {
    let users = this.dataModel.getUsers();
    let email = this.state.emailInput;
    let pass = this.state.passwordInput;

    for (let user of users) {
      if (user.email === email) {
        if (user.password === pass) {
          this.dataModel.cleanLogs(user.key); // remove logs from other users
          this.props.navigation.navigate("Timeline", { // Home
            currentUser: user
          });

          return;
        }
      }
    }

    // no user match
    Alert.alert(
      "Login failed",
      "No match found for this email and password",
      [{text: "OK", style: "OK"}]
    );
  }

  render() {
    return (
      <KeyboardAvoidingView 
        style={loginStyles.container}
        behavior={"height"}
        keyboardVerticalOffset={10}
      >
        <View style={loginStyles.topView}>
          <Image 
            source={require("../../assets/logo.png")}
            style={loginStyles.logoImage}
          />
        </View>

        <View style={loginStyles.middleView}>
          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>
              Email:
            </Text>

            <TextInput
              style={loginStyles.inputText}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              autoCompleteType="email"
              value={this.state.emailInput}
              onChangeText={(text)=>{this.setState({emailInput: text})}}
            />
          </View>

          {this.state.mode === "create" ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>
                Display name:
              </Text>

              <TextInput
                style={loginStyles.inputText}
                autoCapitalize="words"
                autoCorrect={false}
                textContentType="name"
                autoCompleteType="name"
                value={this.state.displayNameInput}
                onChangeText={(text)=>{this.setState({displayNameInput: text})}}
              />
            </View>
          ):(
            <View/>
          )}

          <View style={loginStyles.inputRow}>
            <Text style={loginStyles.inputLabel}>
              Password:
            </Text>

            <TextInput
              style={loginStyles.inputText}
              keyboardType="numeric"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              autoCompleteType="password"
              value={this.state.passwordInput}
              onChangeText={(text)=>{this.setState({passwordInput: text})}}
            />
          </View>

          {this.state.mode === "create" ? (
            <View style={loginStyles.inputRow}>
              <Text style={loginStyles.inputLabel}>
                Repeat password:
              </Text>

              <TextInput
                style={loginStyles.inputText}
                keyboardType="numeric"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="password"
                autoCompleteType="off"
                value={this.state.passwordCheckInput}
                onChangeText={(text)=>{this.setState({passwordCheckInput: text})}}
              />
            </View>
          ):(
            <View/>
          )}
        </View>

        {this.state.mode === "login" ? (
          <View style={loginStyles.bottomView}>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{this.setState({mode: "create"})}}
            >
              <Text style={loginStyles.buttonText}>Create account</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={this.onLogin}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>
        ):(
          <View style={loginStyles.bottomView}>
            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={()=>{this.setState({mode: "login"})}}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={loginStyles.buttonContainer}
              onPress={this.onCreateAccount}
            >
              <Text style={loginStyles.buttonText}>Create</Text>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    )
  }
}