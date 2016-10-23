# spa_demo

This application includes:
 - Token-based authentication with Google account using [Satellizer](https://github.com/sahat/satellizer/)
 - Usefull search food, creating and editing your own FoodLog using [Nutrionix API](https://developer.nutritionix.com/)
 - Possibility to determine your location via the app and search for the restaurants in a radius of 4 km from your position using [Google Map API](https://developers.google.com/maps/documentation/javascript/?hl=ru)


## If you dont want to waste time just visit this app on GitHub Pages: https://stereojeka.github.io/spa_demo/


For using this application you should:
 1. Clone this repository to your workplace
 2. Obtaining OAuth Keys
    <img src="https://camo.githubusercontent.com/204e6b07369021b5b9eb7d228d051aca72a457ef/68747470733a2f2f75706c6f61642e77696b696d656469612e6f72672f77696b6970656469612f636f6d6d6f6e732f7468756d622f322f32662f476f6f676c655f323031355f6c6f676f2e7376672f3130303070782d476f6f676c655f323031355f6c6f676f2e7376672e706e67" width="150">
    - Visit [Google Developer Console](https://console.developers.google.com/iam-admin/projects)
    - Click **CREATE PROJECT** button
    - Enter *Project Name*, then click **CREATE**
    - Then select *APIs & auth* from the sidebar and click on *Credentials* tab
    - Click **CREATE NEW CLIENT ID** button
     - **Application Type**: Web Application
     - **Authorized Javascript origins**: *http://localhost:3000*
     - **Authorized redirect URI**: *http://localhost:3000*

    **Note:** Make sure you have turned on **Contacts API** and **Google+ API** in the *APIs* tab.
  
 3.In "app.js" file change "clientId" and "redirectUri" to your values
 4. Visit https://developers.google.com/maps/documentation/javascript/?hl=ru to get your own API key
 5. Insert "<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>" into "index.html" with your "YOUR_API_KEY"
 6. Enjoy!   
 
