<template>
	<view class="miku night">
		<view class="box">
			<view class="box-top">
				<view class="callback-icon" @click="back">
					<image src="../../static/icon/系统返回2.png" mode=""></image>
				</view>
				
				<view class="box-line">
					<input type="text" name="set1" :value="title" @input="settitle" @keydown.enter="newgetsong(),getarr()" @focus="backk(title)" class="gonindexinput">
					<view class="box-clear" v-show="title != null" @click="textclear" >
						<image src="../../static/icon/关闭.png" mode="aspectFit"></image>
					</view>
				</view>
			</view>

		</view>
		
		
		
		<contmin :back="backsong" :arr="arr" :musicdatatitle="title"></contmin>
		<!-- <listbox></listbox> -->
	</view>
</template>

<script>
import helper from '../../common/helper';
	export default {
		data() {
			return {
				title: null,
				backsong: null,
				arr: null,
			};
		},
		onLoad(e) {
			this.title = e.name
			this.newgetsong()
			this.getarr()
		},
		
		methods: {
			backk(e) {
				uni.navigateTo({
					url: `/pages/searchhome/searchhome?tit=${e}`
				})
			},
			newgetsong() {
				if(this.backsong == null) {
					uni.request({
						// url: `http://localhost:3000/cloudsearch?keywords=${this.title}&limit=6&type=1`,
						url: `${helper.url}/cloudsearch?keywords=${this.title}&limit=6&type=1`,
						success: (res) => {
							// console.log(res.data.result.songs)
							this.backsong = res.data.result.songs
							// console.log(this.backsong)
							helper.musicpiclist = this.backsong
						}
					})
				}
			},
			
			getarr() {
				if(this.title == null) return
				if(this.arr == null) {
					uni.request({
						// url: `http://localhost:3000/cloudsearch?keywords=${this.title}&limit=5&type=1000`,
						url: `${helper.url}/cloudsearch?keywords=${this.title}&limit=5&type=1000`,
						success: (res) => {
							// console.log(res.data.result.playlists)
							this.arr = res.data.result.playlists
						}
					})
				}
			},
			

			
			
			
			
			textclear() {
				uni.reLaunch({
					url: "/pages/searchhome/searchhome"
				})
			},
			settitle(e) {
				this.title = e.detail.value
				// console.log(this.title)
			},
			back() {
				uni.reLaunch({
					url: '/pages/searchhome/searchhome'
				})
			}
		}
	}
</script>

<style lang="scss">
	.miku {
		padding-bottom: 200rpx;
		margin-bottom: 200rpx;
		background-color: var(--searchlistbgcolor);
		.box {
			box-sizing: border-box;
			padding: 40rpx 20rpx;
			height: 100%;
			background-color: var(--searchlisttopbgcolor);
			margin-bottom: 40rpx;
			.box-top {
				display: flex;
				justify-content: center;
				align-items: center;
				height: 100rpx;
				
				.callback-icon {
					margin-right: 30rpx;
					width: 50rpx;
					height: 50rpx;
				}
				
				.box-line {
					padding-right: 10rpx;
					padding-bottom: 14rpx;
					padding-left: 2rpx;
					flex: 8;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: var(--searchlistfontcolor);
					border-bottom: 1px solid var(--searchlistinput);
					.box-clear {
						width: 45rpx;
						height: 45rpx;
					}
				}
			}
		}
	
		
	}
</style>
