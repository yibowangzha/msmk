<template>
  <div>
    <div class="login_pic_container">
      <div class="login_pic_wrapper">
        <div class="pic_container">
          <img src="@/assets/img/13.jpg" alt />
        </div>
      </div>
    </div>
    <!-- 登录页面 -->
    <div class="login_input_container" v-show="loginShow">
      <div class="login_input_wrapper">
        <div class="tel_container">
          <van-field
            placeholder="请输入手机号"
            :class="active == true ? 'changBottom' : ''"
            @focus="active = true"
            @blur="active = false"
            v-model="loginTel"
          />
        </div>
        <div class="pass_container">
          <van-field
            placeholder="请输入密码"
            :class="nother == true ? 'changBottom' : ''"
            @focus="nother = true"
            @blur="nother = false"
            v-model="loginPass"
          />
        </div>
        <div class="password_container">
          <span>找回密码</span>
          <span @click="onClick()">注册/验证码登录</span>
        </div>
      </div>
    </div>
    <!-- 注册页面 -->
    <div class="logon_input_container" v-show="!loginShow">
      <div class="logon_input_wrapper">
        <div class="logon_tel_container">
          <van-field
            placeholder="请输入手机号"
            :class="active == true ? 'changBottom' : ''"
            @focus="active = true"
            @blur="active = false"
            v-model="tel"
          >
            <template #button>
              <span v-show="getCode" style=" color: #fc5500;" @click="timeend()">获取验证码</span>
              <div class="time_box" v-show="timeOut">{{zi}}</div>
            </template>
          </van-field>
        </div>
        <div class="logon_pass_container">
          <van-field
            placeholder="请输入短信验证码"
            :class="nother == true ? 'changBottom' : ''"
            @focus="nother = true"
            @blur="nother = false"
            v-model="msgCode"
          />
        </div>
        <div class="logon_password_container">
          <span>*未注册手机将自动注册</span>
          <span @click="onClick2()">使用密码登录</span>
        </div>
      </div>
    </div>
    <div class="login_button_container" v-show="!logonShow">
      <div class="login_button_wrapper">
        <van-button
          type="primary"
          size="large"
          round
          @click="dl()"
          color="linear-gradient(to right, #FF9349, #FC5500)"
        >登录</van-button>
      </div>
    </div>
    <div class="login_button_container" v-show="logonShow">
      <div class="login_button_wrapper">
        <van-button
          type="primary"
          size="large"
          round
          color="linear-gradient(to right, #FF9349, #FC5500)"
          @click="zhuce()"
        >注册</van-button>
      </div>
    </div>
    <!-- 弹出框 -->
    <div class="mes" v-show="show">
      <span>手机号码格式不正确</span>
    </div>
  </div>
