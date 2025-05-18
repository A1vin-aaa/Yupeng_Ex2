// index.js
import 'react-native-gesture-handler';               // must come first
import { registerRootComponent } from 'expo';        // Expo helper
import App from './App';                             // your single-file App.js

registerRootComponent(App);                         // registers "main" component
