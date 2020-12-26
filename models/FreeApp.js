var fetch=require('node-fetch');

class FreeApps{
    constructor(){

    }
    listAllApps(){
        let list=[{
            "Name":"Random Dog",
            "Image":"https://www.hindisoch.com/wp-content/uploads/2019/11/Cute-Dog-Pet-Taking-Bath-Image-Puppy-Photos-Whatsapp-DP.jpg",
            "Link":"/random-dog-image",
            "Text":"Checkout some cute random dog images"
        },
        {
            "Name":"Jokes",
            "Image":"https://www.funny-jokes.com/wp-content/uploads/2020/06/funny-joke-homepage-image.jpg",
            "Link":"/jokes",
            "Text":"Have a good read of Jokes on various topics."
        },
        {
            "Name":"Nasa",
            "Image":"https://banner2.cleanpng.com/20180509/clq/kisspng-nasa-insignia-logo-national-advisory-committee-for-5af2da39e26428.9819356315258650179273.jpg",
            "Link":"/nasa-mars",
            "Text":"Checkout Some Nice shots from Nasa's Mars Rover"
        }];

        return list;
    }

    async getRandomDogImage(){
        return await fetch("https://dog.ceo/api/breeds/image/random").then(res => res.json());
    }

    async getMarsImages(page_no){
        let nasa_api_key="mzL2W0zp3DvsMD7X36w1pmuzq0V31atZpPEbRSUS";
        //Parameters are sol, page, camera and api_key
        let result=await fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?page="+page_no+"&sol=1000&api_key="+nasa_api_key).then(res=>res.json());
        return result;
    }

    async getJokes(){
        return await fetch("https://official-joke-api.appspot.com/jokes/ten").then(res => res.json());
    }

}

module.exports=FreeApps;