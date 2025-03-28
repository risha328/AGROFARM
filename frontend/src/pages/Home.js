import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import OfferSection from '../components/OfferSection'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
      <CategoryList/>
      <BannerProduct/>
 <OfferSection/>
      <HorizontalCardProduct category={"fruits"} heading={"Top Selling Fruits"}/>
      <HorizontalCardProduct category={"flowers"} heading={"Recommended Flowers"}/>
      <HorizontalCardProduct category={"vegetables"} heading={"Top Selling Vegetables"}/>
     <HorizontalCardProduct category={"seeds"} heading={"Top Selling Seeds"}/>
     <WhyChooseUs/>
      <VerticalCardProduct category={"plants"} heading={"Plant Growth Promoters"}/>
      <VerticalCardProduct category={"pesticides"} heading={"Insecticides & Pesticides"}/>
      <VerticalCardProduct category={"fertilizers"} heading={"Fertilizers & Soil Conditioners"}/>
      <Testimonials/>
      <VerticalCardProduct category={"animals"} heading={"Animal Husbandry Products"}/>
      <VerticalCardProduct category={"tools"} heading={"Tools & Equipment"}/>
      <VerticalCardProduct category={"organics"} heading={"Organic & Specialty Items"}/>
      <VerticalCardProduct category={"machinaries"} heading={"Machinaries"}/>
      
      
      <Newsletter/>
    </div>
  )
}

export default Home


 