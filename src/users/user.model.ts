import mongoose from "mongoose";
import { User } from "./user.entity";

const userSchema = new mongoose.Schema<User>({
      name: {type: String , required:true},
      email: {type: String , required:true},
      password: {
        type: String ,
        validate: {
            validator: function(passwordValue:string) {
                return passwordValue.length > 6;
            },
      message: props => `${props.value} is not a valid password!`
    }
},
      role: {
        type: String , 
        enum: {
          values: ['ADMIN' , 'COACH' , 'STUDENT'],
          message: '{VALUE} is not supported'
    }
  }
})