import React from 'react'
import MainCarousel from '../../components/homeCarousel/MainCarousel'
import HomeSetionCarousel from '../../components/HomeSetionCarousel/HomeSetionCarousel.js'
import { women_dress } from '../../../Data/clothing/women_dress.js'
import { women_lehenga } from '../../../Data/clothing/women_lehenga.js'
import { women_salwar } from '../../../Data/clothing/women_salwar.js'
import { women_saree } from '../../../Data/clothing/women_saree.js'
import { women_gowns } from '../../../Data/clothing/women_gowns.js'
import { women_top } from '../../../Data/clothing/women_top.js'
const Store = () => {
    return(
        <div>
            <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">
                <HomeSetionCarousel data={women_lehenga} sectionName={"Lehenga"}/>
                <HomeSetionCarousel data={women_salwar} sectionName={"Salwar Kameez"}/>
                <HomeSetionCarousel data={women_saree} sectionName={"Saree"}/>
                <HomeSetionCarousel data={women_gowns} sectionName={"Gowns"}/>
                <HomeSetionCarousel data={women_top} sectionName={"Dresses"}/>
        
            </div>
        </div>


    )
} 
export default Store