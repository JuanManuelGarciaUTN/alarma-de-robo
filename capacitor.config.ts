import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.alarma.jmg',
  appName: 'alarma-de-robo',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    SplashScreen: {
      launchAutoHide: false,
    },
    DeviceMotion: {
      enabled: true
    }
  }
};

export default config;
