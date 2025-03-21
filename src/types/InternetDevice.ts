export interface InternetDevice {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  category: 'Router' | 'Extensor' | 'Móvil' | 'Modem';
  tag: string;
} 