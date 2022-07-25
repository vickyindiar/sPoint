import mongoose from 'mongoose'
import dotenv from 'dotenv'
import connectDB from './config/conn.js'
import colors from 'colors'
import { roles, users, classes, teachers, students, vCategories, vTypes, vHistories, actHistories } from './config/data.js'
import Role from './models/roleModel.js'
import User from './models/authModel.js'
import Classes from './models/classesModel.js'
import Students from './models/studentsModel.js'
import Teachers from './models/teachersModel.js'
import VCategories from './models/vCategoriesModel.js'
import VHistories from './models/vHistoriesModel.js'
import VTypes from './models/vTypesModel.js'
import ActHistories from './models/actHistoriesModel.js'


dotenv.config()

connectDB()

const importData = async() =>{
    const lookup = (eArr, xArr, xName, eName) => {
        eArr.forEach(e => {
            let row = xArr.find(x => x[xName] === e[eName]);
            if(row){
                e[eName] = row._id;
            }
        });
    }
    try {
        await Role.deleteMany()
        await User.deleteMany()
        await Classes.deleteMany()
        await Teachers.deleteMany()
        await Students.deleteMany()
        await VCategories.deleteMany()
        await VHistories.deleteMany()
        await VTypes.deleteMany()
        await ActHistories.deleteMany()
    
         const createdRoles = await Role.insertMany(roles);

         lookup(users, createdRoles, 'name', 'role');
         const createdUsers = await User.insertMany(users);

         const createdTeachers = await Teachers.insertMany(teachers);
         lookup(classes, createdTeachers, 'name', 'homeroom_teachers');
         const createdClasses = await Classes.insertMany(classes);
         
         lookup(students, createdClasses, 'name', 'class');
         const createdStudents = await Students.insertMany(students);

         const createdVCategories = await VCategories.insertMany(vCategories);

         const createdVTypes = await VTypes.insertMany(vTypes);

         lookup(vHistories, createdStudents, 'name', 'student');
         lookup(vHistories, createdStudents, 'name', 'studentRef');
         lookup(vHistories, createdVTypes, 'violation', 'vType');
         const createdVHistories = await VHistories.insertMany(vHistories);

         lookup(actHistories, createdStudents, 'name', 'student');
         const createdActHistories = await ActHistories.insertMany(actHistories);

        console.log('Data Imported !'.green);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red);
        process.exit(1);
    }
}

const destroyData = async(notif) => {
    try {
        await Role.deleteMany()
        await User.deleteMany()
        await Teachers.deleteMany()
        await Classes.deleteMany()
        await Students.deleteMany()
        await VCategories.deleteMany()
        await VHistories.deleteMany()
        await VTypes.deleteMany()
        await ActHistories.deleteMany()
        if(notif){
            console.log('Data Destroyed !'.green)
            process.exit()   
        }
    } catch (error) {
        console.log(`${error}`.red);
        process.exit(1); 
    }
}

if(process.argv[2] === '-d') destroyData(true)
else importData();