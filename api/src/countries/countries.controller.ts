import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
@Controller('countries')
export class CountriesController {
    constructor(private readonly countriesService: CountriesService){}

    @Get()
    getAllCountries(){
        return this.countriesService.getAll()
    }
    
    @Get(':id')
    getInfoAboutCountry(@Param('id') id: string) {
        return this.countriesService.getCountryInfo(id);
    }

}
