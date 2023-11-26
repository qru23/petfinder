export type Pet = {
  pet_id: string;
  pet_name: string;
  email: string;
  latitude: number;
  longtiude: number;
  owner_name: string;
  phone: string;
  reward: number;
  images: PetImageData[];
}

export type PetImageData = {
  path: string;
}