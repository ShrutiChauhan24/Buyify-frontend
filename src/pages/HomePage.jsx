import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import TrustSignals from '../components/TrustSignals'
import FeatureCategories from '../components/FeatureCategories'
import NewArrivals from '../components/NewArrivals'
import CustomerOpinions from '../components/CustomerOpinions'
import NewsletterCTA from '../components/NewsletterCTA'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <>
      <Hero/>
      <TrustSignals/>
      <FeatureCategories/>
      <NewArrivals/>
      <CustomerOpinions/>
      <NewsletterCTA/>
     </>
  )
}

export default HomePage
