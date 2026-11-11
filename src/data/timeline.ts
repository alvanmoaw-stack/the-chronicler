export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  tag?: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: '1879',
    title: 'Kelahiran di Pasuruan',
    description:
      'Ernest François Eugène Douwes Dekker lahir pada 8 Oktober 1879 di Pasuruan, Jawa Timur. Darah campuran Eropa, Jawa, dan Jepang dalam dirinya kelak membuatnya memiliki perspektif unik tentang kesetaraan dan keadilan.',
    side: 'left',
    tag: 'Lahir',
  },
  {
    year: '1900',
    title: 'Perang Boer & Kesadaran Anti-Kolonial',
    description:
      'Bergabung dalam Perang Boer di Afrika Selatan sebagai sukarelawan berpihak kepada Boer melawan Inggris. Pengalaman ini mempertajam kesadarannya tentang kolonialisme dan penindasan bangsa kecil oleh kekuatan besar.',
    side: 'right',
    tag: 'Militer',
  },
  {
    year: '1907',
    title: 'Jurnalis De Locomotief',
    description:
      'Menjadi jurnalis aktif dan menulis artikel-artikel keras mengkritik perlakuan tidak adil kolonial Belanda terhadap pribumi. Pena lebih tajam dari pedang—keyakinan yang ia pegang sepanjang hidupnya.',
    side: 'left',
    tag: 'Jurnalisme',
  },
  {
    year: '1912',
    title: 'Mendirikan Indische Partij',
    description:
      'Bersama Cipto Mangunkusumo dan Suwardi Suryaningrat (Ki Hajar Dewantara), mendirikan Indische Partij—partai politik pertama yang secara eksplisit menuntut kemerdekaan Hindia dari Belanda. Semboyan: "Hindia untuk Putra Hindia."',
    side: 'right',
    tag: 'Indische Partij',
  },
  {
    year: '1913',
    title: 'Als Ik Eens Nederlander Was & Pengasingan',
    description:
      'Suwardi menulis artikel provokatif "Als Ik Eens Nederlander Was" di De Expres. Bersama Douwes Dekker dan Cipto, ketiganya (Tiga Serangkai) diasingkan ke Belanda. Di pengasingan, mereka terus berjuang dari luar negeri.',
    side: 'left',
    tag: 'Pengasingan',
  },
  {
    year: '1919',
    title: 'Kembali & Mendirikan Sekolah Rakyat',
    description:
      'Kembali ke Hindia Belanda dan mendirikan lembaga pendidikan Ksatrian Instituut di Bandung sebagai bentuk perlawanan melalui kecerdasan bangsa, menyediakan pendidikan modern bagi seluruh lapisan masyarakat tanpa diskriminasi ras.',
    side: 'right',
    tag: 'Pendidikan',
  },
  {
    year: '1940',
    title: 'Internir & Penjara Kolonial',
    description:
      'Ketika Jepang mulai mengancam Asia, pemerintah kolonial Belanda kembali menginternir Douwes Dekker dan mengasingkannya ke Suriname, lalu ke Eropa—mencegah dirinya berpihak kepada siapapun yang melawan Belanda.',
    side: 'left',
    tag: 'Internir',
  },
  {
    year: '1945',
    title: 'Menyambut Kemerdekaan Indonesia',
    description:
      'Kembali ke Indonesia setelah Proklamasi 17 Agustus 1945. Dengan penuh kebanggaan ia menyaksikan cita-cita seumur hidupnya—kemerdekaan Hindia—akhirnya terwujud. Ia mengganti nama menjadi Danudirja Setiabudi.',
    side: 'right',
    tag: 'Kemerdekaan',
  },
  {
    year: '1947',
    title: 'Menteri Negara RI & Warisan',
    description:
      'Mengabdi sebagai Menteri Negara dalam Kabinet Republik Indonesia. Pada 28 Agustus 1950, Danudirja Setiabudi wafat di Bandung. Ia diakui sebagai Pahlawan Nasional Indonesia—pejuang yang seumur hidup berjuang untuk tanah yang ia cintai.',
    side: 'left',
    tag: 'Wafat',
  },
];