</template>
<script>
import { yanzheng, denglu } from "../utils/api";
export default {
  data() {
    return {
      zi: "获取验证吗",
      active: false,
      nother: false,
      loginShow: true,
      logonShow: false,
      tel: "", //手机号
      show: false,
      loginTel: "",
      loginPass: "",
      timeOut: false,
      getCode: true,
      msgCode: "", //验证吗
      showtime: false,
      id: null,
      password:''
    };
  },
  methods: {
    // 点击注册登录按钮，注册页面显示，登录页面隐藏
    onClick() {
      this.loginShow = false;
      this.logonShow = true;
    },
    onClick2() {
      this.loginShow = true;
      this.logonShow = false;
    },

    // k() {
    //   this.loginShow = true;
    //   this.logonShow = false;
    // },
    // // 点击获取验证码按钮
    // getmsg() {
    //   if (this.tel == "" || !phoneTest(this.tel)) {
    //     this.show = true;
    //     setTimeout(() => {
    //       this.show = false;
    //     }, 1500);
    //     return;
    //   }
    //   // 验证码倒计时
    //   this.$refs.countDown.start();
    //   // 验证码第一个样式消失
    //   this.getCode=false
    //   // 验证码第二个样式出现
    //   this.timeOut=true
    //   axios.post("http://120.53.31.103:84/api/app/smsCode",{
    //       mobile: this.tel,
    //       sms_type:'login'
    //   }).then(res=>{
    //     console.log(res);
    //   })
    // },
    // // 点击找回密码跳转该页面
    // retrieve() {
    //   this.$router.push("/Retrieve");
    // },
    // // 点击首页面登录请求接口
    // Signin() {
    //   axios
    //     .post("http://120.53.31.103:84/api/app/login", {
    //       mobile: this.loginTel,
    //       password: this.loginPass,
    //       type: 1,
    //     })
    //     .then((res) => {
    //       console.log(res);
    //     });
    // },
    // // 点击注册页面的登录
    // logondenglu(){
    //     axios.post(" http://120.53.31.103:84/api/app/login",{
    //       mobile:this.tel,
    //       sms_code:this.msgCode,
    //       client:1,
    //       type:2
    //     }).then(res=>{
    //       console.log(res);
    //       if(res.data.msg==="操作成功"){
    //         window.localStorage.setItem('Token',res.data.data.mobile)
    //         this.$router.push('/setPass')
    //         console.log(111111);
    //       }
    //     })
    // },
    //获取验证码
    async timeend() {
      let phone = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
      if (phone.test(this.tel)) {
        let res = await yanzheng({ mobile: this.tel, sms_type: "login" });
        // console.log(this.tel);
        console.log(res);
        if (res.code == 200) {
          this.$toast("操作成功");
          this.timeOut = true;
          this.getCode = false;
          this.time();
        }
      } else {
        this.$toast("请输入手机号");
      }
    },
    //倒计时
    time() {
      let num = 10;
      this.id = setInterval(() => {
        num--;
        this.zi = `获取验证吗${num}`;
        if (num <= 0) {
          this.getCode = true;
          this.timeOut = false;
          clearInterval(this.id);
        }
      }, 1000);
    },
    //注册登录
    async zhuce() {
      let { data } = await denglu({
        mobile: this.tel,
        sms_code: this.msgCode,
        client: 1,
        type: 2
      });
      console.log(data);
      if (data.is_new == 1 || data.is_new == 2) {
        window.sessionStorage.setItem("token", data.remember_token);
        //
        this.$toast("登录成功");
        if (data.is_new == 1) {
          this.$router.push("mima");
        } else {
          this.$router.push("/my");
        }
      }
    },
    async dl() {
      let res = await denglu({
        mobile: this.tel,
        password: this.password,
        type: 1
      });
       console.log(res);
        this.$router.push('/my')
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.login_pic_container {
  width: 100%;
  height: 1.52rem;
  .login_pic_wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .pic_container {
      width: 85%;
      img {
        width: 100%;
      }
    }
  }
}
.login_input_container {
  width: 100%;
  height: 2.2rem;
  // background-color: powderblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_input_wrapper {
    width: 85%;
    .tel_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .pass_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .password_container {
      height: 6vh;
      font-size: 0.13rem;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.logon_input_container {
  width: 100%;
  height: 28vh;
  // background-color: powderblue;
  display: flex;
  justify-content: center;
  align-items: center;
  .logon_input_wrapper {
    width: 85%;
    .logon_tel_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .logon_pass_container {
      border-bottom: 0.01rem solid rgba(211, 211, 211, 0.308);
      .van-field__control {
        font-size: 0.16rem;
      }
    }
    .logon_password_container {
      height: 6vh;
      font-size: 0.13rem;
      color: #999;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
.login_button_container {
  width: 100%;
  height: 10vh;
  // background-color: lightsalmon;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_button_wrapper {
    width: 85%;
  }
}
.changBottom {
  border-bottom: 0.01rem solid #fc5500;
}
.mes {
  width: 100%;
  color: white;
  height: 0.25rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 2.95rem;
  left: 0px;
  span {
    display: inline-block;
    width: 45%;
    font-size: 0.16rem;
    background-color: rgba(0, 0, 0, 0.534);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// .van-field__button{
//   width: 20px;
//   height: 10px;
// }
.time_box {
  margin: 0;
  padding: 0;
  height: 0.4rem;
  display: flex;
  align-items: center;
  color: #999;
  .van-count-down {
    text-align: center;
    height: 0.18rem;
    width: 0.2rm;
    font-size: 0.04rem;
    color: #999;
  }
}
</style>