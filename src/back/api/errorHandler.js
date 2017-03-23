module.exports = (err) => {
    let error = { error: true }
    if(err) {
        if(err.name) { error.name = err.name }
        if(err.message) { error.name = err.message }
        if(err.parent) { error.name = err.parent }
    }
    return error
}