module.exports=(app,connection)=>{
    app.get("/api/citations",(req,res)=>{
        connection.query("SELECT * FROM citation",(err,results, fields)=>{
            res.status(200).send(results)
        })
    })
}