<template>
	<view class="login">
		
		<view class="newget" @click="getindex">
			立即体验
		</view>
		<view class="qrimg">
			<view class="bg-img">
				<image src="/static/img/cont2.png" mode="aspectFill"></image>
			</view>
			<view class="log-img" v-if="isqr" :style="{transform: `translateY(${tras}px)`} ">
				<text class="t1">{{msg}}</text>
				<image :src="qrimg" mode=""></image>
			</view>
		</view>
		<view class="other" v-if="!isqr">
			<view class="new">
				<view class="num">
					手机号登入
				</view>

				<view class="more">
					<label>
						<checkbox checked="true" color="#FFCC33" style="transform:scale(0.7);outline: none; width=20rpx; height=20rpx" />
					</label>
					<text class="t1">我已阅读并同意</text><a href="javascript:;">
						<<服务条款>>
					</a>、<a href="javascript:;">
						<<隐私政策>>
					</a>
				</view>
			</view>
		</view>
		
		<view class="keduoli"  v-if="!isqr">
			<view class="help">
				登入遇到问题
			</view>
			<view class="qrlg" @click="qrlogin">
				扫一扫登入
			</view>
		</view>
		
		<view class="backip" v-if="isqr" @click="back">
			返回
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
				isqr: false,
				tras: 0,
				tim: null

			};
		},
		methods: {
			getindex() {
				clearTimeout(this.timer)
				clearTimeout(this.tim)
				this.tim = null
				this.timer = null
				this.qrimg = ''
				this.isqr = false
				this.tras = 0
				uni.reLaunch({
					url: '/pages/index/index'
				})
			},
			back() {
				clearTimeout(this.timer)
				clearTimeout(this.tim)
				this.qrimg = ''
				this.tim = null
				this.timer = null
				this.isqr = false
				this.tras = 0
			},
			qrlogin() {
				this.tim = setTimeout(() => {
					this.tras = 150
				}, 100)
				this.isqr = true
				this.logup()
			},
			
			logup() {
				uni.request({
					url: `${helper.url}/login/qr/key?timestamp=${Date.now()}`,
					success: (res) => {
						let key = res.data.data.unikey
						uni.request({
							url: `${helper.url}/login/qr/create?key=${key}&qrimg=truetimestamp=${Date.now()}`,
							success: (res) => {
								this.qrimg = res.data.data.qrimg
								this.timer = setInterval(() => {
									this.Polling(key)
								}, 1000)
							}
						})
					}
				})
			},
			Polling(k) {
				uni.request({
					url: `${helper.url}/login/qr/check?key=${k}&timestamp=${Date.now()}`,
					withCredentials: true,
					success: (res) => {
						if (res.data.code === 800) {
							this.msg = '二维码过期'
							this.qrimg = ''
							clearInterval(this.timer)
						} else if (res.data.code === 801) {
							this.msg = '等待扫码'
						} else if (res.data.code === 802) {
							this.msg = '等待确认'
						} else if (res.data.code === 803) {
							this.msg = '登入成功'
							uni.setStorageSync('cookie', res.data.cookie)
							clearInterval(this.timer)
							this.$store.commit('changeLogin', true)
							getApp().getuser(res.data.cookie)
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
		overflow: hidden;
		.newget {
			padding: 10rpx 20rpx;
			position: fixed;
			top: 60rpx;
			right: 50rpx;
			z-index: 10;
			background-color: #fff;
			border-radius: 30rpx;
			opacity: .6;
		}
		.backip {
			z-index: 10;	
			// opacity: .6;
			position: fixed;
			left: 50%;
			bottom: 120rpx;
			transform: translateX(-50%);
			font-size: 34rpx;
			font-weight: 600;
			width: 120rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			color: #fff;
		}
		.backip::after {
			z-index: -1;
			position: fixed;
			left: 50%;
			// bottom: 120rpx;
			transform: translateX(-50%);
			content: '';
			width: 120rpx;
			height: 60rpx;
			background-color: skyblue;
			border-radius: 20rpx;
			opacity: .6;
		}
		.qrimg {
			position: relative;
			padding-top: 150rpx;
			display: flex;
			justify-content: center;
			width: 100%;
			height: 60%;

			// background-color: skyblue;
			.bg-img {
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}

			.log-img {
				border-radius: 30rpx;
				z-index: 99;
				text-align: center;
				width: 600rpx;
				height: 600rpx;
				background-color: #fff;
				opacity: .6;
				transition: all .8s ease;
				transform: translateY(0);

				.t1 {
					line-height: 2;
					font-size: 40rpx;
				}
			}
		}

		.other {
			z-index: 10;
			padding: 50rpx;

			.new {
				
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				.num {
					z-index: 10;
					font-size: 38rpx;
					display: inline-block;
					padding: 16rpx 100rpx;
					background-color: red;
					border-radius: 38rpx;
					color: #fff;
					margin-bottom: 50rpx;
				}
				
				.more {
					z-index: 10;
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					font-size: 26rpx;
					
					a {
						text-decoration: none;
						
					}
				}
			}
		}
		
		.keduoli {
			width: 450rpx;
			display: flex;
			justify-content: space-between;
			position: fixed;
			left: 50%;
			bottom: 120rpx;
			transform: translateX(-50%);
			color: #666;
		}
	}
</style>