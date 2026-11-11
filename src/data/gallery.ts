import tigaSerangkai from '../assets/tiga serangkai.jpg';
import douwesGallery from '../assets/douwes dekker gallery.avif';
import cipto from '../assets/cipto mangukusumo.jpg';
import kiHajar from '../assets/ki hajar dewantara.jpg';

export interface GalleryItem {
  src: string;
  alt: string;
  year: string;
  caption: string;
  category: 'portrait' | 'tiga-serangkai' | 'dokumen' | 'lokasi';
}

export const galleryItems: GalleryItem[] = [
  {
    src: tigaSerangkai,
    alt: 'Tiga Serangkai',
    year: '1913',
    caption: 'Tiga Serangkai: Douwes Dekker, Cipto Mangunkusumo, dan Suwardi Suryaningrat sebelum diasingkan ke Belanda.',
    category: 'tiga-serangkai',
  },
  {
    src: douwesGallery,
    alt: 'Ernest Douwes Dekker',
    year: '1913',
    caption: 'Ernest Douwes Dekker (Danudirja Setiabudi), pendiri Indische Partij dan tokoh Tiga Serangkai.',
    category: 'portrait',
  },
  {
    src: cipto,
    alt: 'Cipto Mangunkusumo',
    year: '1913',
    caption: 'Dr. Cipto Mangunkusumo, rekan seperjuangan dalam Indische Partij dan Tiga Serangkai.',
    category: 'tiga-serangkai',
  },
  {
    src: kiHajar,
    alt: 'Ki Hajar Dewantara (Suwardi Suryaningrat)',
    year: '1913',
    caption: 'Suwardi Suryaningrat (Ki Hajar Dewantara) penulis "Als Ik Eens Nederlander Was" — provokasi jurnalistik yang menggetarkan Belanda.',
    category: 'tiga-serangkai',
  },
];

