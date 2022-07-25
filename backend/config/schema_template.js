
const teachers =[
    {
        name:'string',
        phone: 'string'
    }
]
const classes = [
    {
        name: 'string',
        homeroomTeacher: 'ref_teachers'
    }
]

const violation_types = [
    {
        violation: 'string',
        point:  'integer'
    }
    
]

const violation_categories =[
    {
        type: 'string', // pelanggaran ringan; pelanggaran berat
        action: 'string', // no action; peringantan lisan & istighfar
        min_point: 'integer', 
        max_point: 'integer',
    }
]

const violation_histories = [
    {
        student_id: 'ref_student',
        vtype: 'ref_violation_types',
        vdate: 'date',
        student_ref: 'ref_student'

    }
]

const students = [
    {
        nis: 'int',
        name: 'string',
        class: 'class_ref',
        gender: 'L/P',
        phone: 'string',
        photo: 'string',
        vpoint: 'integer',
        parents:  {
            father: 'string',
            mother: 'string',
            adress: 'string',
            phone: 'string',
        }
    }
]