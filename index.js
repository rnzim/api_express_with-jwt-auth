const app = require('./server')
const Games = require('./database/Games')
const User = require('./database/User')
const connection = require('./database/database')

const jwt = require('jsonwebtoken')
const jwtSecret = "phpemuitoantigo"
const auth = require('./middleware/auth')






connection.authenticate().then(()=>{
    console.log('success database')
}).catch((err)=>{
    console.log('err in authenticate: '+ err)
})

app.get('/games',auth,(req,res)=>{
    Games.findAll().
    then((name)=>{
        if(name == null){
            res.sendStatus(404)
        }else{
            res.json({name})
        }
        
         
      }).catch((err)=>{
        res.sendStatus(500)
      })
    
      
})


app.get('/games/:id?',(req,res)=>{
    var id = parseInt(req.params.id)
 
        Games.findOne({where:{id:id}}).
        then((name)=>{
            
            res.json(name)
            
        }).catch((err)=>{
            res.sendStatus(500)
        })

})

app.post('/games',(req,res)=>{
    var name = req.body.name
    var author = req.body.author
    var ano = req.body.ano
    var pricing = req.body.pricing
   
     
     Games.create({
        name:name,
        author:author,
        ano:ano,
        pricing:pricing
     }).then(()=>{
        res.sendStatus(200)
     }).catch((err)=>{
        console.log('erro '+ err )
        res.sendStatus(400)
     })
})
app.delete('/games/:id',(req,res)=>{
    var id = req.params.id
    Games.destroy({where:{
       id:id
    }}).then(()=>{
        res.sendStatus(200)
    }).catch(()=>{
        res.sendStatus(500)
    })
})

app.put('/games/:id',(req,res)=>{
    var {name,ano,author,pricing} = req.body

    
    var id = req.params.id
    Games.update({name:name,ano:ano,author:author,pricing:pricing},
        {where:{id:id}}).then(()=>{
            res.sendStatus(200)
            console.log('sucess update')
        }).catch(err=>{
            res.send(500)
            console.log(err)
        })
})

app.post('/auth',(req,res)=>{
    var {user,pass} = req.body
    User.findOne({where:{user:user,pass:pass}}).then((user)=>{
            if(user == undefined){
               
                res.sendStatus(401)
           }else{
            jwt.sign({user:user.user,id:user.id},jwtSecret,{expiresIn:'2h'},(err,token)=>{
                if(err){
                   res.json(err)
                   res.sendStatus(400)
                }else{
                   console.log(token)
                   res.json({token:token})
                   
                   res.sendStatus(200)
                  
                }
           })
             
           }
    })
})