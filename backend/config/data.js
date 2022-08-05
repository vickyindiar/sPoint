import bcrypt from 'bcrypt';

const roles = [
    {name: 'admin'},
    {name: 'teacher'}
]


const users = [
    {name:'vicky', email:'vickynewonline@gmail.com', password: bcrypt.hashSync('programmer3', 10), role:'admin'},
    {name:'admin', email:'admin@admin.com', password: bcrypt.hashSync('admin', 10), role:'admin'},
    {name:'maang', email:'maang@super.com', password: bcrypt.hashSync('supermaang', 10), role:'teacher'}
]

const classes = [
    {name:'1A', homeroom_teachers: 'Matt Murdock'},
    {name:'1B', homeroom_teachers: 'Natasha Romanov'},
    {name:'1C', homeroom_teachers: 'Steve Roger'},
    {name:'3A', homeroom_teachers: 'Thor Odin Son'},
]

const teachers = [
    {name: 'Steve Roger', phone:'0812334556'},
    {name: 'Matt Murdock', phone:'0812334556'},
    {name: 'Thor Odin Son', phone:'0812334556'},
    {name: 'Natasha Romanov', phone:'0812334556'},
    {name: 'Carol Danvers', phone:'0812334556'},
    {name: 'Wanda Maximov', phone:'0812334556'},

]


const students = [
    {nis:'12345', name:'Harry Potter', birthPlace:'Bekasi', birthDate:'2019-05-02', class:'1A',  address: 'kec. babelan - bekasi', phone: '0812345678',  photo:'/image/yuina.jpg', vPoint:0, parents: { father:'jhon', mother:'dina', phone:'0811222999' }},
    {nis:'12346', name:'Ronald Wesley', birthPlace:'Jakarta', birthDate:'2017-10-12', class:'1B',  address: 'kec. babelan - bekasi', phone: '0812345678',  photo:'/image/rafatah.jpg', vPoint:0, parents: { father:'jhon', mother:'dina', phone:'0811222999' }},
    {nis:'12347', name:'Hermione Granger', birthPlace:'Bandung', birthDate:'2014-02-07', class:'1C',  address: 'kec. babelan - bekasi', phone: '0812345678',  photo:'/image/rafathir.jpg', vPoint:0, parents: { father:'michael', mother:'amy', phone:'0811222999' }},
    {nis:'12348', name:'Draco Malfoy', birthPlace:'Jakarta', birthDate:'2014-02-07', class:'1C',  address: 'kec. babelan - bekasi', phone: '0812345678',  photo:'/image/rafathir.jpg', vPoint:0, parents: { father:'roy', mother:'queen', phone:'0811222999' }},
    {nis:'12349', name:'You Know Who', birthPlace:'Bekasi', birthDate:'2014-02-07', class:'1C',  address: 'kec. babelan - bekasi', phone: '0812345678',  photo:'/image/rafathir.jpg', vPoint:0, parents: { father:'adward', mother:'anggi', phone:'0811222999' }},
]


const vCategories = [
    {type: 'Tidak Ada Pelanggaran', action: 'Give them some fucking rewards !', minPoint:0, maxPoint:10 },
    {type: 'Pelangaran Ringan', action: 'Peringatan lisan', minPoint:11, maxPoint: 50 },
    {type: 'Pelangaran Sedang', action: 'Panggil Orang tau', minPoint:51, maxPoint: 70 },
    {type: 'Pelangaran Sedang Plus', action: 'Skors 1 tahun', minPoint:71, maxPoint: 100 },
    {type: 'Pelangaran Berat', action: 'Selengkat Amandelnya', minPoint:101, maxPoint: 200 }
]

const vTypes = [
    {violation:'ngatain orang tua', point:5},
    {violation:'baju dikeluarin', point:10 },
    {violation:'nyopet', point:20},
    {violation:'bakar sekolah', point:8000}
]

const vHistories = [
    {student:'Harry Potter', vType:'baju dikeluarin', vDate:'2022-07-01', locationRef:'Pintu gerbang'},
    {student:'Hermione Granger', vType:'baju dikeluarin', vDate:'2022-07-01', locationRef:'Pintu gerbang'},
    {student:'Draco Malfoy', vType:'ngatain orang tua', vDate:'2022-07-02', locationRef:'Pintu gerbang', studentRef:'Hermione Granger', imageRef:'/image/proof1.jpg'},
    {student:'Draco Malfoy', vType:'baju dikeluarin', vDate:'2022-07-02', locationRef:'Pintu gerbang'},
    {student:'Draco Malfoy', vType:'nyopet', vDate:'2022-07-02', locationRef:'Kelas'},
    {student:'Draco Malfoy', vType:'nyopet', vDate:'2022-07-03', locationRef:'Ruang Guru'},
    {student:'Draco Malfoy', vType:'nyopet', vDate:'2022-07-04', locationRef:'Kantin', studentRef:'Ronald Wesley'},
    {student:'You Know Who', vType:'bakar sekolah', vDate:'2022-07-05', locationRef:'Sekolah'},
]

const actHistories = [
    {student: 'Draco Malfoy', aPoint: 45, aDate:'2022-07-05', aDone:'2022-07-15', desc:'pangilan orang tua, orang tua dateng nangis nangis', report:'/doc/draco45.pdf'},
    {student: 'You Know Who', aPoint: 8000, aDate:'2022-07-06', aDone:'2022-07-20', desc:'deal, angkat kaki', report:'/doc/youknowwho8000.pdf'},
]


export { roles, users, classes, teachers, students, vCategories, vTypes, vHistories, actHistories}
