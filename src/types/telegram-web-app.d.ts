// telegram-web-app.d.ts
interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }
  
  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user: TelegramUser;
      query_id: string;
      auth_date: number;
      hash: string;
    };
    close: () => void;
  }
  
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
  