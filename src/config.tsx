interface AppConfig {
  API_URL: string;
}

const prodConfig: AppConfig = {
  API_URL:  `${window.location.protocol}//${window.location.host.replace('3000' , '5000')}`,
};

 

export const googleapi = 'https://www.googleapis.com/oauth2/v3/userinfo'

export const config = prodConfig

  