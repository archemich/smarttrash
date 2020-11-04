module.exports = {
    fileFilterCSV: (req, file, cb) => {
        if (file.mimetype === "text/csv") {
            cb(null, true);
        }
        else {
            cb(null,false);
        }
    } 
}