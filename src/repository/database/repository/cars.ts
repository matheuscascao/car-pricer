import supabase from "..";
import { CarType } from "../../../entities/carEntity";

async function insertCarListings(carListings: CarType[]): Promise<void> {
  console.log(`Car Listings: ${carListings}`);
    const { data, error } = await supabase
      .from('cars_test')
      .upsert(carListings);
    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
    }
}

export default insertCarListings;