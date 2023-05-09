<template>
	<view class="homeheader night">
		<view class="top">
			<view class="topicon" @click="back">
				<image src="/static/icon/系统返回2.png" mode="aspectFit"></image>
			</view>
			<text class="text">最近播放</text>
		</view>
		<view class="floor">
			<view class="textlist">
				歌曲
				<text class="t1">13</text>
				<view class="mask">
					
				</view>
			</view>
			<view class="textlist">
				视频
				<text class="t1">13</text>
			</view>
			<view class="textlist">
				声音
				<text class="t1">13</text>
			</view>
			<view class="textlist">
				歌单
				<text class="t1">13</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			back() {
				this.$emit('changetop', 100)
				this.$store.commit('changeshowhome', 0)
				uni.showTabBar({
					fail() {
						console.log('珂朵莉')
					}
				})
			}
		}
	}
</script>

<style long="scss">
	.homeheader {
		background-color: var(--indexiconbgcolor);
		.top {
			padding: 40rpx 30rpx;
			display: flex;
			.topicon {
				margin-right: 25rpx;
				width: 50rpx;
				height: 50rpx;
			}
			.text {
				font-size: 38rpx;
				color: var(--indexfontcolor);
			}
		}
		.floor {
			padding-bottom: 30rpx;
			display: flex;
			justify-content: space-around;
			color: var(--indexfontcolor);
			.textlist {
				z-index: 10;
				position: relative;
				.t1 {
					position: absolute;
					top: 0;
					right: -30rpx;
					font-size: 24rpx;
					color: var(--searchlistfontcolor);
				}
				.mask {
					z-index: -1;
					position: absolute;
					left: 0;
					bottom: -4rpx;
					width: 100%;
					height: 40%;
					background-color: skyblue;
					border-radius: 8rpx;
				}
			}
		}
	}
</style>
