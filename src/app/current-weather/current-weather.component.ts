import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface WeatherResponse {
  coord: Coord,
  weather: Weather,
  base: string,
  main: Main,
  visibility: number,
  wind: Wind,
  clouds: Clouds,
  dt: number,
  sys: Sys,
  timezone: number,
  id: number,
  name: string,
  cod: number
}

interface Coord {
  lon: number,
  lat: number
}

interface Weather {
  id: number,
  main: string,
  description: string,
  icon: string
}

interface Main {
  temp: number,
  feels_like: number,
  temp_min: number,
  temp_max: number,
  pressure: number,
  humidity: number
}

interface Wind {
  speed: number,
  deg: number
}

interface Clouds {
  all: number
}

interface Sys {
  type: number,
  id: number,
  country: string,
  sunrise: number,
  sunset: number
}

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css']
})
export class CurrentWeatherComponent implements OnInit {

  weatherResponse: WeatherResponse[] = [];
  values: any = [];
  keys: any = [];
  coord: any = [];
  weather: any = [];
  main: any = [];
  wind: any = [];
  clouds: any = [];
  rain: any = [];
  snow: any = [];
  dt: number = 0;
  sys: any = [];

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<WeatherResponse[]>('https://api.openweathermap.org/data/2.5/weather?q=Bucharest&appid=400eeadc921bc85d05baffffa5663217&units=metric')
    .subscribe(
      (response) => {
        console.log('response received')
        this.weatherResponse = response
        this.keys = this.getKeys(this.weatherResponse)
        this.values = this.getValues(this.weatherResponse)
        this.coord = this.getCoord(this.values[0])
        this.weather = this.getWeather(this.values[1][0])
        this.main = this.getMain(this.values[3])
        this.wind = this.getWind(this.values[5])
        if (this.keys.indexOf('rain') > -1) {
          this.rain = this.getRain(this.values[this.keys.indexOf('rain')])
        }
        if (this.keys.indexOf('snow') > -1) {
          this.snow = this.getSnow(this.values[this.keys.indexOf('snow')])
        }
        this.clouds = this.getClouds(this.values[this.keys.indexOf('clouds')])
        this.dt = this.values[this.keys.indexOf('dt')] * 1000
        this.sys = this.getSys(this.values[this.keys.indexOf('sys')])
        console.log(this.weatherResponse)
      },
      (error) => {
        console.error('Request failed with error')
        alert(error);
      },
      () => {
        console.log('Request completed')
      }
    )
  }

  getKeys(obj: any): Array<string> {
    return Object.keys(obj);
  }

  getValues(obj: any): Array<string> {
    return Object.values(obj);
  }

  getCoord(obj: any): Array<number> {
    return Object.values(obj);
  }

  getWeather(obj: any): Array<string> {
    return Object.values(obj);
  }

  getMain(obj: any): Array<number> {
    return Object.values(obj);
  }

  getWind(obj: any): Array<number> {
    return Object.values(obj);
  }

  getClouds(obj: any): Array<number> {
    return Object.values(obj);
  }

  getRain(obj: any): Array<number> {
    return Object.values(obj);
  }

  getSnow(obj: any): Array<number> {
    return Object.values(obj);
  }

  getSys(obj: any): Array<number> {
    return Object.values(obj);
  }

}
