import supabase from "..";
import ICarItem from "../../../entities/carEntity";

async function insertCarListings(carListings: ICarItem[]): Promise<void> {
    for (const carListing of carListings) {
        const { data, error } = await supabase
          .from('cars_test')
          .upsert([carListing]);
    
        if (error) {
          console.error('Error inserting data:', error.message);
        } else {
          console.log('Data inserted successfully:', data);
        }
      }
}

export default insertCarListings;