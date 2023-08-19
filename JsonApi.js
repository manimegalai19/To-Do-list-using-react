const JsonApi = async (url ='',ObjectChoosen=null, errMsg=null) => {
    try{
        const response=fetch(url,ObjectChoosen)
        if(!response.ok)throw Error("Please reload the Page app")
    }
    catch(err){
        errMsg=err.Message
    }
    finally{
        return errMsg
    }
}

export default JsonApi