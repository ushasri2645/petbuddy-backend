import { ServiceModel } from "../Collections/Service";
import { IServiceType } from "../Types/types";

const services = {
  "grooming": [
    {
      "name": "Deluxe Grooming",
      "designation": "Senior Groomer",
      "ratings": 4.5,
      "no_of_reviews": 150,
      "experience": 5,
      "distance":2.4,
      "min_fee": 50,
      "startDay": "Monday",
      "endDay": "Saturday",
      "startTime": "8:00 A.M",
      "endTime": "10.00 P.M",
      "image_uri":"https://img.freepik.com/free-photo/close-up-pet-lifestyle_23-2149180491.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
    {
      "name": "Basic Grooming",
      "designation": "Junior Groomer",
      "ratings": 4.0,
      "no_of_reviews": 100,
      "experience": 2,
      "distance":2.6,
      "min_fee": 30,
      "startDay": "Tuesday",
      "endDay": "Friday",
      "startTime": "9:00 A.M",
      "endTime": "9:00 P.M",
      "image_uri":"https://img.freepik.com/free-photo/vet-with-brush-animals-woman-black-t-shirt-cat-couch_1157-46549.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
    {
      "name": "Premium Grooming",
      "designation": "Grooming Specialist",
      "ratings": 4.7,
      "no_of_reviews": 200,
      "experience": 6,
      "distance":3,
      "min_fee": 70,
      "startDay": "Wednesday",
      "endDay": "Sunday",
      "startTime": "5:00 P.M",
      "endTime": "11:00 P.M",
      "image_uri":"https://img.freepik.com/free-photo/close-up-pet-lifestyle_23-2149180491.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    }
  ],
  "boarding": [
    {
      "name": "Standard Boarding",
      "designation": "Boarding Specialist",
      "ratings": 4.3,
      "no_of_reviews": 120,
      "experience": 3,
      "distance":6,
      "min_fee": 40,
      "image_uri":"https://img.freepik.com/free-photo/side-view-owner-with-cute-dog_23-2150238773.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid",
    },
    {
      "name": "Luxury Boarding",
      "designation": "Boarding Expert",
      "ratings": 4.8,
      "no_of_reviews": 180,
      "experience": 5,
      "distance":9,
      "min_fee": 80,
      "image_uri":"https://img.freepik.com/free-photo/lifestyle-person-creating-content-with-their-pet_23-2151262040.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
    {
      "name": "Budget Boarding",
      "designation": "Boarding Assistant",
      "ratings": 3.9,
      "no_of_reviews": 75,
      "experience": 1,
      "distance":8,
      "min_fee": 25,
      "image_uri":"https://img.freepik.com/free-photo/side-view-owner-with-cute-dog_23-2150238773.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    }
  ],
  "training": [
    {
      "name": "Basic Obedience",
      "designation": "Trainer",
      "ratings": 4.4,
      "no_of_reviews": 90,
      "experience": 3,
      "min_fee": 60,
      "distance":2.5,
      "startDay": "Monday",
      "endDay": "Thursday",
      "startTime": "7:30 A.M",
      "endTime": "3:00 P.M",
      "image_uri":"https://img.freepik.com/free-photo/skater-couple-wearing-trucker-hat_23-2149431216.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
    {
      "name": "Advanced Obedience",
      "designation": "Senior Trainer",
      "ratings": 4.6,
      "no_of_reviews": 130,
      "experience": 5,
      "distance":2.4,
      "min_fee": 100,
      "startDay": "Tuesday",
      "endDay": "Friday",
      "startTime": "6:00 P.M",
      "endTime": "8:00 P.M",
      "image_uri":"https://img.freepik.com/premium-photo/woman-with-her-dog-autumn-park-woman-is-playing-with-dog-using-stick-dog-is-jumping-greenery-around_1268-17091.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
    {
      "name": "Puppy Training",
      "designation": "Junior Trainer",
      "ratings": 4.2,
      "no_of_reviews": 110,
      "experience": 2,
      "distance":2,
      "min_fee": 45,
      "startDay": "Wednesday",
      "endDay": "Saturday",
      "startTime": "10:00 A.M",
      "endTime": "9:00 P.M",
      "image_uri":"https://img.freepik.com/free-photo/skater-couple-wearing-trucker-hat_23-2149431216.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    }
  ],
  "veternity": [
    {
      "name": "General Checkup",
      "designation": "Veterinarian",
      "ratings": 4.6,
      "no_of_reviews": 160,
      "experience": 7,
      "distance":1,
      "min_fee": 70,
      "startDay": "Monday",
      "endDay": "Saturday",
      "startTime": "4:30 A.M",
      "endTime": "11:30 P.M",
      "image_uri":"https://img.freepik.com/premium-photo/beautiful-young-female-veterinarian-examining-dog-clinic_255667-9741.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
    {
      "name": "Vaccination Service",
      "designation": "Vaccination Specialist",
      "ratings": 4.8,
      "no_of_reviews": 210,
      "experience": 8,
      "distance":4,
      "min_fee": 60,
      "startDay": "Tuesday",
      "endDay": "Friday",
      "startTime": "10:30 A.M",
      "endTime": "9.00 P.M",
      "image_uri":"https://img.freepik.com/premium-photo/handsome-doctor-veterinarian-smiling-examining-pet-vet-clinic-checking-pug-dog-with-stethoscope-standing-white_1258-32795.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    },
    {
      "name": "Surgery Consultation",
      "designation": "Surgical Vet",
      "ratings": 4.7,
      "no_of_reviews": 180,
      "experience": 10,
      "min_fee": 120,
      "distance":5,
      "startDay": "Wednesday",
      "endDay": "Sunday",
      "startTime": "10:00 A.M",
      "endTime": "9:00 A.M",
      "image_uri":"https://img.freepik.com/premium-photo/beautiful-young-female-veterinarian-examining-dog-clinic_255667-9741.jpg?ga=GA1.1.1483488090.1730875470&semt=ais_hybrid"
    }
  ]
}


export namespace serviceUtils{
    export async function addService(){
        try{
            const newService = new ServiceModel(services);
            await newService.save();
            return newService
        }
        catch(e){
            throw new Error(`Error adding services: ${e}`)
        }
    }

    export async function getServices(){
        try{
            const services = await ServiceModel.find()
            return services
        }
        catch(e){
            throw new Error (`Error fetching services: ${e}`)
        }
    }
}