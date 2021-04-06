const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url='http://api.weatherstack.com/current?access_key=d2e0424c3c607ebf3cbb53f77f982b57&query='+encodeURIComponent(longitude)+','+encodeURIComponent(latitude)+'&units=m'
    request({url,json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to weather services',undefined);
        }else if(body.error){
            callback('unable to find location',undefined);
        }else{
            callback(undefined,{
                Weather_Description:body.current.weather_descriptions[0],
                Temperature:body.current.temperature,
                FeelsLike:body.current.feelslike
            })
        }     
    })
}

module.exports = forecast