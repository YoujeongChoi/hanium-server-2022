const mongoose=require('mongoose');
mongoose.model('User', userSchema, 'myfreename');
var router = require('express').Router();

//User 도메인 테이블을 생성하기 위한 스키마
const userSchema=mongoose.Schema({
    name:{
        type: String,
        maxlength: 50,
    },
    birth:{
        type: Date,
        default: Date.now,
    },
    sex:{
        type: String,
        maxlength: 50,
    },
    email:{
        type: String,
        // space bar를 없애준다.
        trim: true,
        // 중복을 허용하지 않는다.
        unique: true,
        lowercase : true
    },
    id: {
        type: String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        maxlength : 15
    },
    password: {
        type: String,
        minlength: 6,
        required : true
    },
    point: { 
        type: Number, 
        default: 0,
        index: true 
    },
    token:{
        type:String,
    },
    tokenExp:{
        type: Number,
    }
});

userSchema.index({id : 1})
// User를 model화 해준다.

userSchema.virtual('detail').get(function() {
    return `저는 ${this.name}이고 생일은 ${this.birth.toLocaleString()}입니다.`;
  });

  userSchema.methods.comparePassword = function(pw ,cb)  {
    if (this.password === pw) {
      cb(null, true);
    } else {
      cb('password 불일치');
    }
  };
  

user.comparePassword('비밀번호', function(err, result) {
  if (err) {
    throw err;
  }
  console.log(result);
});

  userSchema.statics.findByPoint = function(point) {
    return this.find({ point: { $gt: point } });
  };
  userSchema.query.sortByName = function(order) {
    return this.sort({ name: order });
  };
  
  Users.findByPoint(50).sortByName(-1);

  userSchema.pre('save', function(next) {
    if (!this.email) { // email 필드가 없으면 에러 표시 후 저장 취소
      throw '이메일이 없습니다';
    }
    if (!this.createdAt) { // createdAt 필드가 없으면 추가
      this.createdAt = new Date();
    }
    next();
  });
  userSchema.post('find', function(result) {
    console.log('저장 완료', result);
  });

// 다른 파일에서도 이 모델을 쓸 수 있도록
module.exports = mongoose.model('User', userSchema);

