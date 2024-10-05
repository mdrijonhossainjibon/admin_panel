class CountryISO {
    private langDataCache: { [lang: string]: any } = {};
  
    private getLangData(lang: string): any {
      try {
        if (!this.langDataCache[lang]) {
          this.langDataCache[lang] = require(`langs/${lang.toLocaleLowerCase()}.json`);
        }
        return this.langDataCache[lang];
      } catch (error) {
        return null; // Return null if there's an error
      }
    }
  
    public getName(code: string, lang: string): string | undefined {
      try {
        const langData = this.getLangData(lang);
        if (!langData) return undefined;
        return langData.countries[code.toLocaleUpperCase()];
      } catch (error) {
        return undefined;
      }
    }
  
    public getCountryOptions(lang: string): Array<{ label: string; value: string }> {
      try {
        const langData = this.getLangData(lang);
        if (!langData) return []; // Return an empty array if there's an error
        return Object.keys(langData.countries).map((code) => ({
          label: langData.countries[code],
          value: langData.countries[code],
        }));
      } catch (error) {
        return []; // Return an empty array if there's an error
      }
    }

    public getCountryOptionsFilter(lang: string): Array<{ text: string; value: string }> {
      try {
        const langData = this.getLangData(lang);
        if (!langData) return []; // Return an empty array if there's an error
        return Object.keys(langData.countries).map((code) => ({
          text: langData.countries[code],
          value: langData.countries[code],
        }));
      } catch (error) {
        return []; // Return an empty array if there's an error
      }
    }

    
    public getCityOptions() {
        
    }
  }
  
  export const countryISO = new CountryISO();
  