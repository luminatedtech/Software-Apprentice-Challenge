import React, {useEffect, useState} from 'react';
import CardContainer from './CardContainer';
import './App.css';

function App() {
  useEffect(()=> {
    fetch("http://localhost:3000/fakeDataSet")
    .then((r)=>r.json())
    .then((data)=>  {
      const keyMapping = {
        "campaign_name" : "campaign",
        "utm_campaign" : "campaign"
      ,  "media_buy_name" : "ad_group",
        "ad_squad_name" : "ad_group",
        "utm_medium" : "ad_group",
        "spend" : "cost",
        "post_clicks" : "clicks",
        "image_name" : "creative_name",
        "ad_name" : "creative_name",
        "utm_content" : "creative_name",
      
      
       }
    const combinedArray = [
      ...data.facebook_ads,
      ...data.twitter_ads,
      ...data.snapchat_ads,
    ];
    const googleAnalyticsArray = [...data.google_analytics]
    const modifiedData = combinedArray.map((ad)=> {
      const modifiedAd = {}
      for (const key in ad) {
        if (keyMapping[key]){
          modifiedAd[keyMapping[key]] = ad[key]
        }
        else {
          modifiedAd[key] = ad[key]
        }
      }
      return modifiedAd
     })
  
     const mergedArray = modifiedData.map(ad1 => {
      const matchingAd = googleAnalyticsArray.find(ad2 => 
        ad2.utm_campaign === ad1.campaign &&
        ad2.utm_medium === ad1.ad_group &&
        ad2.utm_content === ad1.creative_name
        
     )
 
     if (matchingAd) {
      return ({...ad1, results: matchingAd.results})
     }
     else {
      return ad1
     }
    })
     console.log(mergedArray)
    setAdvertisementData(mergedArray)})
  },[])
  const [advertisementData, setAdvertisementData] = useState([])


console.log(advertisementData)
  return (
    <div className="bg-primary w-full h-full">
        <CardContainer adData={advertisementData}/>
    </div>
  );
} 

export default App;
