<template>
	<view class="login">
		<view class="qrimg">
			<view class="log-img">
				<text class="t1">{{msg}}</text>
				<image :src="qrimg" mode=""></image>
			</view>
		</view>
		<view class="other">

		</view>
	</view>
</template>

<script>
import helper from '../../common/helper';
	export default {
		data() {
			return {
				msg: '扫码登入',
				qrimg: ``,
				timer: null,

			};
		},
		onLoad() {
			this.logup()
		},
		methods: {
			logup() {
				uni.request({
					url: `${helper.url}/login/qr/key?timestamp=${Date.now()}`,
					success: (res) => {
						console.log(res)
						let key = res.data.data.unikey
						uni.request({
							url: `${helper.url}/login/qr/create?key=${key}&qrimg=truetimestamp=${Date.now()}`,
							success: (res) => {
								console.log(res)
								this.qrimg = res.data.data.qrimg
								this.timer = setInterval( () => {
									this.Polling(key)
								}, 1000)
							}
						})
					}
				})
			},
			Polling(k) {
				console.log(k)
				uni.request({
					url: `${helper.url}/login/qr/check?key=${k}&qrimg=truetimestamp=${Date.now()}`,
					success: (res) => {
						// console.log(res.data.code)
						if(res.data.code === 800) {
							this.msg = '二维码过期'
							this.qrimg = ''
							clearInterval(this.timer)
						}else if(res.data.code === 801) {
							this.msg = '等待扫码'
						}else if(res.data.code === 802) {
							this.msg = '等待确认'
							this.qrimg = ''
							// clearInterval(this.timer)
						}else if(res.data.code === 803) {
							this.msg = '登入成功'
							// console.log(res)
							uni.setStorageSync('cookie', res.data.cookie)
							clearInterval(this.timer)
							this.$store.commit('changeLogin', true)
							uni.reLaunch({
								url: '/pages/myhome/myhome'
							})
						}
						
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}
	.login {
		width: 750rpx;
		height: 100vh;
		.qrimg {
			padding-top: 150rpx;
			display: flex;
			justify-content: center;
			width: 100%;
			height: 65%;
			background-color: skyblue;
			.log-img {
				text-align: center;
				width: 400rpx;
				height: 400rpx;
				.t1 {
					line-height: 2;
					font-size: 40rpx;
				}
			}
		}
	}
</style>