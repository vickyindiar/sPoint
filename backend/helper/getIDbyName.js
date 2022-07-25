const UpdateValue = (res, ref, resField, refField) => {
    res.forEach(e => {
        let row = ref.find(x => x[refField] === resField);
        if(row.length > 0){
            res[resField] = row._id
        }
    })
}

const GetID = (res, ref, resField, refField) => {
    let id;
    res.forEach(e => {
        let row = ref.find(x => x[refField] === resField);
        if(row.length > 0){
            id = row._id
        }
    })
    return id
}

export {UpdateValue, GetID}