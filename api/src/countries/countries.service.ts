import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
    constructor(private readonly httpService: HttpService) {}

    private parseObjAndFindById(data: any, id: string, filter: "iso2" | "iso3"){
        return data.find((obj) => obj[filter] == id)
    }

    async getAll(){
        try {
            const data = await firstValueFrom(this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'))
            return data.data
          } catch (error){
            throw new InternalServerErrorException('Failed to load countries', error.message);
          }
    }

    async getCountryInfo(id: string){
        const returnObject = {
            name: '',
            listOfBorders: [],
            populationData: null,
            flagImgUrl: ''
        }
        const borderResponse = await firstValueFrom(this.httpService.get(`https://date.nager.at/api/v3/CountryInfo/${id}`))
        const populationResponse = await firstValueFrom(this.httpService.get(`https://countriesnow.space/api/v0.1/countries/population`))
        const flagUrlResponse = await firstValueFrom(this.httpService.get(`https://countriesnow.space/api/v0.1/countries/flag/images`))
        const flagObj = this.parseObjAndFindById(flagUrlResponse.data.data, id, "iso2") 
        const populationObj = this.parseObjAndFindById(populationResponse.data.data, flagObj.iso3, "iso3")
        returnObject.name = borderResponse.data.commonName
        returnObject.listOfBorders = borderResponse.data.borders
        returnObject.populationData = populationObj.populationCounts
        returnObject.flagImgUrl = flagObj.flag
        return returnObject
    }
}
