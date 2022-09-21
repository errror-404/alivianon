import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import EmailScreen from "../screens/EmailScreen";
import CodeScreen from "../screens/CodeScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";

const AuthStack = createStackNavigator();

const AuthStackNav = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="EmailScreen" component={EmailScreen} />
      <AuthStack.Screen name="CodeScreen" component={CodeScreen} />
      <AuthStack.Screen
        name="NewPasswordScreen"
        component={NewPasswordScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNav;
