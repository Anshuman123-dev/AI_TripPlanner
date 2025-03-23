export const SelectTravelsList = [
    {
        id:1,
        title:'Just Me',
        desc:'A sole travels in exploration',
        icon:'🧍',
        people:'1'
    }
    ,
    {
        id:2,
        title:'Couple',
        desc:'A couple travels in exploration',
        icon:'👫',
        people:'2'
    },
    {
        id:3,
        title:'Family',
        desc:'A family travels in exploration',
        icon:'👨‍👩‍👧‍👦',
        people:'4'
    },
    {
        id:4,
        title:'Friends',
        desc:'A bunch of thrill-seeks',
        icon:'😎',
        people:'5 to 10 People'
    }

]


export const SelectBudgetOptions = [
    {
        id:1,
        title:'Cheap',
        desc:'Stay concious of costs',
        icon:'💰',
    }
    ,
    {
        id:2,
        title:'Moderate',
        desc:'Balanced budget',
        icon:'💸',
    },
    {
        id:3,
        title:'Expensive',
        desc:'Money is not a problem',
        icon:'🤑',
    }
]

export const AI_PROMPT='Generate Travel Plan for Location : {location} for {noOfDays} days for {travelType} with a {budget} budget, give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, place Details, place image url, Geo coordinates, ticket Pricing, Time to travel each of the location for {noOfDays} days with each day plan with best time to visit in json format. '